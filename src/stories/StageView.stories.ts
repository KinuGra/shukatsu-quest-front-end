import { Meta } from "@storybook/react";

import StageView from "@/features/routes/home/StageView";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof StageView> = {
  title: "Home/StageView",
  component: StageView,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    stages: [
      {
        id: "1",
        name: "Stage 1",
        num: 1,
        quests: [
          {
            id: "1",
            name: "クエスト１",
            num: 1,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "2",
            name: "クエスト2",
            num: 3,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "3",
            name: "クエスト3",
            num: 3,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "4",
            name: "クエスト4",
            num: 4,
            type: "normal",
            baseExp: 120,
          },
          // questを量産
        ],
      },
      {
        id: "2",
        name: "Stage 2",
        num: 2,
        quests: [
          {
            id: "1",
            name: "クエスト１",
            num: 1,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "2",
            name: "クエスト2",
            num: 3,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "3",
            name: "クエスト3",
            num: 3,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "4",
            name: "クエスト4",
            num: 4,
            type: "normal",
            baseExp: 120,
          },
          // questを量産
        ],
      },
      {
        id: "3",
        name: "Stage 3",
        num: 3,
        quests: [
          {
            id: "1",
            name: "クエスト１",
            num: 1,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "2",
            name: "クエスト2",
            num: 3,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "3",
            name: "クエスト3",
            num: 3,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "4",
            name: "クエスト4",
            num: 4,
            type: "normal",
            baseExp: 120,
          },
          // questを量産
        ],
      },
      {
        id: "4",
        name: "Stage 4",
        num: 4,
        quests: [
          {
            id: "1",
            name: "クエスト１",
            num: 1,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "2",
            name: "クエスト2",
            num: 3,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "3",
            name: "クエスト3",
            num: 3,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "4",
            name: "クエスト4",
            num: 4,
            type: "normal",
            baseExp: 120,
          },
          // questを量産
        ],
      },
      {
        id: "5",
        name: "Stage 5",
        num: 5,
        quests: [
          {
            id: "1",
            name: "クエスト１",
            num: 1,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "2",
            name: "クエスト2",
            num: 3,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "3",
            name: "クエスト3",
            num: 3,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "4",
            name: "クエスト4",
            num: 4,
            type: "normal",
            baseExp: 120,
          },
          // questを量産
        ],
      },
      {
        id: "6",
        name: "Stage 6",
        num: 6,
        quests: [
          {
            id: "1",
            name: "クエスト１",
            num: 1,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "2",
            name: "クエスト2",
            num: 3,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "3",
            name: "クエスト3",
            num: 3,
            type: "normal",
            baseExp: 120,
          },
          {
            id: "4",
            name: "クエスト4",
            num: 4,
            type: "normal",
            baseExp: 120,
          },
          // questを量産
        ],
      },
    ],
  },
};

export default meta;

export const Default = {};
