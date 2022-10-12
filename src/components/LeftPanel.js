import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Accounts from "../assets/Accounts.png";
import Logout from "../assets/Logout.png";
import Support from "../assets/Support.png";
import Orders from "../assets/Orders.png";
import Vehicles from "../assets/Vehicles.png";
import Payments from "../assets/Payments.png";
import Dashboard from "../assets/Dashboard.png";
import Chat from "../assets/chat.png";
import Logo from "../assets/Logo.png";
import { Colors } from "../shared/Colors";
import classes from "./LeftPanel.module.css";
import { BoldText, LightText } from "../shared/UI/Text";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
const LeftPanel = () => {
    const history = useHistory();
    const leftPanelItems = [
        {
            id: 0,
            img: Dashboard,
            title: "Dashboard",
            link: "/",
        },
        {
            id: 1,
            img: Accounts,
            title: "Accounts",
            link: "/all-users-accounts",
        },
        {
            id: 2,
            img: Vehicles,
            title: "Vehicles",
            link: "/all-vehicles",
        },
        {
            id: 4,
            img: Payments,
            title: "Payments",
            link: "/all-payments",
        },
        {
            id: 5,
            img: Orders,
            title: "Orders",
            link: "/all-orders",
        },
        {
            id: 6,
            img: Support,
            title: "Support",
            link: "/support",
        },
        {
            id: 6,
            img: Chat,
            title: "Chat",
            link: "/chat",
        },
        // {
        //     id: 6,
        //     img: Support,
        //     title: "Credentials",
        //     link: "/change-password",
        // },
        {
            id: 7,
            img: Logout,
            title: "Logout",
            link: "/login",
        },
    ];
    const handleClickLogout = () => {
        Swal.fire({
            title: "Do you want to logout?",
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: `Logout`,
            confirmButtonColor: Colors.darkBackground,
            denyButtonText: `Cancel`,
            denyButtonColor: "#f1af43",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                // localStorage.clear();
                localStorage.removeItem("userData");
                // Swal.fire("Logged out !", "", "success");
                // Swal.fire({
                //   title: "Logged out !",
                //   showDenyButton: false,
                //   // showCancelButton: true,
                //   confirmButtonText: `Ok`,
                //   confirmButtonColor: "#722526",
                //   // denyButtonText: `Cancel`,
                //   // denyButtonColor: "#f1af43",
                // });
                history.go("/");
                history.push("/");
            } else return;
        });
    };
    // const handleClickLogout = () => {

    // }
    return (
        <div
            style={{
                backgroundColor: Colors.darkBackground,
            }}
            className={[`col-1`, `d-flex`, `flex-column`, classes.leftPanelMainDiv].join(" ")}
        >
            <div className="d-flex justify-content-center align-items-center mt-4 mb-5">
                <img alt="Logo" src={Logo} style={{ maxWidth: "100%" }} />
            </div>
            <div style={{ flex: 1 }} className={[`d-flex`, `justify-content-between`, `flex-column`].join(" ")}>
                <div className={[`d-flex`, `flex-column`, `align-items-center`].join(" ")}>
                    {leftPanelItems.splice(0, leftPanelItems.length - 1).map((item, i) => {
                        return (
                            <Link key={i} to={item.link} style={{ textDecoration: "none" }} className={classes.leftPanelLink}>
                                <div
                                    className={[
                                        `mb-4`,
                                        `d-flex`,
                                        `flex-column`,
                                        // `justify-content-center`,
                                        `align-items-center`,
                                    ].join(" ")}
                                >
                                    <div
                                        style={{
                                            backgroundColor: Colors.greenTitle,
                                            // flex: 0.5,
                                            // width: "4.5vw",
                                            // height: "4.5vw",
                                            // padding: "10px",
                                        }}
                                        className={[
                                            // `mb-4`,
                                            `d-flex`,
                                            `flex-column`,
                                            `justify-content-center`,
                                            `align-items-center`,
                                            classes.leftPanelGreenTile,
                                        ].join(" ")}
                                    >
                                        <div className="d-flex justify-content-center align-items-center">
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                // style={{ maxWidth: "2.5vw", maxHeight: "2.5vw" }}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    maxWidth: "80%",
                                                    // maxWidth: item.title === "Vehicles" && "80%",
                                                    // maxHeight: item.title === "Vehicles" && "90%",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <BoldText className={[`m-0`, `text-center`, classes.leftPanelTilesText].join(" ")}>
                                            {item.title}
                                        </BoldText>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className={[`d-flex`, `flex-column`, `align-items-center`].join(" ")}>
                    {leftPanelItems.splice(leftPanelItems.length - 1, 1).map((item, i) => {
                        return (
                            <button
                                key={i}
                                style={{ border: "none", backgroundColor: "transparent" }}
                                onClick={handleClickLogout}
                                className={classes.logoutButton}
                            >
                                <div className="mb-4">
                                    <div
                                        style={{
                                            backgroundColor: Colors.greenTitle,
                                            // width: "4.5vw",
                                            // height: "4.5vw",
                                        }}
                                        className={[
                                            // `mb-4`,
                                            `d-flex`,
                                            `flex-column`,
                                            `justify-content-center`,
                                            `align-items-center`,
                                            classes.leftPanelGreenTile,
                                        ].join(" ")}
                                    >
                                        <div className="d-flex justify-content-around">
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    maxWidth: "80%",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <LightText className={[`m-0`, `text-center`, classes.leftPanelTilesText].join(" ")}>
                                            {item.title}
                                        </LightText>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LeftPanel;
