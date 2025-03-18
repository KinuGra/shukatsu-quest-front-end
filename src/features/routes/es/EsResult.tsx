// 採点結果表示
//フォーム
"use client";
import scoredEs from "@/class/scoredEs";
import React from "react";
import { Box, Table, Heading, Text} from "@chakra-ui/react";

const ScoreResult = ({ scoredEs }: { scoredEs: any }) => {
  return (
    <Box maxW="800px" mx="auto" p={5} boxShadow="md" borderRadius="md" bg="blue.50">
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
      {/* <Box textAlign="center" mt={4}>
        <button style={{ padding: '10px 15px', backgroundColor: '#4299E1', color: 'white', borderRadius: '5px', border: 'none' }}>
          添削結果を見る
        </button>
      </Box> */}
       <Box mt={6}>
        <Heading as="h3" size="md" mb={4}>
          採点結果の詳細
        </Heading>

        <ul>
          {scoredEs.categories.map((category: any) => (
            <li key={category.name}>
              <p>採点項目名：{category.name}</p>
              <p>コメント：{category.comment}</p>
            </li>
          ))}
        </ul>

        {/* 全体の評価と修正コメント */}
        <Box mt={6}>
          <p>添削 : {scoredEs.corection}</p>
          <p>修正コメント：{scoredEs.correctionComment}</p>
        </Box>
      </Box>
    </Box>
  );
};

export default ScoreResult;
  
