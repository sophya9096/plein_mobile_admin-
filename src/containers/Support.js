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

const Support = () => {
    const { userId, token } = useAuth();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [supportRequests, setSupportRequests] = useState([]);
    const [newsLetters, setNewsLetters] = useState([]);
    useEffect(() => {
        const dashboard = async () => {
            console.log("Dashboard");
            try {
                const responseData = await sendRequest(
                    `http://11.0.0.100:5000/admin/all-supports`,
                    "POST",
                    {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    JSON.stringify({
                        userId,
                    }),
                );
                // console.log("responseData", responseData);

                // setFuelTypes(tempArr);
                setSupportRequests(responseData.supports);
            } catch (err) {
                console.log("err", err);
            }
        };
        dashboard();
    }, [sendRequest]);
    useEffect(() => {
        const dashboard = async () => {
            console.log("Dashboard");
            try {
                const responseData = await sendRequest(
                    `http://11.0.0.100:5000/admin/all-newsletters`,
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
                setNewsLetters(responseData.newsletters);
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
            title: "Name",
            flex: 1,
        },
        {
            id: 4,
            title: "Subject",
            flex: 1,
        },
        {
            id: 5,
            title: "Message",
            flex: 2,
        },
    ];
    const tableHeaderNews = [
        {
            id: 1,
            title: "S.No",
            flex: 1,
        },
        {
            id: 2,
            title: "Name",
            flex: 1,
        },
        {
            id: 4,
            title: "Email",
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
    const supports = (
        <div>
            {[...Array(20)].map((i, j) => {
                return (
                    <div key={j} className="d-flex py-3 align-items-center" style={{ borderBottom: "solid 1px #ccc" }}>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">{j + 1}</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">{"Jane Doe"}</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">{"Order"}</p>
                        </div>
                        <div style={{ color: "#000", flex: 2 }}>
                            <p className="m-0 text-center">{"Quick brown fox jumps over the lazy dog.."}</p>
                        </div>
                        {/* <div style={{ color: "#000", flex: 2 }} className="d-flex justify-content-center">
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
                        </div> */}
                    </div>
                );
            })}

            {/* {supportRequests &&
                supportRequests.map((data, i) => {
                    return (
                        <div key={i} className="d-flex py-3 align-items-center" style={{ borderBottom: "solid 1px #ccc" }}>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{i + 1}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{data.name}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{data.subject}</p>
                            </div>
                            <div style={{ color: "#000", flex: 2 }}>
                                <p className="m-0 text-center">{data.message}</p>
                            </div>
                            <div
                style={{ color: "#000", flex: 2 }}
                className="d-flex justify-content-center"
              >
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
    const newsLettersData = (
        <div>
            {[...Array(20)].map((i, j) => {
                return (
                    <div key={j} className="d-flex py-3 align-items-center" style={{ borderBottom: "solid 1px #ccc" }}>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">{j + 1}</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">{"Jhon Doe"}</p>
                        </div>
                        <div style={{ color: "#000", flex: 1 }}>
                            <p className="m-0 text-center">{"jhon@gmail.com"}</p>
                        </div>
                        {/* <div style={{ color: "#000", flex: 2 }} className="d-flex justify-content-center">
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
                        </div> */}
                    </div>
                );
            })}

            {/* {newsLetters &&
                newsLetters.map((data, i) => {
                    return (
                        <div key={i} className="d-flex py-3 align-items-center" style={{ borderBottom: "solid 1px #ccc" }}>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{i + 1}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{data.name}</p>
                            </div>
                            <div style={{ color: "#000", flex: 1 }}>
                                <p className="m-0 text-center">{data.email}</p>
                            </div>
                            <div style={{ color: "#000", flex: 2 }} className="d-flex justify-content-center">
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
    const noSupports = (
        <div>
            <BoldText className="text-center m-0" style={{ color: "#000", fontWeight: 600 }}>
                No Supports
            </BoldText>
        </div>
    );
    const noNewsLetters = (
        <div>
            <BoldText className="text-center m-0" style={{ color: "#000", fontWeight: 600 }}>
                No Newsletters
            </BoldText>
        </div>
    );
    return (
        <div className="d-flex ">
            <LeftPanel />
            <div className="col-10" style={{ backgroundColor: "#eaeaea" }}>
                <div className="">
                    <TitleBar title="All Requests" />
                    <Table tableHeader={tableHeader} tableData={tableData} maxHeight="36.5vh">
                        {/* {supportRequests && supportRequests.length ? supports : noSupports} */}
                        {supportRequests ? supports : noSupports}
                        {supportRequests && supportRequests.length === 10 && (
                            <div className={[`mt-3`, "pb-2"].join(" ")}>
                                <Button className={classes.loadMoreButton} style={{ backgroundColor: Colors.darkBackground }}>
                                    Load More
                                </Button>
                            </div>
                        )}
                    </Table>
                </div>
                <div className="">
                    <TitleBar title="News Letters" />
                    <Table tableHeader={tableHeaderNews} tableData={tableData} maxHeight="36.5vh">
                        {/* {newsLetters && newsLetters.length ? newsLettersData : noNewsLetters} */}
                        {newsLetters ? newsLettersData : noNewsLetters}
                        {newsLetters && newsLetters.length === 10 && (
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

export default Support;
