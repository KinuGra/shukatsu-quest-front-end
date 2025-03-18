import { Meta } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import EsResult from "@/features/routes/es/EsResult";
const meta: Meta<typeof EsResult> = {
  title: "es/EsResult",
  component: EsResult,
  args: {
    scoredEs: {
      id: "1",
      userId: "1",
      questId: "1",
      topic: "topic",
      content: "content",
      charLimit: 100,
      categories: [
        {
          name: "category1",
          score: 1,
          fullScore: 1,
          comment: "comment",
        },
        {
          name: "category2",
          score: 1,
          fullScore: 1,
          comment: "comment",
        },
      ],
      allScore: 2,
      correction: "correction",
      correctionComment: "correctionComment",
    },
  },
};

export default meta;

export const Default = {};
