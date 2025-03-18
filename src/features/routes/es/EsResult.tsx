// 採点結果表示
//フォーム
"use client";
import scoredEs from "@/class/scoredEs";
import React from "react";
import { Box, Table, Heading, Text} from "@chakra-ui/react";

const ScoreResult = ({ scoredEs }: { scoredEs: any }) => {
  return (
    <Box
      maxW="800px"
      mx="auto"
      p={5}
      boxShadow="md"
      borderRadius="md"
      bg="gray.50"
    >
      <Box textAlign="center" fontSize="xl" fontWeight="bold" mb={3}>
        あなたの文章の採点結果（100点満点）
      </Box>
      <Box textAlign="center" fontSize="2xl" fontWeight="bold" mb={4}>
       60点
       {/* {scoredEs.allscore} */}
      </Box>
      <Table.Root variant="outline" size="md" colorPalette="blue">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>採点項目</Table.ColumnHeader>
            <Table.ColumnHeader>点数</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {scoredEs.categories.map((category: any) => (
          <Table.Row key={category.name}>
            <Table.Cell>{category.name}</Table.Cell>
            <Table.Cell>{category.score}</Table.Cell>
          </Table.Row>
        ))}
        </Table.Body>
      </Table.Root>

      <Table.Root variant="outline" size="md" colorPalette="blue" mt={6}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>採点項目名</Table.ColumnHeader>
            <Table.ColumnHeader>コメント</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>

          {scoredEs.categories.map((category: any) => (
            <Table.Row key={category.name}>
              <Table.Cell>{category.name}</Table.Cell>
              <Table.Cell>{category.comment}</Table.Cell>
            </Table.Row>
          ))}

        </Table.Body>
      </Table.Root>
      <Table.Root variant="outline" size="md" colorPalette="blue" mt={6}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>添削</Table.ColumnHeader>
            <Table.ColumnHeader>修正コメント</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{scoredEs.correction}</Table.Cell>
            <Table.Cell>{scoredEs.correctionComment}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default ScoreResult;
  
