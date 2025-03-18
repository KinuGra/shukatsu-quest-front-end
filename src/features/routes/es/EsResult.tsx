import { Box, Table, Heading, Text} from "@chakra-ui/react";
//以下はテスト用のデータ
// const sampleScoredEs = {
//   allscore: 85,
//   categories: [
//     {
//       name: "内容の充実度",
//       score: 20,
//       fullScore: 25,
//       comment: "具体的な例が豊富で説得力があります。",
//     },
//     {
//       name: "論理性",
//       score: 18,
//       fullScore: 20,
//       comment: "論理的な構成で読みやすいです。",
//     },
//     {
//       name: "表現力",
//       score: 15,
//       fullScore: 20,
//       comment: "表現が豊かで、読み手を引き込む力があります。",
//     },
//     {
//       name: "文法・語彙",
//       score: 17,
//       fullScore: 20,
//       comment: "文法的に正しく、適切な語彙が使われています。",
//     },
//   ],
//   correction: "全体的に良く書けていますが、もう少し具体例を増やすとさらに良くなります。",
//   correctionComment: "具体例を増やすことで、より説得力が増します。"
// };

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

// 以下はテスト用の文章
// export default function TestPage() {
//   return <ScoreResult scoredEs={sampleScoredEs} />;
// }