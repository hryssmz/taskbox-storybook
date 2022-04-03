// lib/store.ts
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const defaultTasks: Task[] = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something more", state: "TASK_INBOX" },
  { id: "3", title: "Something else", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" },
];

export interface TasksState {
  tasks: Task[];
  status: "idle" | "loading";
  error: string | null;
}

const initialTasksState: TasksState = {
  tasks: defaultTasks,
  status: "idle",
  error: null,
};

export type UpdateTaskStateAction = PayloadAction<{
  id: string;
  newTaskState: Task["state"];
}>;

const tasksSlice = createSlice({
  name: "taskbox",
  initialState: initialTasksState,
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

export const { updateTaskState } = tasksSlice.actions;

const store = configureStore({
  reducer: {
    taskbox: tasksSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
