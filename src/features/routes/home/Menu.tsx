import React from "react";
import Link from "next/link";
import { FaHome, FaClipboard, FaTrophy } from "react-icons/fa";
import { Box, Heading, List, ListItem, Link as ChakraLink, Flex } from "@chakra-ui/react";

export default function Menu() {
  return (
    <Box width="250px" height="100vh" bg="gray.100" p="20px" boxShadow="none">
      <Heading as="h1" size="lg" mb="20px" color="#000">就活QUEST</Heading>
      <List.Root style={{ listStyleType: "none", padding: 0 }}>
        <List.Item style={{ marginBottom: "10px" }}>
          <Link href="/home" passHref>

            <FaHome style={{ marginRight: "10px" }} />
            Home

          </Link>
        </List.Item>
        <List.Item style={{ marginBottom: "10px" }}>
          <Link href="/note" passHref>

            <FaClipboard style={{ marginRight: "10px" }} />
            Note

          </Link>
        </List.Item>
        <List.Item style={{ marginBottom: "10px" }}>
          <Link href="/achievement" passHref>

            <FaTrophy style={{ marginRight: "10px" }} />
            Achievement

          </Link>
        </List.Item>
      </List.Root>
    </Box>
  );
}
