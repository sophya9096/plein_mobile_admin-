import React from "react";
import classes from "./MiddleCol.module.css";
// import Car from "../../assets/Car.png";
// import Fuel from "../../assets/Fuel.png";
// import BarChart from "../../assets/BarChart.png";
// import Users from "../../assets/Users.png";
import Car from "../../assets/newicons/Car.png";
import Fuel from "../../assets/newicons/Fuel.png";
import BarChart from "../../assets/newicons/BarChart.png";
import Users from "../../assets/newicons/Users.png";
import MiddleColItem from "./MiddleColItem";

const MiddleCol = (props) => {
    const middleElements = [
        {
            id: 0,
            image: Users,
            title: "Total Users",
            qty: 500,
        },
        {
            id: 1,
            title: "Total Deliver",
            qty: 1500,
            symbol: "hr",
            image: Fuel,
        },
        {
            id: 2,
            title: "Total Vehicle",
            qty: 500,
            image: Car,
        },
        {
            id: 3,
            title: "Total Revenue",
            qty: 500,
            image: BarChart,
        },
    ];
    return (
        <div className={[classes.middleColMainDiv, `d-flex`, `col-3`, `py-4`].join(" ")}>
            <div className="d-flex" style={{ flex: 1 }}>
                <div className="d-flex flex-column justify-content-between align-items-center" style={{ flex: 1 }}>
                    {/* {props.children} */}
                    {middleElements.map((item, i) => (
                        <MiddleColItem key={i} image={item.image} title={item.title} qty={item.qty} symbol={item.symbol} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MiddleCol;
