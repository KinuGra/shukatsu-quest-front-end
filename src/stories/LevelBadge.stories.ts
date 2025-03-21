import { Meta } from "@storybook/react";

import LevelBadge from "@/features/common/LevelBadge";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof LevelBadge> = {
  title: "Common/LevelBadge",
  component: LevelBadge,
  args: {
    level: {
      level: 1,
      exp: 0,
      maxExp: 100,
    },
  },
};
export default meta;

export const Default = {};
