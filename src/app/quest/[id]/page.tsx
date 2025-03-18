"use client";
import Quest from "@/class/quest";
import QuestDetail from "@/features/routes/quest/questDetail";
import LevelUpNotification from "@/features/routes/quest/LevelUpNotification";
import { useState } from "react";

export default function Page() {
    const quest: Quest = {
        id: "1",
        name: '面接対策',
        type: 'normal',
        num: 1,
        baseExp: 100,
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(1);

    const handleComplete = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <QuestDetail quest={quest} onComplete={handleComplete} />
            <LevelUpNotification
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentLevel={currentLevel}
            />
        </>
    );
}