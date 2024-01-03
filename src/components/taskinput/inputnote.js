import React from "react";
import Button from "react-bootstrap/Button";
import { userContext } from "../../App";

import axios from "axios";
import { useState, useContext } from "react";

const Inputnote = (props) => {
  const [Title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const addTask = async (e) => {
    e.preventDefault();
    const task = await axios
      .post("/api/tasks", { title: Title, details: details, type: "note" })
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
        <label>Details</label>
        <input
          type="text"
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
export default Inputnote;
