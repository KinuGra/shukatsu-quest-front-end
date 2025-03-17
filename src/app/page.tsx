import LevelBadge from "@/features/common/LevelBadge";
import StageView from "@/features/routes/home/StageView";
import { getStages, getUser } from "@/utils/api";

type Level = {
  level: number;
  exp: number;
  maxExp: number;
};

export default async function Home() {
  const stages = await getStages();
  const user = await getUser("1e46e6a4-24fa-449b-9ef2-deef7026dc2c");
  const level: Level = {
    level: user.lv,
    exp: user.exp,
    maxExp: 100 * 1.1 ** user.lv,
  };
  console.log(stages);
  console.log(user);
  return (
    <div className="flex justify-between w-full h-screen">
      <div className="w-full h-full flex items-center justify-center mr-5">
        <StageView stages={stages} />
      </div>
      <LevelBadge level={level} />
    </div>
  );
}
