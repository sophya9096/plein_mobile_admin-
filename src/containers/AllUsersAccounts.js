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

const AllUsersAccounts = () => {
    const { userId, token } = useAuth();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        const dashboard = async () => {
            console.log("Dashboard");
            try {
                const responseData = await sendRequest(
                    `http://11.0.0.100:5000/admin/all-users`,
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
                setUsersList(responseData.users);
            } catch (err) {
                console.log("err", err);
            }
        };
        dashboard();
    }, [sendRequest]);
    const handleLoadMoreProducts = async () => {
        // const fetchProduct = async () => {
        // setIsLoadingMoreProducts(true);

        let urltoEditandAdd = `all-users?skip=${usersList.length}`;

        try {
            const responseData = await sendRequest(
                `http://11.0.0.100:5000/admin/${urltoEditandAdd}`,
                "POST",
                {
                    "Content-Type": "application/json",
                },
                JSON.stringify({
                    type: "pr",
                }),
            );
            console.log("responseDataNewStudies", responseData);
            let tempUsersList = usersList.concat(responseData.users);
            console.log("tempUsersList", tempUsersList);
            tempUsersList.concat(responseData.users);
            setUsersList(tempUsersList);
            // if (responseData.users.length === 10) {
            //   // setShowLoad(true);
            //   return
            // } else {
            //   // setShowLoad(false);
            // }
            // console.log("all products", data);
        } catch (err) {
            // setIsLoadingMoreProducts(false);
            console.log(err.message);
        }
        // };
        // fetchProduct();
    };
    const tableHeader = [
        {
            id: 1,
            title: "S.No",
            flex: 1,
        },
        {
            id: 2,
            title: "First Name",
            flex: 1,
        },
        {
            id: 3,
            title: "Last Name",
            flex: 1,
        },
        {
            id: 4,
            title: "Email",
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
    const users = (
        <div>
            {[...Array(10)].map((i, j) => {
                return (
                    <div key={j} className="d-flex py-3 align-items-center" style={{ borderBottom: "solid 1px #ccc" }}>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">{j + 1}</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">{"Jhon Doe"}</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">{"Jason Doe"}</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">{"jhon@gmail.com"}</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }} className="d-flex justify-content-center">
                            <Link
                                to={`/all-users-accounts/${""}`}
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
            {/* {usersList &&
                usersList.map((data, i) => {
                    return (
                        <div key={i} className="d-flex py-3 align-items-center" style={{ borderBottom: "solid 1px #ccc" }}>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{i + 1}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{data.fname}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{data.lname}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{data.email}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }} className="d-flex justify-content-center">
                                <Link
                                    to={`/all-users-accounts/${data._id}`}
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
    const noUsers = (
        <div>
            <BoldText className="text-center m-0" style={{ color: "#000", fontWeight: 600 }}>
                No Users
            </BoldText>
        </div>
    );
    return (
        <div className="d-flex">
            <LeftPanel />
            <div className="col-10" style={{ backgroundColor: "#eaeaea" }}>
                <div className="py-5">
                    <TitleBar title="All Users Accounts" />
                    <Table tableHeader={tableHeader} tableData={tableData} maxHeight="77vh">
                        {/* {usersList && usersList.length ? users : noUsers} */}
                        {usersList ? users : noUsers}
                        {usersList && usersList.length === 10 && (
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

export default AllUsersAccounts;
