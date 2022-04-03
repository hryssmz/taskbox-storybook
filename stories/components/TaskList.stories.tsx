// components/TaskList.stories.tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TaskList, { Props } from "../../src/components/TaskList";

const defaultProps: Props = {
  loading: false,
  tasks: Array(6)
    .fill(0)
    .map((_, i) => ({
      id: `${i + 1}`,
      title: `Task ${i + 1}`,
      state: "TASK_INBOX",
      updatedAt: new Date(2021, 0, 1, 9, 0),
    })),
  onArchiveTask(id: string) {
    console.log(`Archived task ${id}`);
  },
  onPinTask(id: string) {
    console.log(`Pinned task ${id}`);
  },
};

export const Default: ComponentStory<typeof TaskList> = () => (
  <TaskList {...defaultProps} />
);

export const WithPinnedTasks: ComponentStory<typeof TaskList> = () => (
  <TaskList
    {...defaultProps}
    tasks={[
      ...defaultProps.tasks.slice(0, 5),
      {
        ...defaultProps.tasks[5],
        title: "Task 6 (pinned)",
        state: "TASK_PINNED",
      },
    ]}
  />
);

export const Loading: ComponentStory<typeof TaskList> = () => (
  <TaskList {...defaultProps} loading={true} tasks={[]} />
);

export const Empty: ComponentStory<typeof TaskList> = () => (
  <TaskList {...defaultProps} tasks={[]} />
);

export default {
  component: TaskList,
  title: "TaskList",
  decorators: [story => <div style={{ padding: "3rem" }}>{story()}</div>],
} as ComponentMeta<typeof TaskList>;
