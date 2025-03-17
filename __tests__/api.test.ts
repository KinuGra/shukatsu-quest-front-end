import "../loadEnv";

import {
  getUser,
  getAchievements,
  getStages,
  postQuestDone,
  postEsDone,
} from "../src/utils/api";
import User from "../src/class/user";
import Achievement from "../src/class/achievement";
import Stage from "../src/class/stage";
import Es from "../src/class/es";
import ScoredEs, { Category } from "../src/class/scoredEs";

describe("API functions", () => {
  const userId = "1e46e6a4-24fa-449b-9ef2-deef7026dc2c";
  const questId = "8c243302-9966-40a4-8458-59b887481d33";
  const es = new Es(questId, userId, "test-theme", "test-answer", 100);

  describe("getUser", () => {
    it("should fetch user data successfully", async () => {
      const user = await getUser(userId);
      console.log(user);
      expect(user).toBeInstanceOf(User);
      expect(user.id).toBe(userId);
    });

    it("should throw an error if user is not found", async () => {
      await expect(getUser("invalid-user-id")).rejects.toThrow(
        "ユーザーが見つかりません",
      );
    });
  });

  describe("getAchievements", () => {
    it("should fetch achievements successfully", async () => {
      const achievements = await getAchievements(userId);
      console.log(achievements);
      expect(achievements).toBeInstanceOf(Array);
      expect(achievements[0]).toBeInstanceOf(Achievement);
    });

    it("should throw an error if achievements are not found", async () => {
      await expect(getAchievements("invalid-user-id")).rejects.toThrow(
        "実績が見つかりません",
      );
    });
  });

  describe("getStages", () => {
    it("should fetch stages successfully", async () => {
      const stages = await getStages();
      console.log(stages);
      expect(stages).toBeInstanceOf(Array);
      expect(stages[0]).toBeInstanceOf(Stage);
    });

    // it("should throw an error if stages are not found", async () => {
    //   // Assuming the API will return an error for this specific case
    //   await expect(getStages()).rejects.toThrow("ステージが見つかりません");
    // });
  });

  describe("postQuestDone", () => {
    it("should post quest done successfully", async () => {
      await expect(postQuestDone(userId, questId)).resolves.not.toThrow();
    });

    it("should throw an error if quest done fails", async () => {
      await expect(postQuestDone("invalid-user-id", questId)).rejects.toThrow(
        "クエストのクリアに失敗しました",
      );
    });
  });

  describe("postEsDone", () => {
    it("should post ES done successfully", async () => {
      const scoredEs = await postEsDone(es);
      expect(scoredEs).toBeInstanceOf(ScoredEs);
    }, 100000);

    it("should throw an error if ES done fails", async () => {
      const invalidEs = new Es(
        "invalid-user-id",
        questId,
        "test-theme",
        "test-answer",
        100,
      );
      await expect(postEsDone(invalidEs)).rejects.toThrow(
        "ESの提出に失敗しました",
      );
    });
  });
});
