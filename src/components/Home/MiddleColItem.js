import React from "react";
import { Colors } from "../../shared/Colors";
import { BoldText, LightText } from "../../shared/UI/Text";
import classes from "./MiddleColItem.module.css";

const MiddleColItem = ({ key, image, title, symbol, qty }) => {
  return (
    <div
      style={{
        border: "solid 1px #888",
        width: "90%",
        height: "11vw",
      }}
      className={[`d-flex`, `flex-column`].join(" ")}
      key={key}
    >
      <div className="d-flex justify-content-between px-2 py-2">
        <div
          className={[
            classes.homeCenterDivImageDiv,
            `d-flex`,
            `justify-content-center`,
            `align-items-center`,
          ].join(" ")}
          style={{ backgroundColor: Colors.darkBackground }}
        >
          <img src={image} alt={title} />
        </div>
        <div>
          <div>
            <LightText className="m-0" style={{ fontSize: "0.6vw" }}>
              {title}
            </LightText>
          </div>
          <div className="d-flex align-items-end">
            <div>
              <BoldText
                className="m-0"
                style={{
                  fontSize: "1.7vw",
                  fontWeight: "bolder",
                  color: Colors.greenTitle,
                }}
              >
                {qty}
              </BoldText>
            </div>
            {symbol && (
              <div>
                {
                  <LightText className="m-0" style={{ fontSize: "0.6vw" }}>
                    {symbol}
                  </LightText>
                }
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={classes.homeCenterGraphDiv}></div>
    </div>
  );
};

export default MiddleColItem;
