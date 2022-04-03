// components/TaskList.tsx
import { useDispatch, useSelector } from "../lib/hooks";
import { updateTaskState } from "../lib/store";
import Task from "./Task";

export default function TaskList() {
  // We're retrieving our state from the store
  const tasks = useSelector(({ taskbox }) =>
    [
      ...taskbox.tasks.filter(task => task.state === "TASK_PINNED"),
      ...taskbox.tasks.filter(task => task.state !== "TASK_PINNED"),
    ].filter(task => task.state !== "TASK_ARCHIVED")
  );

  const status = useSelector(({ taskbox }) => taskbox.status);

  const dispatch = useDispatch();

  const handlePinTask = (id: string) => {
    // We're dispatching the Pinned event back to our store
    dispatch(updateTaskState({ id, newTaskState: "TASK_PINNED" }));
  };

  const handleArchiveTask = (id: string) => {
    // We're dispatching the Archive event back to our store
    dispatch(updateTaskState({ id, newTaskState: "TASK_ARCHIVED" }));
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (status === "loading") {
    return (
      <div className="list-items" data-testid="loading" key="loading">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items" key="empty" data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items" data-testid="success" key="success">
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          onPinTask={handlePinTask}
          onArchiveTask={handleArchiveTask}
        />
      ))}
    </div>
  );
}
