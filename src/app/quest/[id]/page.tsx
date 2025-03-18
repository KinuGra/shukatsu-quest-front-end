"use client";
import Quest from "@/class/quest";
import QuestDetail from "@/features/routes/quest/questDetail";
import LevelUpNotification from "@/features/routes/quest/LevelUpNotification";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    async function testPostRequest() {
      const apiUrl =
        "https://xhkstsyfkweoorawugtc.supabase.co/functions/v1/es/quest/ae0091db-e94f-42c8-8ed4-85f0d2d0c0b9/user/1e46e6a4-24fa-449b-9ef2-deef7026dc2c"; // 適当なテスト用API
      const requestBody = {
        theme: "Test Theme",
        answer: "This is a test answer.",
        length: 100,
      };

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Response:", responseData);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    testPostRequest();
  });

  const handleComplete = () => {
    // setTotalExp(totalExp + quest.baseExp); // ここで経験値を入れておく
    setIsModalOpen(true);
  };

  return (
    <>
      <QuestDetail quest={quest} onComplete={handleComplete} />
      <LevelUpNotification
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentLevel={currentLevel}
        totalExp={totalExp}
      />
    </>
  );
}
