import React, { useState} from "react";
import Button from "react-bootstrap/Button";

const Notebox = (props) => {
  const [task, setTasks] = useState(props.taskdata);
  const [disable, setDisable] = useState(props.disable);

  
  return (
    <div className="note-box">
      <div className="task-nav">
        <i class="bi bi-sticky"> Note</i>

        <p>
          {task.createdAt.slice(0, 10)} {task.createdAt.slice(11, 16)}
        </p>
      </div>
      <div className="counterbox-content notecontainer">
        <h1>{task.title}</h1>
        <p>{task.details}</p>
      </div>

      {!disable && (
        <Button className="done-btn" onClick={() => {
        
          props.completedTask(task._id)
        }}>
          <i class="bi bi-check"></i> Done
        </Button>
      )}
      <Button
        style={{ marginLeft: "10px", position: "absolute", right: "-50px" }}
        onClick={() => {
            props.deleteTask(task._id);
        }}
      >
        <i class="bi bi-trash3"></i>
      </Button>
    </div>
  );
};

export default Notebox;
