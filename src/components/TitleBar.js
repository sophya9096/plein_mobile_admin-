import React from "react";
import { Colors } from "../shared/Colors";
import { BoldText } from "../shared/UI/Text";

const TitleBar = ({ title, rightPadd, isFlull }) => {
    const width = isFlull ? "100%" : "";

    return (
        <div style={{ width: width, paddingLeft: 15, paddingRight: rightPadd ? rightPadd : 15 }}>
            <div
                style={{
                    backgroundColor: Colors.greenTitle,
                    borderRadius: "1.3vw",
                }}
                className="d-flex py-2 my-2 px-4"
            >
                <BoldText style={{ fontWeight: "bolder", fontSize: "1.3vw", color: "#fff" }} className="m-0">
                    {title}
                </BoldText>
            </div>
        </div>
    );
};

export default TitleBar;
