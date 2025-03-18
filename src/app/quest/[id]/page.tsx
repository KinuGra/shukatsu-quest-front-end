"use client";
import Quest from "@/class/quest";
import QuestDetail from "@/features/routes/quest/questDetail";
import LevelUpNotification from "@/features/routes/quest/LevelUpNotification";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Page() {
  const quest: Quest = {
    id: "1",
    name: "面接対策",
    type: "normal",
    num: 1,
    baseExp: 100,
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
        currentLevel={currentLevel}
        totalExp={totalExp}
      />
    </>
  );
}
