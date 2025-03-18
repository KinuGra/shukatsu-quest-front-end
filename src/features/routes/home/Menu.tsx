import React from "react";
import Link from "next/link";
import { FaHome, FaClipboard, FaTrophy } from "react-icons/fa";
import {
  Box,
  Heading,
  List,
  ListItem,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";

export default function Menu() {
  return (
    <Box width="250px" height="100vh" bg="gray.100" p="20px" boxShadow="none">
      <Heading as="h1" size="lg" mb="20px" color="#000">
        就活QUEST
      </Heading>
      <div className="flex flex-col gap-4">
        <Link href="/" passHref className="flex items-center gap-2">
          <FaHome />
          <p>Home</p>
        </Link>
        <Link href="/note" passHref className="flex items-center gap-2">
          <FaClipboard />
          <p>Note</p>
        </Link>
        <Link href="/achievement" passHref className="flex items-center gap-2">
          <FaTrophy />
          <p>Achievement</p>
        </Link>
      </div>
    </Box>
  );
}
