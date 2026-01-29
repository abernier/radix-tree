import type { Meta, StoryObj } from "@storybook/react-vite";

import { Foo } from "./Foo";
import { allModes } from "../.storybook/modes";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Foo,
  tags: ["autodocs"],
  parameters: {
    // layout: "centered",
    chromatic: {
      modes: {
        light: allModes["light"],
        dark: allModes["dark"],
      },
    },
  },
  // args: {},
  // argTypes: {},
} satisfies Meta<typeof Foo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const St1: Story = {
  name: "Default",
  args: {},
  render: (args) => <Foo />,
};
