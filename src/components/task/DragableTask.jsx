import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/TaskItem";
import styles from "./DragableTask.module.css"
import { MdDeleteOutline } from "react-icons/md";

const DraggableTask = ({ task, index, column, deleteTask }) => {
  const [{ isDragging }, ref] = useDrag({
    type: ItemTypes.TASK,
    item: { index, column },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDelete = () => {
   
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task._id, column);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    const formattedTime = date.toLocaleTimeString("en-US", options);
    const formattedDate = date.toLocaleDateString("en-IN");
    return `${formattedTime} ${formattedDate}`;
  };

  return (
    <div
      ref={ref}
      className={`${styles.taskCard} ${isDragging ? styles.dragging : ""}`}
    >
      <span className={styles.deleteIcon} onClick={handleDelete}>
      <MdDeleteOutline size= {16}/>
      </span>

      <p className={styles.taskTitle}>{task.name}</p>
      <p className={styles.taskDescription}>{task.description}</p>

      {/* Date and Time */}
      <span className={styles.taskDate}>{formatDate(task.createdAt)}</span>
    </div>
  );
};

export default DraggableTask;
