import React, { useEffect, useState } from "react";
import { Colors } from "../shared/Colors";
// import Table from "../components/Home/Table";
import Table from "../components/Home/TableNew";
import LeftPanel from "../components/LeftPanel";
import TitleBar from "../components/TitleBar";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useAuth } from "../shared/hooks/auth-hooks";
import { Link } from "react-router-dom";
import { BoldText } from "../shared/UI/Text";
import Button from "../shared/UI/Button";
import classes from "../components/Home/RightCol.module.css";

const AllVehicles = () => {
    const { userId, token } = useAuth();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        const dashboard = async () => {
            console.log("Dashboard");
            try {
                const responseData = await sendRequest(
                    // `http://localhost:5000/admin/all-vehicles`,
                    `https://plein-backend.herokuapp.com/admin/all-vehicles`,
                    "POST",
                    {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    JSON.stringify({
                        userId,
                    }),
                );
                console.log("responseData", responseData);

                // setFuelTypes(tempArr);
                setVehicles(responseData.vehiceles);
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
            title: "Model",
            flex: 1,
        },
        {
            id: 3,
            title: "Make",
            flex: 1,
        },
        {
            id: 4,
            title: "License",
            flex: 1,
        },
        {
            id: 5,
            title: "Action",
            flex: 1,
        },
    ];
    const tableData = [
        {
            id: 1,
            value: "Alyssa Hansen",
            flex: 1,
        },
        {
            id: 2,
            value: "Acura",
            flex: 1,
        },
        {
            id: 3,
            value: "$150",
            flex: 1,
        },
        {
            id: 4,
            value: "15 Litres",
            flex: 1,
        },
        {
            id: 5,
            value: "10 Dec 2020",
            flex: 1,
        },
        {
            id: 8,
            value: "DeActivate",
            flex: 1,
            action: true,
        },
    ];
    const allVehiclesData = (
        <div>
            {[...Array(10)].map((i, j) => {
                return (
                    <div key={j} className="d-flex py-3 align-items-center" style={{ borderBottom: "solid 1px #ccc" }}>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">{j + 1}</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">2021</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">Toyota</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">AFR-2021</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }} className="d-flex justify-content-center">
                            <Link
                                to={`/all-vehicles/`}
                                className="mr-2 py-2 text-center"
                                style={{
                                    flex: 1,
                                    backgroundColor: Colors.blue,
                                    color: "#000",
                                    border: "none",
                                    borderRadius: "25px",
                                }}
                            >
                                View
                            </Link>
                        </div>
                    </div>
                );
            })}
            {/* {vehicles &&
                vehicles.map((data, i) => {
                    return (
                        <div key={i} className="d-flex py-3 align-items-center" style={{ borderBottom: "solid 1px #ccc" }}>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{i + 1}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{data.vehicleModel}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{data.make}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{data.license}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }} className="d-flex justify-content-center">
                                <Link
                                    to={`/all-vehicles/${data._id}`}
                                    className="mr-2 py-2 text-center"
                                    style={{
                                        flex: 1,
                                        backgroundColor: Colors.blue,
                                        color: "#000",
                                        border: "none",
                                        borderRadius: "25px",
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
    const noVehicles = (
        <div>
            <BoldText className="text-center m-0" style={{ color: "#000", fontWeight: 600 }}>
                No Vehicles
            </BoldText>
        </div>
    );

    return (
        <div className="d-flex">
            <LeftPanel />
            <div className="col-10" style={{ backgroundColor: "#eaeaea" }}>
                <div className="py-5">
                    <TitleBar title="All Vehicles" />
                    <Table tableHeader={tableHeader} tableData={tableData} maxHeight="77vh">
                        {allVehiclesData ? allVehiclesData : noVehicles}
                        {vehicles && vehicles.length === 10 && (
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

export default AllVehicles;
