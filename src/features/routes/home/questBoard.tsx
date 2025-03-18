//クエストボード
//中央ステージ一覧
import React from "react";
import Link from "next/link";
import {
  Box,
  Heading,
  List,
  ListItem,
  Link as ChakraLink,
  Flex,
  Theme,
} from "@chakra-ui/react";
import { GiSwordsEmblem } from "react-icons/gi";
import Quest from "@/class/quest";
import { postQuestDone } from "@/utils/api";
import User from "@/class/user";
import { toast } from "react-toastify";
import themes from "@/constants/themes";

export default function QuestBoard({
  quests,
  user,
}: {
  quests: Quest[];
  user: User;
}) {
  return (
    <Box width="350px" height="100vh" bg="gray.100" p="20px" boxShadow="none">
      <Heading as="h1" size="2xl" mb="20px" color="#000" textAlign="center">
        QuestBoard
      </Heading>
      <List.Root style={{ listStyleType: "none", padding: "5%" }}>
        {quests.map((quest) => (
          <List.Item key={quest.id} style={{ marginBottom: "10px" }}>
            {quest.type === "es" ? (
              <ChakraLink
                display="flex"
                alignItems="center"
                p="10px 15px"
                bg="white"
                borderRadius="md"
                textDecoration="none"
                color="gray.800"
                boxShadow="md"
                href={`/quest/${quest.id}/es`}
              >
                <GiSwordsEmblem />
                {quest.name}
              </ChakraLink>
            ) : (
              <ChakraLink
                display="flex"
                alignItems="center"
                p="10px 15px"
                bg={quest.isDone ? themes.ivory : themes.white}
                borderRadius="md"
                textDecoration="none"
                color={quest.isDone ? themes.ivory : themes.black}
                boxShadow="md"
                onClick={async () => {
                  console.log("quest.id", quest);
                  // try {
                  //   await postQuestDone(user.id, quest.id);
                  //   toast.success("クエストを完了しました");
                  // } catch (error) {
                  //   console.error("Failed to postQuestDone:", error);
                  //   toast.error("クエストの完了に失敗しました");
                  // }
                }}
              >
                <GiSwordsEmblem />
                {quest.name + (quest.isDone ? " (完了)" : "")}
              </ChakraLink>
            )}
          </List.Item>
        ))}
      </List.Root>
    </Box>
  );
}
