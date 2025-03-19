"use client";
import Quest from "@/class/quest";
import QuestDetail from "@/features/routes/quest/questDetail";
import LevelUpNotification from "@/features/routes/quest/LevelUpNotification";
import { useEffect, useState } from "react";
import { redirect, useParams, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const params = useParams();

  const quest: Quest = {
    id: params.id as string,
    name: searchParams.get("name") || "クエスト",
    type: "normal",
    num: Number(searchParams.get("num")) || 1,
    baseExp: Number(searchParams.get("baseExp")) || 100,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [totalExp, setTotalExp] = useState(0);
  // 一回fetch

  const handleComplete = () => {
    setTotalExp(totalExp + quest.baseExp); // ここで経験値を入れておく
    setIsModalOpen(true);
  };

  return (
    <>
      <QuestDetail
        quest={quest}
        onComplete={handleComplete}
        setCurrentLevel={setCurrentLevel}
        setTotalExp={setTotalExp}
      />
      <LevelUpNotification
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          redirect("/");
        }}
        // setTotalExp={setTotalExp}
        currentLevel={currentLevel - 1}
        totalExp={totalExp}
      />
    </>
  );
}
