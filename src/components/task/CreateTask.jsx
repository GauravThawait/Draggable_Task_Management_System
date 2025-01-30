import React, { useState } from "react";
import styles from "./CreateTask.module.css";
import CustomInput from "../InputBox/Custominput";
import CustomButton from "../customButton/CustomButton";
import api from "../../utils/axios";

export default function CreateTask({ open, setOpen, onSubmit, onDismiss }) {
  const [task, setTask] = useState({ description: "" });

  const handleSubmit = async () => {
    console.log(task);
    const res = await api.post(`/api/v1/task/create`, task);
    console.log(res);
    onSubmit();
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <>
      {open && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Create Task</h2>
              <button
                onClick={() => setOpen(false)}
                className={styles.modalCloseButton}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalBody}>
              <CustomInput
                label="Task Description"
                type="text"
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Enter task description"
              />
              <CustomButton type="submit" label="Add Task" />
            </form>

            <div className={styles.modalFooter}>
              <button
                onClick={() => setOpen(false)}
                className={styles.modalCancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
