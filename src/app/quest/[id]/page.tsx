import Quest from "@/class/quest";
import QuestDetail from "@/features/routes/quest/questDetail";
import { useSearchParams } from "next/navigation";

export default function Page() {
  // const quest = getQuestById();
  // const searchParams = useSearchParams();
  const quest: Quest = {
    id: "1",
    name: "面接対策",
    type: "normal",
    num: 1,
    baseExp: 100,
  };

  return <QuestDetail quest={quest} />;
}
