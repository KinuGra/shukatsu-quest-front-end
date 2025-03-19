"use client";
import React, { useEffect, useState, useContext } from "react";
import { redirect, useRouter } from "next/navigation";

import { postEsDone } from "@/utils/api";
import { MyContext } from "@/provider/esProvider";
import ScoredEs from "@/class/scoredEs";
import EsResult from "@/features/routes/es/EsResult";
import LevelUpNotification from "@/features/routes/quest/LevelUpNotification";

const ResultPage = () => {
  const { es } = useContext(MyContext);
  const [scoredEsState, setScoredEsState] = useState<ScoredEs | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchScoredEs = async () => {
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
    };
    fetchScoredEs();
  }, []); // 空の依存配列を追加

  return (
    <div>
      {/* <h1>採点結果ページ</h1> */}

      {scoredEsState && <EsResult scoredEs={scoredEsState} />}
      <LevelUpNotification
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          redirect("/");
        }}
        // setTotalExp={setTotalExp}
        currentLevel={currentLevel}
        totalExp={totalExp}
      />
    </div>
  );
};

export default ResultPage;
