// components/InboxScreen.stories.tsx
import { rest } from "msw";
import { Provider } from "react-redux";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  fireEvent,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from "@storybook/testing-library";

import store from "../../src/lib/store";
import InboxScreen from "../../src/components/InboxScreen";
import { mockedState } from "./TaskList.stories";

export const Default: ComponentStory<typeof InboxScreen> = () => (
  <InboxScreen />
);
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        "https://jsonplaceholder.typicode.com/todos?userId=1",
        (req, res, ctx) => {
          return res(ctx.json(mockedState.tasks));
        }
      ),
    ],
  },
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  // Waits for the component to transition from the loading state
  await waitForElementToBeRemoved(await canvas.findByTestId("loading"));
  // Waits for the component to be updated based on the store
  await waitFor(async () => {
    // Simulates pinning the first task
    await fireEvent.click(canvas.getByLabelText("pinTask-1"));
    // Simulates pinning the third task
    await fireEvent.click(canvas.getByLabelText("pinTask-3"));
  });
};

export const Error: ComponentStory<typeof InboxScreen> = () => <InboxScreen />;
Error.parameters = {
  msw: {
    handlers: [
      rest.get(
        "https://jsonplaceholder.typicode.com/todos?userId=1",
        (req, res, ctx) => {
          return res(ctx.status(403));
        }
      ),
    ],
  },
};

export default {
  component: InboxScreen,
  title: "InboxScreen",
  decorators: [story => <Provider store={store}>{story()}</Provider>],
} as ComponentMeta<typeof InboxScreen>;
