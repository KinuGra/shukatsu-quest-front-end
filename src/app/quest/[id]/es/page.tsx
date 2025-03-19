"use client";

import ESForm from "@/features/routes/es/ESForm";
import { Box, Heading } from "@chakra-ui/react";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

export default function FormPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const params = useParams();
  const questId = params.id;

  if (!userId || !questId) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="red.50"
        color="red.500"
        fontSize="lg"
        fontWeight="bold"
      >
        エラーが発生しました
      </Box>
    );
  }

  if (typeof questId !== "string") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="red.50"
        color="red.500"
        fontSize="lg"
        fontWeight="bold"
      >
        エラーが発生しました
      </Box>
    );
  }

  return (
    <Box
      maxW="800px"
      mx="auto"
      mt="10"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      bg="white"
    >
      <Heading
        as="h1"
        size="lg"
        textAlign="center"
        mb="6"
        color="teal.600"
        fontWeight="bold"
      >
        ESフォームページ
      </Heading>
      <ESForm userId={userId} questId={questId} />
    </Box>
  );
}
