import React, { useEffect, useState } from "react";
import { Colors } from "../../shared/Colors";
import { BoldText, LightText } from "../../shared/UI/Text";
import classes from "./RightCol.module.css";
import Arrow from "../../assets/Arrow.png";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useAuth } from "../../shared/hooks/auth-hooks";
// import Table from "./Table";
import Table from "./TableNew";
import LeftChart from "./LeftChart";
import TitleBar from "../TitleBar";
import { Link } from "react-router-dom";
import Button from "../../shared/UI/Button";

const RightCol = ({ isOpenedMiddleCol, setIsOpenedMiddleCol }) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const { userId, token } = useAuth();
    const [ordersList, setOrdersList] = useState([]);
    useEffect(() => {
        const dashboard = async () => {
            console.log("Dashboard");
            try {
                const responseData = await sendRequest(
                    `http://11.0.0.100:5000/admin/all-orders`,
                    "POST",
                    {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    JSON.stringify({
                        userId,
                        active: true,
                    }),
                );
                console.log("responseData", responseData);

                // setFuelTypes(tempArr);
                setOrdersList(responseData.orders);
            } catch (err) {
                console.log("err", err);
            }
        };
        dashboard();
    }, [sendRequest]);

    const tableHeader = [
        {
            id: 1,
            title: "S.No",
            flex: 1,
        },
        {
            id: 2,
            title: "User Name",
            flex: 1,
        },
        // {
        //     id: 3,
        //     title: "Fuel Type",
        //     flex: 1,
        // },
        {
            id: 4,
            title: "Vehicle Model",
            flex: 1,
        },
        {
            id: 5,
            title: "License Plate",
            flex: 1,
        },
        {
            id: 6,
            title: "Qty.",
            flex: 1,
        },
        {
            id: 7,
            title: "Price/Ltr",
            flex: 1,
        },
        {
            id: 8,
            title: "Action",
            flex: 1,
        },
    ];
    const noOrders = (
        <div>
            <BoldText className="text-center m-0" style={{ color: "#000", fontWeight: 600 }}>
                No Orders
            </BoldText>
        </div>
    );
    const pendingOrders = (
        <div>
            {[...Array(20)].map((i, j) => {
                return (
                    <div key={j} className="d-flex align-items-center py-1" style={{ borderBottom: "solid 1px #ccc" }}>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">{j + 1}</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">{"Jane Doe"}</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">{"Model 4"}</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">{"AFR-2021"}</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">{"5"}</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">{"110"}</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }} className="d-flex justify-content-center">
                            <Link
                                to={`/all-orders/${""}`}
                                className="mr-2 py-2 text-center"
                                style={{
                                    flex: 1,
                                    backgroundColor: Colors.blue,
                                    color: "#000",
                                    border: "none",
                                    borderRadius: "25px",
                                    textDecoration: "none",
                                }}
                            >
                                View
                            </Link>
                        </div>
                    </div>
                );
            })}
            {/* {ordersList &&
                ordersList.map((data, i) => {
                    return (
                        <div key={i} className="d-flex align-items-center py-1" style={{ borderBottom: "solid 1px #ccc" }}>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{i + 1}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{data.user.fname}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{data.vehicle.vehicleModel}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{data.vehicle.license}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{data.qty}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{data.pricePerLiter}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }} className="d-flex justify-content-center">
                                <Link
                                    to={`/all-orders/${data._id}`}
                                    className="mr-2 py-2 text-center"
                                    style={{
                                        flex: 1,
                                        backgroundColor: Colors.blue,
                                        color: "#000",
                                        border: "none",
                                        borderRadius: "25px",
                                        textDecoration: "none",
                                    }}
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    );
                })} */}
        </div>
    );
    return (
        <div
            className={[classes.homeRightMainDiv, isOpenedMiddleCol ? `col-8` : classes.col11, `d-flex`].join(" ")}
            style={{
                backgroundColor: Colors.darkBackground,
                borderTopLeftRadius: isOpenedMiddleCol && "40px",
                borderBottomLeftRadius: isOpenedMiddleCol && "40px",
            }}
        >
            <div
                className={[classes.homeRightDivToggleButton, `d-flex`, `justify-content-center`, `flex-column`, `align-items-center`].join(
                    " ",
                )}
                onClick={() => setIsOpenedMiddleCol(!isOpenedMiddleCol)}
                style={{
                    backgroundColor: Colors.greenTitle,
                    boxShadow: `0 0 5px 0px ${Colors.darkBackground}`,
                }}
            >
                <LightText className="text-center m-0" style={{ fontWeight: 400 }}>
                    Stats
                </LightText>
                <div>
                    <img src={Arrow} alt="Toggle" />
                </div>
            </div>
            <div
                style={{
                    flex: 1,
                    marginTop: "12px",
                    marginBottom: "12px",
                }}
                className="d-flex flex-column"
            >
                <div className="d-flex" style={{ flex: 2 }}>
                    <LeftChart />
                    <LeftChart />
                </div>
                <TitleBar title="Pending Orders" />
                <div style={{ flex: 4 }} className="d-flex">
                    <Table tableHeader={tableHeader} maxHeight="42vh" bottomPadding="pb-5">
                        {/* {ordersList && ordersList.length ? pendingOrders : noOrders} */}
                        {ordersList ? pendingOrders : noOrders}
                        {/* {[...Array(5)].map((i, j) => {
              return (
                <div className={[`mt-3`, "pb-5"].join(" ")}>
                  <Button
                    className={classes.loadMoreButton}
                    style={{ backgroundColor: Colors.darkBackground }}
                  >
                    Load More
                  </Button>
                </div>
              );
            })} */}
                        {ordersList && ordersList.length === 10 && (
                            <div className={[`mt-3`, "pb-2"].join(" ")}>
                                <Button className={classes.loadMoreButton} style={{ backgroundColor: Colors.darkBackground }}>
                                    Load More
                                </Button>
                            </div>
                        )}
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default RightCol;
