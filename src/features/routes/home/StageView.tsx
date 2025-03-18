//中央ステージ一覧
"use client";

import Stage from "@/class/stage";
import React, { useState } from "react";
import { Box, Button, Heading, Portal, Drawer } from "@chakra-ui/react";
import themes from "@/constants/themes";
import QuestBoard from "./questBoard";
import User from "@/class/user";
import { getStages } from "@/utils/api";
export default function StageView({
  stages,
  user,
}: {
  stages: Stage[];
  user: User;
}) {
  const columnRation = 100 / stages.length;
  const column = `repeat(${stages.length}, ${columnRation}%)`;
  const [selectedStage, setSelectedStage] = useState<Stage>();
  const userJson = JSON.stringify(user);
  return (
    <Box padding={"5%"}>
      <Heading>ステージ一覧</Heading>
      <Box
        padding={"5%"}
        display={"grid"}
        gridTemplateColumns={"33% 33% 1fr"}
        gridTemplateRows={column}
        gap={"10%"}
        alignItems={"center"}
      >
        {stages.map((stage, index) => {
          // 各ステージを配置
          const y = index;
          let x = index;
          if (index % 5 == 3) {
            x = 1;
          } else if (index % 5 == 4) {
            x = 0;
          }
          console.log(stage.quests);
          return (
            <Button
              gridRow={y + 1}
              gridColumn={x + 1}
              key={stage.id}
              width={"150px"}
              height={"150px"}
              borderRadius={"50%"}
              textAlign={"center"}
              lineHeight={"10%"}
              backgroundColor={
                selectedStage && selectedStage!.id == stage.id
                  ? themes.amber
                  : themes.darkBrown
              }
              color={themes.white}
              border={"none"}
              cursor={"pointer"}
              onClick={() => {
                setSelectedStage(stage);
              }}
            >
              {stage.name}
            </Button>
          );
        })}
      </Box>
      <Box>
        <Drawer.Root
          open={selectedStage != undefined}
          onOpenChange={() => setSelectedStage(undefined)}
        >
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                {selectedStage && (
                  <QuestBoard quests={selectedStage.quests} user={user} />
                )}
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Box>
    </Box>
  );
}
