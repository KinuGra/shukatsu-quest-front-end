import { Meta } from "@storybook/react";

import QuestBoard from "@/features/routes/home/questBoard";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof QuestBoard> = {
  title: "Home/QuestBoard",
  component: QuestBoard,
};

export default meta;

export const Default = {};
