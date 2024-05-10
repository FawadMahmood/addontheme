import type { Meta, StoryObj } from "@storybook/react";
import { MyCustomButton } from "./cusButton";
import React from "react";
import { ADDON_ID, PANEL_ID, TAB_ID, TOOL_ID } from "../constants";
import { addons, types } from "@storybook/manager-api";
import { MyPanel } from "../components/mypanel";
import { Panel } from "../Panel";
import { Tab } from "../Tab";
import { Tool } from "../Tool";

const meta: Meta<typeof MyCustomButton> = {
  title: "cusbutton",
  component: MyCustomButton,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
    myAddon: {
      myString: "customButtonStyle",
    },
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
