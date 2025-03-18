//中央ステージ一覧
"use client";

import Stage from "@/class/stage";
import React, { useState } from "react";
import { Box, Button, Heading, Portal, Drawer } from "@chakra-ui/react";
import themes from "@/constants/themes";
import QuestBoard from "./questBoard";
import User from "@/class/user";
import { getStages } from "@/utils/api";
import "./StageView.css"; // CSSファイルをインポート

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
      <Box className="step-container">
        {stages.map((stage, index) => {
          return (
            <Button
              className={`step step${index + 1}`}
              key={stage.id}
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
