import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Styles/CircularProgress.scss";

const CircularProgess = ({ progress, text, size }) => {
  return (
    <div
      className="circular-progress-container"
      style={{ width: size, height: size }}
    >
      <CircularProgressbarWithChildren value={progress}>
        <span style={{ fontSize: 18, fontWeight: "bold" }}>{text}</span>
        <span style={{ fontSize: 24, fontWeight: "bold" }}>
          {progress && `${progress}`}
        </span>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default CircularProgess;
