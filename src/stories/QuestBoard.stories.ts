import { Meta } from "@storybook/react";

import QuestBoard from "@/features/routes/home/questBoard";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof QuestBoard> = {
  title: "Home/QuestBoard",
  component: QuestBoard,
  args: {
    quests:[
      {
        id: '1',
        name: 'クエスト１',
        num: 1,
        type: 'normal',
        baseExp: 120
      },
      {
        id: '2',
        name: 'クエスト2',
        num: 3,
        type: 'normal',
        baseExp: 120
      },
      {
        id: '3',
        name: 'クエスト3',
        num: 3,
        type: 'normal',
        baseExp: 120
      },
      {
        id: '4',
        name: 'クエスト4',
        num: 4,
        type: 'normal',
        baseExp: 120
      },
      // questを量産

    ]
  }
};

export default meta;

export const Default = {};
