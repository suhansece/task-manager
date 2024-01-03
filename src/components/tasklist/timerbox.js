import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { userContext } from "../../App";

const Timerbox = (props) => {
  const [task, setTasks] = useState(props.taskdata);
  const [taskminute, setTaskminute] = useState(
    Number(props.taskdata.details.slice(3, 5))
  );
  const [taskhour, setTaskhour] = useState(
    Number(props.taskdata.details.slice(0, 2)) || 0
  );
  const [, , setNotification] = useContext(userContext);

  const [disable, setDisable] = useState(props.disable);


  const updateTask = async (currentstatus) => {
    await axios.patch(`/api/tasks/${task._id}`, {
      currentstatus: currentstatus,
    });
  };
 

  const [hours, setHours] = useState(
    Number(task.currentstatus ? task.currentstatus.split(":")[0] : 0)
  );
  const [minutes, setMinutes] = useState(
    Number(task.currentstatus ? task.currentstatus.split(":")[1] : 0)
  );
  const [seconds, setSeconds] = useState(
    Number(task.currentstatus ? task.currentstatus.split(":")[2] : 0)
  );
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (hours >= taskhour && minutes >= taskminute) {
          setIsRunning(false);
        } else {
          if (seconds === 59) {
            if (minutes === 59) {
              setHours((prevHours) => prevHours + 1);
              setMinutes(0);
            } else {
              setMinutes((prevMinutes) => prevMinutes + 1);
            }
            setSeconds(0);
          } else {
            setSeconds((prevSeconds) => prevSeconds + 1);
          }
        }
      }, 1000); // 1000 milliseconds = 1 second
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer); // Cleanup: clear the timer when the component unmounts
    };
  }, [isRunning, seconds, minutes, hours, taskhour, taskminute, task]);

  const handleStartClick = () => {
    setIsRunning(true);
  };

  const handleStopClick = async () => {
    setIsRunning(false);
    await props.updateTask(`${hours}:${minutes}:${seconds}`,task._id);
  };

  return (
    <div className="timer-box">
      <div className="task-nav">
        <i className="bi bi-stopwatch"> {task.details}</i>
        <p>
          {task.createdAt.slice(0, 10)} {task.createdAt.slice(11, 16)}
        </p>
      </div>
      <div className="timerbox-content">
        <h1>{task.title.charAt(0).toUpperCase() + task.title.slice(1)}</h1>
        <div className="display">{`${hours} : ${minutes} : ${seconds}`}</div>
        <div>
          <Button disabled={disable} className="b" onClick={handleStartClick}>
            Start
          </Button>
          <Button disabled={disable} className="b " onClick={handleStopClick}>
            Stop
          </Button>
        </div>
      </div>
      {!disable && (
        <Button
          className="done-btn"
          onClick={async() => {
            await props.updateTask(`${hours}:${minutes}:${seconds}`,task._id);
           props.completedTask(task._id);
          }}
        >
          <i className="bi bi-check"></i> Done
        </Button>
      )}{" "}
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

export default Timerbox;
