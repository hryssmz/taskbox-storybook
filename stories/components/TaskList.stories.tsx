// components/TaskList.stories.tsx
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TaskList from "../../src/components/TaskList";
import type { TasksState, UpdateTaskStateAction } from "../../src/lib/store";

// A super-simple mock of the state of the store
export const mockedState: TasksState = {
  tasks: Array(6)
    .fill(0)
    .map((_, i) => ({
      id: `${i + 1}`,
      title: `Task ${i + 1}`,
      state: "TASK_INBOX",
    })),
  status: "idle",
  error: null,
};

interface MockstoreProps {
  taskboxState: TasksState;
  children: ReactNode;
}

// A super-simple mock of a redux store
function Mockstore({ taskboxState, children }: MockstoreProps) {
  const tasksSlice = createSlice({
    name: "taskbox",
    initialState: taskboxState,
    reducers: {
      updateTaskState: (state, action: UpdateTaskStateAction) => {
        const { id, newTaskState } = action.payload;
        const task = state.tasks.findIndex(task => task.id === id);
        if (task >= 0) {
          state.tasks[task].state = newTaskState;
        }
      },
    },
  });

  const store = configureStore({
    reducer: {
      taskbox: tasksSlice.reducer,
    },
  });

  return <Provider store={store}>{children}</Provider>;
}

export const Default: ComponentStory<typeof TaskList> = () => <TaskList />;
Default.decorators = [
  story => <Mockstore taskboxState={mockedState}>{story()}</Mockstore>,
];

export const WithPinnedTasks: ComponentStory<typeof TaskList> = () => (
  <TaskList />
);
WithPinnedTasks.decorators = [
  story => (
    <Mockstore
      taskboxState={{
        ...mockedState,
        tasks: [
          ...mockedState.tasks.slice(0, 5),
          {
            ...mockedState.tasks[5],
            title: "Task 6 (pinned)",
            state: "TASK_PINNED",
          },
        ],
      }}
    >
      {story()}
    </Mockstore>
  ),
];

export const Loading: ComponentStory<typeof TaskList> = () => <TaskList />;
Loading.decorators = [
  story => (
    <Mockstore taskboxState={{ ...mockedState, status: "loading" }}>
      {story()}
    </Mockstore>
  ),
];

export const Empty: ComponentStory<typeof TaskList> = () => <TaskList />;
Empty.decorators = [
  story => (
    <Mockstore taskboxState={{ ...mockedState, tasks: [] }}>
      {story()}
    </Mockstore>
  ),
];

export default {
  component: TaskList,
  title: "TaskList",
  decorators: [story => <div style={{ padding: "3rem" }}>{story()}</div>],
  excludeStories: /.*mockedState$/,
} as ComponentMeta<typeof TaskList>;
