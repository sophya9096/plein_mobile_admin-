import classes from "./Table.module.css";
import React from "react";
import { Colors } from "../../shared/Colors";
import { BoldText, LightText } from "../../shared/UI/Text";

const Table = ({ tableHeader, tableData, maxHeight }) => {
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
        style={{ maxHeight: maxHeight }}
        className={[classes.tableBodyDiv, `py-2`].join(" ")}
      >
        {[...Array(30)].map((i, j) => {
          return (
            <div
              className="d-flex"
              style={{ padding: "5px 10px", borderBottom: "solid 1px #ccc" }}
              key={i}
            >
              {tableData &&
                tableData.map((item, i) => {
                  return (
                    <div
                      style={{ flex: item.flex }}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <div
                        style={{
                          backgroundColor: item.action && Colors.blue,
                          borderRadius: item.action && "20px",
                          width: item.action && "90px",
                        }}
                        key={i}
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
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
