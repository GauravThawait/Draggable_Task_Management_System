import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/TaskItem";
import DraggableTask from "./DragableTask";
import styles from "./Column.module.css";

const Column = ({ tasks, column, moveTask, deleteTask }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (draggedItem) => {
      if (draggedItem.column !== column) {
        moveTask(draggedItem.index, draggedItem.column, tasks.length, column);
        draggedItem.column = column;
      }
    },
  });

  return (
    <div ref={drop} className={styles.column}>
      <div className={styles.title_container}>
      <h2 className={styles.title}>{column}</h2>
      </div>
      {tasks.map((task, index) => (
        <DraggableTask
          key={index}
          task={task}
          index={index}
          column={column}
          moveTask={moveTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default Column;
