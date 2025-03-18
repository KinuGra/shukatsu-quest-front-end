import Es from "@/class/es";
import { z } from "zod";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
const BACK_END_API_BASE_URL = process.env.NEXT_PUBLIC_BACK_END_API_BASE_URL;
if (!BACK_END_API_BASE_URL) {
  throw new Error("BACK_END_API_BASE_URLが設定されていません");
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
  baseExp: number;
};

type ScoredEsResponse = {
  id: string;
  esId: string;
  categories: CategoryResponse[];
  answer: string;
  allScore: number;
  comment: string;
  correction: string;
  correctionComment: string;
};

type CategoryResponse = {
  name: string;
  score: number;
  fullScore: number;
  comment: string;
};

// ユーザー情報を取得
export const getUser = async (userId: string) => {
  const url = `${BACK_END_API_BASE_URL}/user/${userId}`;
  try {
    const response = await fetch(url);
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
    return JSON.stringify(user); // プレーンなオブジェクトを返す
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// ユーザーの実績を取得
export const getAchievements = async (userId: string) => {
  const url = `${BACK_END_API_BASE_URL}/achievements/${userId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("実績が見つかりません");
    }
    const resBody: AchievementResponse[] = await response.json();
    const achievements = resBody.map((a: any) => {
      return {
        id: a.id,
        questId: a.questId,
        stageId: a.stageId,
        clearedAt: a.clearedAt,
      };
    });
    return JSON.stringify(achievements); // プレーンなオブジェクトを返す
  } catch (e) {
    throw e;
  }
};

// ステージ・クエスト情報を取得
export const getStages = async () => {
  const url = `${BACK_END_API_BASE_URL}/stages-with-quests`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
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
        baseExp: q.baseExp,
      })),
    }));

    return JSON.stringify(stages); // プレーンなオブジェクトを返す
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
  // const es: Es = JSON.parse(JsonEs);
  // console.log("JsonEs", JsonEs);

  // try {
  //   const reqBody = {
  //     answer: es.answer,
  //     theme: es.theme,
  //     length: es.length,
  //   };
  //   console.log("fetch body", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       theme: "あなたの学生時代に力を入れて取り組んだことは何ですか？",
  //       answer:
  //         "学生時代はプログラミングの学習に力を入れました。特に、Webアプリケーション開発に興味を持ち、独学でHTML、CSS、JavaScriptを習得しました。",
  //       length: 200,
  //     }),
  //   });

  //   const response = await fetch(
  //     `${BACK_END_API_BASE_URL}/es/quest/${es.questId}/user/${es.userId}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         theme: "あなたの学生時代に力を入れて取り組んだことは何ですか？",
  //         answer:
  //           "学生時代はプログラミングの学習に力を入れました。特に、Webアプリケーション開発に興味を持ち、独学でHTML、CSS、JavaScriptを習得しました。",
  //         length: 200,
  //       }),
  //       // body: JsonEs,
  //     },
  //   );
  //   if (!response.ok) {
  //     console.error("Error in postEsDone:", response);
  //     throw new Error("ESの提出に失敗しました");
  //   }
  //   const resBody: ScoredEsResponse = await response.json();
  //   const scoredEs = {
  //     id: resBody.id,
  //     esId: resBody.esId,
  //     categories: resBody.categories.map((c) => ({
  //       name: c.name,
  //       score: c.score,
  //       fullScore: c.fullScore,
  //       comment: c.comment,
  //     })),
  //     answer: resBody.answer,
  //     allScore: resBody.allScore,
  //     comment: resBody.comment,
  //     correction: resBody.correction,
  //     correctionComment: resBody.correctionComment,
  //   };
  //   console.log("scoredEs", scoredEs);

  //   return JSON.stringify(scoredEs); // プレーンなオブジェクトを返す
  // } catch (e) {
  //   console.error("Error in postEsDone:", e);
  //   throw e;
  // }

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
  };

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const model = process.env.NEXT_PUBLIC_GEMINI_MODEL;
  if (!apiKey || !model) {
    throw new Error("GEMINI_API_KEY and GEMINI_MODEL must be set");
  }

  const scoreEs = async (es: Es) => {
    // 採点区分を取得

    // LLMを初期化
    const llm = new ChatGoogleGenerativeAI({
      model: model,
      apiKey: apiKey,
      temperature: 0,
    });

    // 出力スキーマ
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
    // LLMを実行
    const structuredLlm = llm.withStructuredOutput(outputSchema, {
      name: "scoreEs",
    });
    const result = (await structuredLlm.invoke(
      `次のESを採点し、指定された形式に則って採点・コメントを返してください。なお、コメントは日本語で記述してください。テーマ：${es.theme}、回答：${es.answer}、文字数：${es.length}`,
    )) as llmOutput;

    console.log("result", result);
    return JSON.stringify(result);

    // 採点
  };
  return scoreEs(JSON.parse(JsonEs));
};
