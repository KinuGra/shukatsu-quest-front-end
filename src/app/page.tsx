import Quest from "@/class/quest";
import Stage from "@/class/stage";
import LevelBadge from "@/features/common/LevelBadge";
import StageView from "@/features/routes/home/StageView";
import { getAchievements, getStages, getUser } from "@/utils/api";

export type Level = {
  level: number;
  exp: number;
  maxExp: number;
};

export default async function Home() {
  try {
    const userId = "1e46e6a4-24fa-449b-9ef2-deef7026dc2c";
    const stagesJson = await getStages();
    const stages = JSON.parse(stagesJson);
    const userJson = await getUser(userId);
    const achievementsJson = await getAchievements(userId);
    console.log(stages);

    const user = JSON.parse(userJson);
    const level: Level = {
      level: user.lv,
      exp: user.exp,
      maxExp: Math.floor(100 * Math.pow(1.1, user.lv)), // 小数点以下を切り捨て
    };
    return (
      <div className="flex justify-between w-full h-screen overflow-scroll p-5">
        <div className="w-full h-full flex items-center justify-center mr-5 p-10">
          <StageView stages={stages} user={user} />
        </div>
        <LevelBadge level={level} />
      </div>
    );
  } catch (error) {
    console.error("Failed to load data:", error);
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p>データの読み込みに失敗しました。</p>
      </div>
    );
  }
}
