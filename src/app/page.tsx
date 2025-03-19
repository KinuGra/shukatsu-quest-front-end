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

    const user = JSON.parse(userJson);
    const level: Level = {
      level: user.lv,
      exp: user.exp,
      maxExp: Math.floor(100 * Math.pow(1.1, user.lv)), // 小数点以下を切り捨て
    };

    return (
      <div className="w-full">
        {/* 左側のステージビュー 中央よせ */}
        <div className=" h-full flex justify-center items-center">
          <StageView stages={stages} user={user} />
        </div>

        {/* 右上のレベルバッジ */}
        <div className="absolute top-5 right-5 p-5 bg-white shadow-md rounded-lg">
          <LevelBadge level={level} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to load data:", error);
    return (
      <div className="flex justify-center items-center w-full h-full bg-gray-100">
        <p className="text-red-500 font-bold">
          データの読み込みに失敗しました。
        </p>
      </div>
    );
  }
}
