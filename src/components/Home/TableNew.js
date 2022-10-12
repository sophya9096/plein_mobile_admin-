import classes from "./Table.module.css";
import React from "react";
import { Colors } from "../../shared/Colors";
import { BoldText, LightText } from "../../shared/UI/Text";

const Table = ({ tableHeader, maxHeight, data, children, bottomPadding }) => {
  console.log("data", data);
  return (
    <div
      style={{ color: "#fff", border: "solid 1px #fff", flex: 1 }}
      className={[`d-flex`, `flex-column`, classes.tableMainDiv].join(" ")}
    >
      <div
        className="d-flex py-2"
        style={{
          backgroundColor: Colors.blue,
          position: "sticky",
          top: 0,
          padding: "0px 30px 0 10px",
          boxShadow: "0px 0px 5px 0px #888",
        }}
      >
        {tableHeader &&
          tableHeader.map((item, i) => {
            return (
              <div
                style={{
                  flex: item.flex,
                }}
                className="d-flex justify-content-center align-items-center"
              >
                <BoldText
                  className="m-0 py-2 text-center"
                  style={{ color: "#fff", fontSize: "13px" }}
                >
                  {item.title}
                </BoldText>
              </div>
            );
          })}
      </div>
      <div
        style={{
          maxHeight: maxHeight,
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
        className={[
          classes.tableBodyDiv,
          `py-2`,
          bottomPadding && bottomPadding,
        ].join(" ")}
      >
        {children}
        {/* {data.map((fuelData, j) => {
          return (
            <div
              className="d-flex"
              style={{ padding: "5px 10px", borderBottom: "solid 1px #ccc" }}
              key={j}
            >
              {fuelData &&
                fuelData.map((item, k) => {
                  return (
                    <div
                      key={k}
                      style={{ flex: item.flex }}
                      className="d-flex justify-content-center align-items-center"
                    >
                      {!item.action && (
                        <div
                          style={{
                            backgroundColor: item.action && Colors.blue,
                            borderRadius: item.action && "20px",
                            width: item.action && "90px",
                          }}
                          className={item.action && "py-2"}
                        >
                          <LightText
                            className="m-0 text-center"
                            style={{ color: "#000", fontSize: "13px" }}
                          >
                            {item.id === 1 ? j + 1 : item.value}
                          </LightText>
                        </div>
                      )}
                      {item.action && (
                        <div className="d-flex">
                          <div
                            onClick={item.func}
                            style={{
                              backgroundColor: item.action && Colors.blue,
                              borderRadius: item.action && "20px",
                              width: item.action && "90px",
                            }}
                            className={item.action && "py-2"}
                          >
                            <LightText
                              className="m-0 text-center"
                              style={{ color: "#000", fontSize: "13px" }}
                            >
                              {item.value}
                            </LightText>
                          </div>
                          <div
                            style={{
                              backgroundColor: item.action && Colors.blue,
                              borderRadius: item.action && "20px",
                              width: item.action && "90px",
                            }}
                            className={item.action && "py-2"}
                          >
                            <LightText
                              className="m-0 text-center"
                              style={{ color: "#000", fontSize: "13px" }}
                            >
                              {item.value}
                            </LightText>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default Table;
