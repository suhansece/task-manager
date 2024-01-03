import React, { useState} from "react";
import Button from "react-bootstrap/Button";

const Counterbox = (props) => {
  const [task, setTasks] = useState(props.taskdata);
  

  const [disable, setDisable] = useState(props.disable || false);

  const [count, setCount] = useState(Number(task.currentstatus) || 0);

  
  const changeCount = (c) => {
    if (c >= 0) {
      setCount(c);
      props.updateTask(c,task._id);
    }
  };

  return (
    <div className="counter-box">
      <div className="task-nav">
        <i>
          {count}/{task.details} count
        </i>

        <p>
          {task.createdAt.slice(0, 10)} {task.createdAt.slice(11, 16)}
        </p>
      </div>
      <div className="counterbox-content">
        <h1>{task.title}</h1>
        <div>
          <Button
            disabled={disable}
            onClick={async () => {
              changeCount(count - 1);
            }}
          >
            -
          </Button>
          <p>{count}</p>
          <Button
            disabled={disable}
            onClick={async () => {
              changeCount(count + 1);
            }}
          >
            +
          </Button>
        </div>
      </div>

      {!disable && (
        <Button
          className="done-btn"
          onClick={() => {
            props.updateTask(count,task._id);
            props.completedTask(task._id)
          }}
        >
          <i className="bi bi-check"></i> Done
        </Button>
      )}
      <Button
        style={{ marginLeft: "10px", position: "absolute", right: "-50px" }}
        onClick={() => {
          props.deleteTask(task._id);
        }}
      >
        <i className="bi bi-trash3"></i>
      </Button>
    </div>
  );
};

export default Counterbox;
