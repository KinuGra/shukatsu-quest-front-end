"use client";
import React, { useEffect, useState, useContext } from "react";
import { Box, Heading, Spinner, Text } from "@chakra-ui/react";

import { postEsDone } from "@/utils/api";
import { MyContext } from "@/provider/esProvider";
import ScoredEs from "@/class/scoredEs";
import EsResult from "@/features/routes/es/EsResult";

const ResultPage = () => {
  const { es } = useContext(MyContext);
  const [scoredEsState, setScoredEsState] = useState<ScoredEs | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を追加

  useEffect(() => {
    const fetchScoredEs = async () => {
      try {
        const JsonEs = JSON.stringify(es);
        const JsonScoredEs = await postEsDone(JsonEs);
        const result = JSON.parse(JsonScoredEs);
        const newEs: ScoredEs = new ScoredEs(
          es,
          result.categories.map((c: any) => {
            return {
              name: c.name,
              score: c.score,
              fullScore: 20,
              comment: c.comment,
            };
          }),
          result.allScore,
          result.correction,
          result.correctionComment,
        );
        setScoredEsState(newEs);
      } catch (error) {
        console.error("Error fetching scored ES:", error);
      } finally {
        setIsLoading(false); // ローディング終了
      }
    };
    fetchScoredEs();
  }, []);

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
        採点結果ページ
      </Heading>

      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <Spinner size="xl" color="teal.500" />
        </Box>
      ) : scoredEsState ? (
        <EsResult scoredEs={scoredEsState} />
      ) : (
        <Text
          color="red.500"
          textAlign="center"
          fontSize="lg"
          fontWeight="bold"
        >
          採点結果を取得できませんでした
        </Text>
      )}
    </Box>
  );
};

export default ResultPage;
