"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import EsResult from "@/features/routes/es/EsResult";
import { postEsDone } from "@/utils/api";
import { MyContext } from "@/provider/esProvider";
import scoredEs from "@/class/scoredEs";

const ResultPage = () => {
  const { es } = useContext(MyContext);
  const [scoredEs, setScoredEs] = useState<scoredEs | null>(null);

  useEffect(() => {
    const fetchScoredEs = async () => {
      const JsonEs = JSON.stringify(es);
      const JsonScoredEs = await postEsDone(JsonEs);
      const result: scoredEs = await JSON.parse(JsonScoredEs);
      setScoredEs(result);
    };
    fetchScoredEs();
  });

  return (
    <div>
      <h1>採点結果ページ</h1>
      {/* {result ? <EsResult result={result} /> : <p>採点中...</p>} */}
    </div>
  );
};

export default ResultPage;
