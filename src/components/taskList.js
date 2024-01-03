import React, { useEffect, useState ,useContext} from "react";
import axios from "axios";
import "../App.css";
import Timerbox from "./tasklist/timerbox";
import Counterbox from "./tasklist/counterbox";
import Notebox from "./tasklist/notebox";
import { userContext } from "../App";

const TaskList = (props) => {
  const { tasks } = props;
  const [, , setNotification] = useContext(userContext);

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`).then(console.log(Error));
    const updatedtasks = await tasks.filter((task) => task._id !== id);
    props.setTask(updatedtasks);
  };
  const updateTask = async (currentstatus,id) => {
    try{
      await axios.patch(`/api/tasks/${id}`, { currentstatus: currentstatus });
      const updatedTasks = tasks.map((task) =>
        task._id === id ? { ...task, currentstatus: currentstatus } : task
      );
      console.log(updatedTasks)
      props.setTask(updatedTasks);
    }catch (error) {
      console.error("Error marking task as updatetask:", error);
    }
    
  };

  const completedTask = async (id) => {
    try {
      await axios.patch(`/api/tasks/${id}`, { completedstatus: true });
      const updatedTasks = tasks.map((task) =>
        task._id === id ? { ...task, completedstatus: true } : task
      );
      props.setTask(updatedTasks);
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };
  

  if (!tasks) {
    return <div style={{ margin: " 5% 40%" }}> Login to Add Task</div>;
  }
  return (
    <div
      className="tasklist"
      style={{
        marginRight: "auto",
        marginLeft: "auto",
        maxWidth: "800px",
        width: "100%",
      }}
    >
      <>
        <h1>On Going Tasks</h1>
        <div
          style={{
            minHeight: "200px",
            border: "5px solid grey",
            borderRadius: "20px",
            padding: "32px",
          }}
        >
          {tasks.toReversed().map((task) => {
            if (task.completedstatus === false) {
              return (
                (task.type === "timer" && (
                  <Timerbox
                    key={task._id}
                    taskdata={task}
                    deleteTask={deleteTask}
                    disable={false}
                    completedTask={completedTask}
                    updateTask={updateTask}
                  />
                )) ||
                (task.type === "counter" && (
                  <Counterbox
                    key={task._id}
                    taskdata={task}
                    disable={false}
                    deleteTask={deleteTask}
                    completedTask={completedTask}
                    updateTask={updateTask}
                  />
                )) ||
                (task.type === "note" && (
                  <Notebox
                    key={task._id}
                    taskdata={task}
                    disable={false}
                    deleteTask={deleteTask}
                    completedTask={completedTask}
                    updateTask={updateTask}
                  />
                ))
              );
            }
          })}
        </div>
      </>
      <>
        <h1>Completed Tasks</h1>
        <div
          style={{
            minHeight: "200px",
            border: "5px solid grey",
            borderRadius: "20px",
            padding: "32px",
          }}
        >
          {tasks.toReversed().map((task) => {
            if (task.completedstatus === true) {
              return (
                (task.type === "timer" && (
                  <Timerbox
                    key={task._id}
                    taskdata={task}
                    deleteTask={deleteTask}
                    disable={true}
                    completedTask={completedTask}
                  />
                )) ||
                (task.type === "counter" && (
                  <Counterbox
                    key={task._id}
                    taskdata={task}
                    deleteTask={deleteTask}
                    disable={true}
                    completedTask={completedTask}
                  />
                )) ||
                (task.type === "note" && (
                  <Notebox
                    key={task._id}
                    taskdata={task}
                    deleteTask={deleteTask}
                    disable={true}
                    completedTask={completedTask}
                  />
                ))
              );
            }
          })}
        </div>
      </>
    </div>
  );
};

export default TaskList;
