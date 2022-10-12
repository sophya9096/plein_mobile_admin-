import React, { useEffect, useRef, useState } from "react";
import { LightText } from "../../shared/UI/Text";
import ArrowBlack from "../../assets/ArrowBlack.png";
import BarChart from "../BarChart";

let useClickOutside = (handler) => {
  let domNode = useRef();
  useEffect(() => {
    let maybeHandler = (event) => {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });
  return domNode;
};
let useClickOutside1 = (handler) => {
  let domNode1 = useRef();
  useEffect(() => {
    let maybeHandler = (event) => {
      if (domNode1.current && !domNode1.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });
  return domNode1;
};
const LeftChart = () => {
  const [isFirstDropdownVisible, setIsFirstDropdownVisible] = useState(false);
  const [isSecDropdownVisible, setIsSecDropdownVisible] = useState(false);
  let domNode = useClickOutside(() => {
    setIsFirstDropdownVisible(false);
  });
  let domNode1 = useClickOutside1(() => {
    setIsSecDropdownVisible(false);
  });

  return (
    <div className="col-6 d-flex">
      <div
        style={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: 25,
        }}
        className="d-flex flex-column p-2"
      >
        <div
          style={{ flex: 1 }}
          className="d-flex justify-content-between align-items-center my-2"
        >
          <div>
            <LightText className="m-0">Net Income</LightText>
          </div>
          <div className="d-flex">
            <div className="mr-2">
              <div
                className="d-flex align-items-baseline justify-content-between"
                style={{
                  width: "80px",
                  border: "solid 1px #ccc",
                  padding: "2px 5px",
                  borderRadius: "4px",
                }}
                onClick={() =>
                  setIsFirstDropdownVisible(!isFirstDropdownVisible)
                }
              >
                <div>
                  <LightText style={{ fontSize: "13px" }} className="m-0">
                    Monthly
                  </LightText>
                </div>
                <div
                  className="d-flex"
                  style={{ width: "8px", height: "10px" }}
                >
                  <img
                    alt="down"
                    src={ArrowBlack}
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              </div>
              {isFirstDropdownVisible && (
                <div
                  ref={domNode}
                  className="d-flex flex-column"
                  style={{
                    border: "solid 1px #ccc",
                    backgroundColor: "#fff",
                    position: "absolute",
                    width: "80px",
                    padding: "2px 5px",
                  }}
                >
                  <div>
                    <LightText className="m-0" style={{ fontSize: "13px" }}>
                      Monthly
                    </LightText>
                  </div>
                  <div>
                    <LightText className="m-0" style={{ fontSize: "13px" }}>
                      Monthly
                    </LightText>
                  </div>
                  <div>
                    <LightText className="m-0" style={{ fontSize: "13px" }}>
                      Monthly
                    </LightText>
                  </div>
                  <div>
                    <LightText className="m-0" style={{ fontSize: "13px" }}>
                      Monthly
                    </LightText>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div
                onClick={() => setIsSecDropdownVisible(!isSecDropdownVisible)}
                className="d-flex align-items-baseline justify-content-between"
                style={{
                  width: "80px",
                  border: "solid 1px #ccc",
                  padding: "2px 5px",
                  borderRadius: "4px",
                }}
              >
                <div>
                  <LightText style={{ fontSize: "13px" }} className="m-0">
                    Last Year
                  </LightText>
                </div>
                <div
                  className="d-flex"
                  style={{ width: "8px", height: "10px" }}
                >
                  <img
                    alt="down"
                    src={ArrowBlack}
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              </div>
              {isSecDropdownVisible && (
                <div
                  ref={domNode1}
                  className="d-flex flex-column"
                  style={{
                    border: "solid 1px #ccc",
                    backgroundColor: "#fff",
                    position: "absolute",
                    width: "80px",
                    padding: "2px 5px",
                  }}
                >
                  <div>
                    <LightText className="m-0" style={{ fontSize: "13px" }}>
                      Monthly
                    </LightText>
                  </div>
                  <div>
                    <LightText className="m-0" style={{ fontSize: "13px" }}>
                      Monthly
                    </LightText>
                  </div>
                  <div>
                    <LightText className="m-0" style={{ fontSize: "13px" }}>
                      Monthly
                    </LightText>
                  </div>
                  <div>
                    <LightText className="m-0" style={{ fontSize: "13px" }}>
                      Monthly
                    </LightText>
                  </div>
                </div>
              )}{" "}
            </div>
          </div>
        </div>
        <div
          style={
            {
              // border: "solid 1px #000",
            }
          }
        >
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default LeftChart;
