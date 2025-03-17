import Achievement from "@/class/achievement";
import Es from "@/class/es";
import Stage from "@/class/stage";
import User from "@/class/user";
import ScoredEs, { Category } from "@/class/scoredEs";
import Quest from "@/class/quest";

const BACK_END_API_BASE_URL = process.env.BACK_END_API_BASE_URL;
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
  clearedAt: Date;
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
    const user = new User(resBody.id, resBody.name, resBody.lv, resBody.exp);
    return user;
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
    const achievements: Achievement[] = resBody.map((a: any) => {
      return new Achievement(
        a.id,
        a.quest_id,
        a.stage_id,
        new Date(a.clearedAt),
      );
    });
    return achievements;
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
    const stages: Stage[] = resBody.map((s: StageResponse) => {
      const quests = s.quests.map((q: QuestResponse) => {
        return new Quest(q.id, q.name, q.number, q.type, q.baseExp);
      });
      return new Stage(s.id, s.name, s.number, quests);
    });

    return stages;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// ES以外のクエストをクリア
export const postQuestDone = async (userId: string, questId: string) => {
  const url = `${BACK_END_API_BASE_URL}/quest/${questId}/user/${userId}`;
  try {
    const response = await fetch(url, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("クエストのクリアに失敗しました");
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// ESを提出
export const postEsDone = async (es: Es) => {
  try {
    const response = await fetch(
      `${BACK_END_API_BASE_URL}/es/quest/${es.questId}/user/${es.userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          theme: es.theme,
          answer: es.answer,
          length: es.length,
        }),
      },
    );
    if (!response.ok) {
      throw new Error("ESの提出に失敗しました");
    }
    const resBody: ScoredEsResponse = await response.json();
    const scoredEs = new ScoredEs(
      es,
      resBody.categories.map((c: any) => {
        return new Category(c.name, c.score, c.fullScore, c.comment);
      }),
      resBody.allScore,
      resBody.correction,
      resBody.correctionComment,
    );
    return scoredEs;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
