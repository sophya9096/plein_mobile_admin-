import classes from "./Text.module.css";

export const LightText = (props) => {
  return (
    // <p style={{ fontWeight: 100 }} {...props}>
    <p className={[props.className, classes.lightText].join(" ")} {...props}>
      {props.children}
    </p>
  );
};
export const BoldText = (props) => {
  return (
    <p className={[props.className, classes.boldText].join(" ")} {...props}>
      {props.children}
    </p>
  );
};
