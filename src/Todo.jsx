import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";

function Todo() {
  const [tasks, setTasks] = useState(["Go to Shop", "Buy Apple"]);

  const [taskInput, setTaskInput] = useState("");

  const [editId, setEditId] = useState("");

  const [editValue, setEditValue] = useState("");

  const getTasks = () => {
    axios.get("http://localhost:3000/task").then((res) => {
      setTasks(res.data);
    });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = () => {
    let data = {
      task: taskInput,
      isCompleted: false,
      user: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1aml0aGtAZ21haWwuY29tIiwiaWF0IjoxNzMwNzg4NjcyfQ.2ShoPj49X_Fjvp49fWD8dkO9rbTbBNYCrHQRYC148Hw",
    };
    axios
      .post("http://localhost:3000/task", data)
      .then((res) => {
        alert("ADDED SUCCESSFULLY");
        getTasks();
      })
      .catch((err) => {
        alert("SOMETHING WENT WRONG");
      });
    let tempTasks = [...tasks];
    tempTasks.push({ task: taskInput });
    setTasks(tempTasks);
  };

  const inputChanged = (event) => {
    setTaskInput(event.target.value);
  };

  const deleteTask = (id) => {
    axios
      .delete("http://localhost:3000/" + id)
      .then((res) => {
        alert("TASK DELETED");
        getTasks();
      })
      .catch((err) => {
        alert("SOMETHING WENT WRONG");
      });
  };

  const editTask = (task) => {
    setEditId(task._id);
    setEditValue(task.task);
  };

  const updateTask = () => {
    axios
      .put("http://localhost:3000/" + editId, { task: editValue })
      .then((res) => {
        alert("UPDATED");
        setEditId("");
        setEditValue("");
        getTasks();
      });
  };

  return (
    <div>
      <Login />
      <hr />
      <h1>TODO APPLICATION</h1>
      <input type="text" onChange={inputChanged} />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task, index) => {
          return (
            <>
              {editId == task._id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(event) => setEditValue(event.target.value)}
                  />
                  <button onClick={updateTask}>Save</button>
                </>
              ) : (
                <li key={index}>
                  {task.task}
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                  <button onClick={() => editTask(task)}>Edit</button>
                </li>
              )}
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default Todo;
