import { useState, useEffect } from "react";

interface Task {
  label: string;
  isCompleted: boolean;
  id?: number;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    label: "",
    isCompleted: false,
  });

  useEffect(() => {
    fetch("/all-tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data as Task[]))
      .catch((err) => console.error);
  }, []);

  function getCookie(name: string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const createTask = () => {
    fetch("/create-task", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken") as string,
      },
      mode: "same-origin",
    })
      .then((response) => response.json())
      .then((data) => setTasks((prevState) => [...prevState, data]));
  };

  const updateTask = (task : Task) => {
    fetch(`/update-task/${task.id}/`, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken") as string,
        },
        mode: "same-origin",
      })
        .then((response) => response.json())
        .then(function(data) {
            console.log("Data is ok", data);});

    const onGoingId = task.id
    setTasks(
      tasks.map((task) => {
        if (task.id === onGoingId) {
          task.isCompleted = !task.isCompleted;
        }
        return task;
      })
    );
  };

  return (
    <div className="task-list">
      <ul className="list">
        {tasks &&
          tasks.map((task) => {
            return (
              <li>
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => {
                    if (task.id) {
                      updateTask(task);
                    }
                  }}
                />
                <label>{task.label}</label>
              </li>
            );
          })}
      </ul>

      <form className="task-form">
        <input
          type="text"
          placeholder="Your task"
          className="task-input"
          value={newTask.label}
          onChange={(event) =>
            setNewTask((prevState) => {
              return {
                ...prevState,
                label: event.target.value,
              };
            })
          }
        />
        <input
          type="checkbox"
          checked={newTask.isCompleted}
          onChange={(event) =>
            setNewTask((prevState) => {
              return {
                ...prevState,
                isCompleted: !prevState.isCompleted,
              };
            })
          }
          className="task-checkbox"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            createTask();
          }}
          className="add-task-button"
        >
          Add task
        </button>
      </form>
    </div>
  );
};

export default Tasks;
