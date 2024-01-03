import React from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState } from "react";

const Inputtime = (props) => {
  const [Title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const addTask = async (e) => {
    e.preventDefault();
    const task = await axios
      .post("/api/tasks", { title: Title, details: details, type: "timer" })
      .catch((error) => {
        if (error.request) {
          console.log("not Authendicated");
        }
      });
    props.setTask((t) => [...t, task.data]);
    setTitle("");
    setDetails("");
  };

  return (
    <form className="taskinput">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={Title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Set Time</label>
        <input
          type="time"
          value={details}
          max={"10:00"}
          step={1}
          onChange={(e) => {
            setDetails(e.target.value);
          }}
        />
      </div>
      <Button type="submit" onClick={(e) => addTask(e)}>
        Addtask
      </Button>
    </form>
  );
};
export default Inputtime;
