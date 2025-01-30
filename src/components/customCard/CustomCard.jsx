import React from 'react';
import styles from './CustomCard.module.css';

const CustomCard = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default CustomCard;
