import Es from "@/class/es";
import { z } from "zod";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const BACK_END_API_BASE_URL = process.env.NEXT_PUBLIC_BACK_END_API_BASE_URL;
const DB_BASE_URL = process.env.NEXT_PUBLIC_DB_BASE_URL;
const DB_API_KEY = process.env.NEXT_PUBLIC_DB_API_KEY;

if (!BACK_END_API_BASE_URL || !DB_BASE_URL || !DB_API_KEY) {
  throw new Error("環境変数が設定されていません");
}

type UserResponse = {
  id: string;
  name: string;
  lv: number;
  exp: number;
};

type AchievementResponse = {
  id: string;
  questId: string;
  stageId: string;
  clearedAt: string;
};

type StageResponse = {
  id: string;
  name: string;
  number: number;
  quests: QuestResponse[];
};

type QuestResponse = {
  id: string;
  name: string;
  number: number;
  type: string;
  base_exp: number;
};

// ユーティリティ関数: Cache-Control: no-cache を付与
const fetchWithNoCache = async (url: string, options: RequestInit = {}) => {
  const headers = {
    ...options.headers,
    "Cache-Control": "no-cache",
  };

  const updatedOptions = {
    ...options,
    headers,
  };

  return fetch(url, updatedOptions);
};

// ユーザー情報を取得
export const getUser = async (userId: string) => {
  const url = `${BACK_END_API_BASE_URL}/user/${userId}`;
  try {
    const response = await fetchWithNoCache(url);
    if (!response.ok) {
      throw new Error("ユーザーが見つかりません");
    }
    const resBody: UserResponse = await response.json();
    const user = {
      id: resBody.id,
      name: resBody.name,
      lv: resBody.lv,
      exp: resBody.exp,
    };
    return JSON.stringify(user);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// ユーザーの実績を取得
export const getAchievements = async (userId: string) => {
  const url = `${BACK_END_API_BASE_URL}/achievements/${userId}`;
  try {
    const response = await fetchWithNoCache(url);
    if (!response.ok) {
      throw new Error("実績が見つかりません");
    }
    const resBody: AchievementResponse[] = await response.json();
    const achievements = resBody.map((a) => ({
      id: a.id,
      questId: a.questId,
      stageId: a.stageId,
      clearedAt: a.clearedAt,
    }));
    return JSON.stringify(achievements);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// ステージ・クエスト情報を取得
export const getStages = async () => {
  const url = `${BACK_END_API_BASE_URL}/stages-with-quests`;
  try {
    const response = await fetchWithNoCache(url);
    if (!response.ok) {
      console.error("Error in getStages:", response);
      throw new Error("ステージが見つかりません");
    }
    const resBody: StageResponse[] = await response.json();
    const stages = resBody.map((s) => ({
      id: s.id,
      name: s.name,
      number: s.number,
      quests: s.quests.map((q) => ({
        id: q.id,
        name: q.name,
        number: q.number,
        type: q.type,
        baseExp: q.base_exp,
      })),
    }));
    return JSON.stringify(stages);
  } catch (e) {
    console.error("Error in getStages:", e);
    throw e;
  }
};

// ES以外のクエストをクリア
export const postQuestDone = async (userId: string, questId: string) => {
  const url = `${BACK_END_API_BASE_URL}/quest/${questId}/user/${userId}`;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "POST",
    });
    console.log(response);
    if (!response.ok) {
      console.error("Error in postQuestDone:", response);
      throw new Error("クエストのクリアに失敗しました");
    }
  } catch (e) {
    console.error("Error in postQuestDone:", e);
    throw e;
  }
};

// ESを提出
export const postEsDone = async (JsonEs: string) => {
  const scoring = {
    categories: [
      {
        name: "論理性",
        description: "論理的に首尾一貫した内容になっているか",
        fullScore: 20,
      },
      {
        name: "文章構成力",
        description: "わかりやすく適切な日本語表現が使われているか",
        fullScore: 20,
      },
      {
        name: "具体性と説得力",
        description: "具体的な事例や根拠を示し、説得力があるか",
        fullScore: 20,
      },
      {
        name: "熱意と意欲",
        description: "テーマに対して熱意や意欲が感じられるか",
        fullScore: 20,
      },
      {
        name: "独自性",
        description: "他の人と差別化できる独自性があるか",
        fullScore: 20,
      },
    ],
  };

  type llmOutput = {
    comment: string;
    correction: string;
    correctionComment: string;
    categories: {
      score: number;
      comment: string;
    }[];
    allScore: number;
  };

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const model = process.env.NEXT_PUBLIC_GEMINI_MODEL;
  if (!apiKey || !model) {
    throw new Error("GEMINI_API_KEY and GEMINI_MODEL must be set");
  }

  const scoreEs = async (es: Es) => {
    const llm = new ChatGoogleGenerativeAI({
      model: model,
      apiKey: apiKey,
      temperature: 0,
    });

    const outputSchema = z
      .object({
        comment: z.string().describe("全体についてのコメント"),
        correction: z.string().describe("添削結果"),
        correctionComment: z.string().describe("添削についてのコメント"),
        categories: z
          .array(
            z.object({
              score: z.number().describe("点数"),
              comment: z.string().describe("コメント"),
            }),
          )
          .describe(
            `採点区分ごとの点数とそれぞれについてのコメントを出力。採点区分は次の通り。出力は提示された順番に行う。${scoring.categories.map(
              (s) => `${s.name}：${s.description} (${s.fullScore}点) `,
            )}`,
          ),
      })
      .describe("採点結果");

    const structuredLlm = llm.withStructuredOutput(outputSchema, {
      name: "scoreEs",
    });

    const result = (await structuredLlm.invoke(
      `次のESを採点し、指定された形式に則って採点・コメントを返してください。なお、コメントは日本語で記述してください。テーマ：${es.theme}、回答：${es.answer}、文字数：${es.length}`,
    )) as llmOutput;

    result.categories = result.categories.map((c, index) => ({
      name: scoring.categories[index].name,
      score: c.score,
      fullScore: scoring.categories[index].fullScore,
      comment: c.comment,
    }));

    let allScore = 0;
    result.categories.forEach((c) => {
      allScore += c.score;
    });

    result.allScore = allScore;

    console.log("result", result);
    return JSON.stringify(result);
  };

  return scoreEs(JSON.parse(JsonEs));
};
export const postLevelUp = async (
  userId: string,
  level: number,
  exp: number,
) => {
  const url = `https://xhkstsyfkweoorawugtc.supabase.co/rest/v1/users?id=eq.${userId}`;
  const data = {
    lv: level,
    exp: exp,
  };
  console.log("更新データ:", JSON.stringify(data));
  const options = {
    method: "PATCH", // 部分更新のため PATCH を使用
    headers: {
      apikey: DB_API_KEY, // 実際の API キーに置き換えてください
      Authorization: `Bearer ${DB_API_KEY}`, // 同上
      "Content-Type": "application/json",
      Prefer: "return=representation", // 更新後のデータを返してもらう設定
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP エラー！ ステータス: ${response.status}`);
    }
    const responseData = await response.json();
    console.log("更新結果:", responseData);
  } catch (error) {
    console.error("更新エラー:", error);
  }
};
