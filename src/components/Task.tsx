// components/Task.tsx
export interface Props {
  task: Task;
  onArchiveTask(id: string): void;
  onPinTask(id: string): void;
}

export default function Task({ task, onArchiveTask, onPinTask }: Props) {
  const { id, title, state } = task;

  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={state === "TASK_ARCHIVED"}
          disabled={true}
          name="checked"
        />
        <span
          className="checkbox-custom"
          onClick={() => onArchiveTask(id)}
          id={`archiveTask-${id}`}
          aria-label={`archiveTask-${id}`}
        />
      </label>

      <div className="title">
        <input type="text" value={title} readOnly={true} />
      </div>

      <div className="actions" onClick={event => event.stopPropagation()}>
        {state !== "TASK_ARCHIVED" && (
          <a onClick={() => onPinTask(id)}>
            <span
              className="icon-star"
              id={`pinTask-${id}`}
              aria-label={`pinTask-${id}`}
            />
          </a>
        )}
      </div>
    </div>
  );
}
