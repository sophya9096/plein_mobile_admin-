import React from "react";

const Button = (props) => {
  return (
    <div
      style={props.divStyle}
      className={["d-flex", props.divClass].join(" ")}
    >
      <button
        style={props.style}
        className={props.className}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
