// App.stories.tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

import App from "../src/App";

export const Demo: ComponentStory<typeof App> = () => <App />;

export default {
  component: App,
  title: "App",
} as ComponentMeta<typeof App>;
