// index.d.ts
interface Task {
  id: string;
  title: string;
  state: "TASK_INBOX" | "TASK_PINNED" | "TASK_ARCHIVED";
  updatedAt: Date;
}
