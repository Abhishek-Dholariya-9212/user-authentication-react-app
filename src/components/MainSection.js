import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const MainSection = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("top");
  const [deadline, setDeadline] = useState("");

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const addTask = () => {
    if (task.trim() === "" || deadline === "") {
      toast.warn("Please enter a task and select a valid deadline.");
      return;
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      toast.warn("Please select a future date for the deadline.");
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      task,
      priority,
      deadline,
      done: false,
    };

    setTasks([...tasks, newTask]);

    setTask("");
    setPriority("top");
    setDeadline("");
    toast.success("Task added successfully!");
  };

  const markDone = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, done: true } : t
    );
    setTasks(updatedTasks);

    const completedTask = tasks.find((t) => t.id === id);
    if (completedTask) {
      setCompletedTasks([...completedTasks, completedTask]);
    }
  };

  const upcomingTasks = tasks.filter((t) => !t.done);

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "top":
        return <span className="badge bg-danger">Top Priority</span>;
      case "middle":
        return <span className="badge bg-warning text-dark">Middle Priority</span>;
      case "low":
        return <span className="badge bg-secondary">Less Priority</span>;
      default:
        return <span className="badge bg-secondary">{priority}</span>;
    }
  };

  return (
    <div className="container py-4">
      <main>
        <div className="card shadow mb-4">
        <ToastContainer position="top-right" autoClose={3000} />
          <div className="card-body">
            <form
              className="row g-2 align-items-center"
              onSubmit={e => {
                e.preventDefault();
                addTask();
              }}
            >
              <div className="col-md-4">
                <input
                  type="text"
                  id="task"
                  className="form-control"
                  placeholder="Enter task..."
                  value={task}
                  onChange={handleTaskChange}
                />
              </div>
              <div className="col-md-3">
                <select
                  id="priority"
                  className="form-select"
                  value={priority}
                  onChange={handlePriorityChange}
                >
                  <option value="top">Top Priority</option>
                  <option value="middle">Middle Priority</option>
                  <option value="low">Less Priority</option>
                </select>
              </div>
              <div className="col-md-3">
                <input
                  type="date"
                  id="deadline"
                  className="form-control"
                  value={deadline}
                  onChange={handleDeadlineChange}
                />
              </div>
              <div className="col-md-2 d-grid">
                <button
                  id="add-task"
                  className="btn btn-primary"
                  type="submit"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
        <h2 className="mb-3">Upcoming Tasks</h2>
        <div className="card shadow mb-4">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Task Name</th>
                    <th>Priority</th>
                    <th>Deadline</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingTasks.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center text-muted">
                        No upcoming tasks.
                      </td>
                    </tr>
                  ) : (
                    upcomingTasks.map((t) => (
                      <tr key={t.id}>
                        <td>{t.task}</td>
                        <td>{getPriorityBadge(t.priority)}</td>
                        <td>{t.deadline}</td>
                        <td>
                          {!t.done && (
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => markDone(t.id)}
                            >
                              Mark Done
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="card shadow">
          <div className="card-body">
            <h2 className="mb-3">Completed Tasks</h2>
            <div className="table-responsive">
              <table className="table table-bordered mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Task Name</th>
                    <th>Priority</th>
                    <th>Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {completedTasks.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted">
                        No completed tasks yet.
                      </td>
                    </tr>
                  ) : (
                    completedTasks.map((ct) => (
                      <tr key={ct.id}>
                        <td>{ct.task}</td>
                        <td>{getPriorityBadge(ct.priority)}</td>
                        <td>{ct.deadline}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainSection;