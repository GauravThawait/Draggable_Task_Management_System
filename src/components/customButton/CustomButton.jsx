import React from 'react';
import styles from './CustomButton.module.css';

const CustomButton = ({ label, onClick, type = "button" }) => {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default CustomButton;
