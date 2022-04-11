// lib/store.ts
import {
  configureStore,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export const fetchTasks = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1"
  );
  const data: Todo[] = await response.json();
  const result: Task[] = data.map(task => ({
    id: task.id,
    title: task.title,
    state: task.completed ? "TASK_ARCHIVED" : "TASK_INBOX",
  }));
  return result;
});

const defaultTasks: Task[] = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something more", state: "TASK_INBOX" },
  { id: "3", title: "Something else", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" },
];

export interface TasksState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
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
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, state => {
        state.status = "loading";
        state.error = null;
        state.tasks = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        // Add any fetched tasks to the array
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, state => {
        state.status = "failed";
        state.error = "Something went wrong";
        state.tasks = [];
      });
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
