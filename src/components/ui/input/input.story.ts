import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Ghost } from "@solar-icons/react"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Enter text...",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Small: Story = {
    args: {
        inputSize: "sm",
    }
}

export const DefaultWithValue: Story = {
  args: {
    value: "Hello World",
  },
};

export const SmallWithValue: Story = {
  args: {
    inputSize: "sm",
    value: "Hello World",
  },
};

export const DefaultDisabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const SmallDisabled: Story = {
  args: {
    inputSize: "sm",
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const DefaultPassword: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};

export const SmallPassword: Story = {
  args: {
    inputSize: "sm",
    type: "password",
    placeholder: "Enter password",
  },
};

export const DefaultIconStart: Story = {
  args: {
    startIcon: Ghost,
    placeholder: "Hello world",
  },
};

export const smallIconStart: Story = {
  args: {
    inputSize: "sm",
    startIcon: Ghost,
    placeholder: "Hello world",
  },
};

export const DefaultIconEnd: Story = {
  args: {
    endIcon: Ghost,
    placeholder: "Hello world",
  },
};

export const smallIconEnd: Story = {
  args: {
    inputSize: "sm",
    endIcon: Ghost,
    placeholder: "Hello world",
  },
};

export const DefaultIconsBothSides: Story = {
  args: {
    startIcon: Ghost,
    endIcon: Ghost,
    placeholder: "Hello world",
  },
};

export const smallIconsBothSides: Story = {
  args: {
    inputSize: "sm",
    startIcon: Ghost,
    endIcon: Ghost,
    placeholder: "Hello world",
  },
};