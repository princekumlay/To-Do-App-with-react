import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import "./styles.css";

const STORAGE_KEY = "tasks";

function getInitialTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    // corrupted or blocked storage — don't crash the app over it
    return [];
  }
}

export default function TaskApp() {
  const [tasks, setTasks] = useState(getInitialTasks);
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    const trimmed = draft.trim();
    if (!trimmed) return; // no empty/whitespace-only tasks
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, done: false },
    ]);
    setDraft("");
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function startEditing(task) {
    setEditingId(task.id);
    setEditingText(task.text);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingText("");
  }

  function saveEdit(id) {
    const trimmed = editingText.trim();
    if (!trimmed) return;

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: trimmed } : task))
    );
    cancelEditing();
  }

  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <div id="main">
      <div id="app-header">
        <h1>Tasks</h1>
        <ThemeToggle />
      </div>

      <div id="input_task">
        <input
          type="text"
          placeholder="Add a task..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button id="add_task_button" onClick={addTask} type="button">
          +
        </button>
      </div>

      <div id="created_task_container">
        {tasks.length === 0 && (
          <p className="empty-state">No tasks yet. Add one above.</p>
        )}

        {tasks.map((task) => (
          <div className="created_task" key={task.id}>
            <label className="task-label">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              {editingId === task.id ? (
                <input
                  className="edit-task-input"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(task.id);
                    if (e.key === "Escape") cancelEditing();
                  }}
                  autoFocus
                  aria-label="Edit task"
                />
              ) : (
                <p className={task.done ? "done" : ""}>{task.text}</p>
              )}
            </label>
            <div className="input-delete">
              {editingId === task.id ? (
                <>
                  <button type="button" onClick={() => saveEdit(task.id)}>
                    Save
                  </button>
                  <button type="button" onClick={cancelEditing}>
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => startEditing(task)}
                  aria-label="Edit task"
                >
                  Edit
                </button>
              )}
              <button
                aria-label="Delete task"
                type="button"
                onClick={() => deleteTask(task.id)}
              >
                <svg
                  className="delete-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        ))}

        {tasks.length > 0 && (
          <p className="task-count">
            {remaining} task{remaining !== 1 ? "s" : ""} left
          </p>
        )}
      </div>
    </div>
  );
}
