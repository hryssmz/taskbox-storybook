// components/Task.stories.tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Task, { Props } from "../../src/components/Task";

const defaultProps: Props = {
  task: {
    id: "1",
    title: "Test Task",
    state: "TASK_INBOX",
    updatedAt: new Date(2021, 0, 1, 9, 0),
  },
  onArchiveTask(id: string) {
    console.log(`Archived task ${id}`);
  },
  onPinTask(id: string) {
    console.log(`Pinned task ${id}`);
  },
};

export const Default: ComponentStory<typeof Task> = () => (
  <Task {...defaultProps} />
);

export const Pinned: ComponentStory<typeof Task> = () => (
  <Task
    {...defaultProps}
    task={{ ...defaultProps.task, state: "TASK_PINNED" }}
  />
);

export const Archived: ComponentStory<typeof Task> = () => (
  <Task
    {...defaultProps}
    task={{ ...defaultProps.task, state: "TASK_ARCHIVED" }}
  />
);

export default {
  component: Task,
  title: "Task",
} as ComponentMeta<typeof Task>;
