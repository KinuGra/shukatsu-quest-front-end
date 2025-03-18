'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EsResult from "@/features/routes/es/EsResult";
import Es from "@/class/es";
import { postEsDone } from "@/utils/api";
import scoredEs from "@/class/scoredEs";

const ResultPage = () => {
  const router = useRouter();
  const { questId, userId, topic, content, charLimit } = router.query;
  const [result, setResult] = useState<scoredEs>(
    new scoredEs(new Es("", "", "", "", 0), [], 0, "", ""));

  useEffect(() => {
    if (typeof questId === 'string' && typeof userId === 'string' && typeof topic === 'string' && typeof content === 'string' && typeof charLimit === 'string') {
      const es = new Es(questId, userId, topic, content, Number(charLimit));
      postEsDone(es)
        .then((res) => {
          setResult(res);
        })
        .catch((error) => {
          console.error("Failed to post data:", error);
        });
    }
  }, [questId, userId, topic, content, charLimit]);

  return (
    <div>
      <h1>採点結果ページ</h1>
      {result ? <EsResult result={result} /> : <p>採点中...</p>}
    </div>
  );
};

export default ResultPage;