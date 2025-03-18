"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import EsResult from "@/features/routes/es/EsResult";
import { postEsDone } from "@/utils/api";
import { MyContext } from "@/provider/esProvider";

const ResultPage = () => {
  const router = useRouter();
  const { es } = useContext(MyContext);
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    console.log("テストてすと", es);
    if (es.questId && es.userId && es.topic && es.content && es.charLimit) {
      postEsDone(es)
        .then((res) => {
          setResult(res);
        })
        .catch((error) => {
          console.error("Failed to post data:", error);
        });
    }
  }, [es]);

  return (
    <div>
      <h1>採点結果ページ</h1>
      {/* {result ? <EsResult result={result} /> : <p>採点中...</p>} */}
    </div>
  );
};

export default ResultPage;
