import React from "react";
import Button from "react-bootstrap/Button";
import { userContext } from "../../App";

import axios from "axios";
import { useState, useContext } from "react";

const Inputcounter = (props) => {
  const [Title, setTitle] = useState("");
  const [details, setDetails] = useState();

  const addTask = async (e) => {
    e.preventDefault();
    const task = await axios
      .post("/api/tasks", { title: Title, details: details, type: "counter" })
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
        <label>Set Count</label>
        <input
          type="number"
          min={0}
          value={details}
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

export default Inputcounter;
