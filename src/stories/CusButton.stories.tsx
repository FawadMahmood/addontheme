import type { Meta, StoryObj } from "@storybook/react";
import { MyCustomButton } from "./cusButton";
import React from "react";

const meta: Meta<typeof MyCustomButton> = {
  title: "cusbutton",
  component: MyCustomButton,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof MyCustomButton>;

export const MyCustomButtonStory: Story = {
    
    args: {
      theme: {
        backgroundColor: 'red',
        textColor: 'white',
        hoverColor: 'blue',
        activeColor: 'green',
      },
    },
    
  };

 
  