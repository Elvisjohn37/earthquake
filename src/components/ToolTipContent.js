import React from "react";
import styles from "./ToolTipContent.module.scss";
import {formatDate} from './../assets/js/helper.js';

const ToolTipContent = ({ location, dateTime, onClick }) => {

  return (
    <div className={styles.toolTipContent} onClick={onClick}>
      <div className={styles.location}>{location}</div>
      <div className={styles.dateTime}>{formatDate(dateTime)}</div>
    </div>
  );
};

export default ToolTipContent;
