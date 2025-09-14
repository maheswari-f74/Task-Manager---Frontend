const { useState } = React;

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [tag, setTag] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      { text: newTask, done: false, tag, id: Date.now() }
    ]);
    setNewTask("");
    setTag("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    const matchesQuery =
      t.text.toLowerCase().includes(query.toLowerCase()) ||
      t.tag.toLowerCase().includes(query.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "done" && t.done) ||
      (filter === "pending" && !t.done);
    return matchesQuery && matchesFilter;
  });

  const progress = tasks.length
    ? (tasks.filter(t => t.done).length / tasks.length) * 100
    : 0;

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>

      {/* Add Task */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New task"
          className="border p-2 flex-1 rounded"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tag"
          className="border p-2 w-28 rounded"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-2 mb-4">
        <input
          id="searchBox"
          type="text"
          placeholder="Search tasks or tags..."
          className="border p-2 flex-1 rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 h-3 rounded">
          <div
            className="bg-green-500 h-3 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Progress: {progress.toFixed(0)}%
        </p>
      </div>

      {/* Task List */}
      <ul className="space-y-2">
        {filteredTasks.map(t => (
          <li
            key={t.id}
            className="flex justify-between items-center p-2 border rounded"
          >
            <div
              className={`flex-1 cursor-pointer ${
                t.done ? "line-through text-gray-500" : ""
              }`}
              onClick={() => toggleTask(t.id)}
            >
              {t.text}
              {t.tag && (
                <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded">
                  #{t.tag}
                </span>
              )}
            </div>
            <button
              onClick={() => deleteTask(t.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<TaskManager />);
