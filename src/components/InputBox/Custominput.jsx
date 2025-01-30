import React from 'react';
import styles from './customInput.module.css'

const CustomInput = ({ label, type, value, name, onChange, placeholder }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default CustomInput;
