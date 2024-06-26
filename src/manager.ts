import { addons, types } from "@storybook/manager-api";
import { ADDON_ID, TOOL_ID, PANEL_ID, TAB_ID } from "./constants";
import { Tool } from "./Tool";
import { Panel } from "./Panel";
import { Tab } from "./Tab";
import { MyPanel } from "./components/mypanel";

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use "src/manager.tsx",
 */

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "My addon",
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: Tool,
  });

  // Register the panel
  // addons.add(PANEL_ID, {
  //   type: types.PANEL,
  //   title: "My addon",
  //   match: ({ viewMode }) => viewMode === "story",
  //   render: Panel,
  // });
  addons.add("my-panel-addon/panel", {
    type: types.PANEL,
    title: "Theme customizer",
    match: ({ viewMode }) => viewMode === "story",
    render: MyPanel,
    paramKey: "layout",
  });

  // Register the tab
  // addons.add(TAB_ID, {
  //   type: types.TAB,
  //   title: "My addon",
  //   render: Tab,
  // });
});



