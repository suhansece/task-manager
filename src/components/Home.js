import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import TaskList from "./taskList";
import "../App.css";
import Inputtime from "./taskinput/timerinput";
import Inputcounter from "./taskinput/inputcounter";
import Inputnote from "./taskinput/inputnote";
import Slideshow from "./slide";

const Home = () => {
  const [add, setAdd] = useState(false);
  const [taskinputtype, setTaskinputtype] = useState("");
  const [tasks, setTask] = useState();

  const fetchTask = async () => {
    try {
      const response = await axios.get("/api/tasks");
      setTask(response.data);
      console.log("fetch")
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  

  useEffect(() => {
    fetchTask();
    document.title = "Task Manager";
  }, []);

  return (
    <div className="addtask">
      <div
        style={{
          position: "fixed",
          bottom: "10%",
          right: "10%",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Button
          style={{
            borderRadius: "50%",
            fontSize: "30px",
            height: "45px",
            width: "45px",
            padding: "0",
          }}
          onClick={() => {
            setAdd(true);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          +
        </Button>
      </div>
      {add && (
        <div className="input-type-select">
          <p>Select Task Type</p>
          <select
            onChange={(e) => {
              setTaskinputtype(e.target.value);
            }}
          >
            <option value=""></option>
            <option value="Timer">Timer</option>
            <option value="Counter">Count</option>
            <option value="Note">Note</option>
          </select>
        </div>
      )}
      {(taskinputtype === "Timer" && <Inputtime setTask={setTask} />) ||
        (taskinputtype === "Counter" && <Inputcounter setTask={setTask} />) ||
        (taskinputtype === "Note" && <Inputnote setTask={setTask} />)}
      <Slideshow />
      {tasks?.length > 0 && (
        <TaskList fetchTask={fetchTask}tasks={tasks} setTask={setTask}  />
      )}
    </div>
  );
};

export default Home;
