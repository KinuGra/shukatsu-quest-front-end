import Quest from "@/class/quest";
import Stage from "@/class/stage";
import StageView from "@/features/routes/home/StageView";
import { getStages, getUser } from "@/utils/api";
import { Box } from "@chakra-ui/react";

type Level = {
  level: number;
  exp: number;
  maxExp: number;
};

export default async function Home() {
  try {
    const stagesJson = await getStages();
    const stages = JSON.parse(stagesJson);

    const userJson = await getUser("1e46e6a4-24fa-449b-9ef2-deef7026dc2c");
    const user = JSON.parse(userJson);
    const level: Level = {
      level: user.lv,
      exp: user.exp,
      maxExp: Math.floor(100 * Math.pow(1.1, user.lv)), // 小数点以下を切り捨て
    };
    return (
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        overflow={"scroll"}
        w={"100%"}
      >
        {/* <div className="flex justify-between w-full h-screen"> */}
        <Box marginRight={"5%"} w={"100vh"} h={"100vh"} p={"20px"}>
          {/* <div className="w-full h-full flex items-center justify-center mr-5"> */}
          <StageView stages={stages} />
          {/* </div> */}
        </Box>
        {/* <LevelBadge level={level} /> */}
        {/* </div> */}
      </Box>
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
