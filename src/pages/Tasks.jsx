import React, { useState, useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustomButton from "../components/customButton/CustomButton";
import CustomInput from "../components/InputBox/Custominput";
import Column from "../components/task/Column";
import { DndProvider } from "react-dnd";
import axios from "axios";
import api from "../utils/axios";
import styles from './task.module.css'
import CreateTask from "../components/task/CreateTask";

const Tasks = () => {
  
  const [columns, setColumns] = useState({
    pending: [],
    completed: [],
    done: [],
  });


  //createtask modal
  const [open, setOpen] = useState(false)

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/api/v1/task/get-all");
      const tasks = response.data.data;

      // Organize tasks by columns
      const organizedColumns = { pending: [], completed: [], done: [] };
      tasks.forEach((task) => {
        if (organizedColumns[task.status]) {
          organizedColumns[task.status].push(task);
        }
      });

      setColumns(organizedColumns);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

 
  const moveTask = async (fromIndex, fromColumn, toIndex, toColumn) => {
    const updatedColumns = { ...columns };
    const [movedTask] = updatedColumns[fromColumn].splice(fromIndex, 1);
    movedTask.status = toColumn;

    updatedColumns[toColumn].splice(toIndex, 0, movedTask);
    setColumns(updatedColumns);

    // Update task status via API
    try {
      await api.put(`/api/v1/task/update`, {
        Id: movedTask._id,
        status: toColumn,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId, column) => {
    try {
      console.log("Task Id for delete :", taskId)
      await api.post(`/api/v1/task/delete`, {
        Id: taskId,
      });
  
   
      setColumns((prevColumns) => {
        const updatedColumn = prevColumns[column].filter((task) => task._id !== taskId);
        return {
          ...prevColumns,
          [column]: updatedColumn,
        };
      });
  
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className ={styles.create_btn}>
        <CustomButton label={"Create Task"} onClick={() => {setOpen(true)}} />
      </div>

      <CreateTask onSubmit={fetchTasks} open={open} setOpen={setOpen}/>

      <div>
        {/* Task Columns */}
        <div className="flex flex-wrap w-full justify-between gap-2">
          <Column
            tasks={columns.pending}
            column="pending"
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
          <Column
            tasks={columns.completed}
            column="completed"
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
          <Column 
            tasks={columns.done} 
            column="done"
            moveTask={moveTask}
            deleteTask={deleteTask} 
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default Tasks;
