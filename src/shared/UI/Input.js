import React from "react";
import classes from "./Input.module.css";
const Input = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <input
        {...props}
        className={[props.className, classes.inputField].join(" ")}
      />
    </div>
  );
};

export default Input;
