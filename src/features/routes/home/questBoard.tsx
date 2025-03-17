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
} from "@chakra-ui/react";
import { GiSwordsEmblem } from "react-icons/gi";
import Quest from "@/class/quest";

export default function QuestBoard({ quests }: { quests: Quest[] }) {
  return (
    <Box width="350px" height="100vh" bg="gray.100" p="20px" boxShadow="none">
      <Heading as="h1" size="2xl" mb="20px" color="#000" textAlign="center">
        QuestBoard
      </Heading>
      <List.Root style={{ listStyleType: "none", padding: 0 }}>
        {quests.map((quest) => (
          <List.Item key={quest.id} style={{ marginBottom: "10px" }}>
            <Link href={`/quest/${quest.id}`} passHref>
              <ChakraLink
                display="flex"
                alignItems="center"
                p="10px 15px"
                bg="white"
                borderRadius="md"
                textDecoration="none"
                color="gray.800"
                boxShadow="md"
              >
                <GiSwordsEmblem />
                {quest.name}
              </ChakraLink>
            </Link>
          </List.Item>
        ))}
      </List.Root>
    </Box>
  );
}
