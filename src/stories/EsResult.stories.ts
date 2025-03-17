import { Meta } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import EsResult from "@/features/routes/es/EsResult";
const meta: Meta<typeof EsResult> = {
  title: "es/EsResult",
  component: EsResult,
};

export default meta;

export const Default = {};
