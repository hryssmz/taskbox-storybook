// components/TaskList.spec.tsx
import { render } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";

import * as TaskListStories from "../../stories/components/TaskList.stories";

// composeStories will process all information related to the component
const { WithPinnedTasks } = composeStories(TaskListStories);

test("renders pinned tasks at the start of the list", () => {
  const { container } = render(<WithPinnedTasks />);

  expect(
    container.querySelector(
      ".list-item:nth-child(1) input[value='Task 6 (pinned)'"
    )
  ).not.toBe(null);
});
