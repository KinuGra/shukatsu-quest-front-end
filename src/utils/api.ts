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
export const postEsDone = async (es: {
  questId: string;
  userId: string;
  theme: string;
  answer: string;
  length: number;
}) => {
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
    const scoredEs = {
      id: resBody.id,
      esId: resBody.esId,
      categories: resBody.categories.map((c) => ({
        name: c.name,
        score: c.score,
        fullScore: c.fullScore,
        comment: c.comment,
      })),
      answer: resBody.answer,
      allScore: resBody.allScore,
      comment: resBody.comment,
      correction: resBody.correction,
      correctionComment: resBody.correctionComment,
    };
    return JSON.stringify(scoredEs); // プレーンなオブジェクトを返す
  } catch (e) {
    console.error("Error in postEsDone:", e);
    throw e;
  }
};
