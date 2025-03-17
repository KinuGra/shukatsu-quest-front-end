//中央ステージ一覧
import Stage from "@/class/stage";
import React, { useState } from "react";
import { Box, Button, Heading, Portal, Drawer } from "@chakra-ui/react";
import themes from "@/constants/themes";
import QuestBoard from "./questBoard";

export default function StageView({ stages }: { stages: Stage[] }) {
  const columnRation = 100 / stages.length;
  const column = `repeat(${stages.length}, ${columnRation}%)`;
  const [selectedStage, setSelectedStage] = useState<Stage>();

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
          const y = index;
          let x = index;
          if (index % 5 == 3) {
            x = 1;
          } else if (index % 5 == 4) {
            x = 0;
          }
          return (
            <Button
              gridRow={y + 1}
              gridColumn={x + 1}
              key={stage.id}
              width={"100px"}
              height={"100px"}
              borderRadius={"50%"}
              textAlign={"center"}
              lineHeight={"10%"}
              backgroundColor={themes.charcoalBrown}
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
                {selectedStage && <QuestBoard quests={selectedStage.quests} />}
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Box>
    </Box>
  );
}
