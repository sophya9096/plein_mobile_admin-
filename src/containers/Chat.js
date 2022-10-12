import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LeftPanel from "../components/LeftPanel";
import classes from "./Chat.module.css";
import pin from "../assets/pin.png";
import axios from "axios";
import { Avatar } from "@material-ui/core";

function Chat({ message, setMessage, messages, setMessages, user, setUser, clients }) {
    // const [message, setMessage] = useState("");
    // const [messages, setMessages] = useState([]);
    // const [clients, setClients] = useState([]);
    const [resize, setResize] = useState(8);

    const history = useHistory();

    useEffect(() => {
        console.log(clients, "clients");
        console.log(messages, "messages");

        window.addEventListener("resize", () => {
            if (window.innerWidth < 1115) {
                setResize(20);
                console.log("Innder");
            } else {
                setResize(8);
            }
        });
        return () => {
            window.removeEventListener("resize", () => {});
        };
    }, []);

    console.log(messages);

    const setRef = useCallback((node) => {
        if (node) {
            node.scrollIntoView({ scroll: true });
        }
    }, []);

    const name1 = "Admin";
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        try {
            await axios.post(`${"https://plein-mobile.herokuapp.com"}/chat`, {
                name: name1,
                message,
                consumer: false,
                userId: user.userId || null,
            });
            setMessage("");
        } catch ({ response }) {
            console.log(response.data.message);
        }
    };

    const truncateMsg = (msg, n) => {
        return msg?.length > n ? msg.substr(0, n - 1) + "..." : msg;
    };

    const handleCurrent = (user) => {
        setUser(user);
        const chat = JSON.parse(localStorage.getItem(user.userId));
        setMessages(chat);
        console.log(chat);
        // setTimeout(() => {
        //     axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/chat/remove`);
        //     localStorage.clear();
        //     history.go("/");
        // }, [21600000]);
    };

    return (
        <div className="d-flex">
            <LeftPanel />
            <div className={`${classes.main} "d-flex  flex-column"`}>
                <h2 className={classes.title}>Chat</h2>
                <div className={classes.chatPanel}>
                    <div className={classes.chatList}>
                        <h2>Messages</h2>
                        <div className={classes.users}>
                            {clients.map(({ name, userId, message, date }) => (
                                <div onClick={() => handleCurrent({ name, userId, message, date })} key={userId} className={classes.user}>
                                    <Avatar
                                        style={{ background: "#444", fontSize: "x-large" }}
                                        className={classes.Avatar}
                                        alt={name}
                                        src={name}
                                    />
                                    <div className={classes.titleContent}>
                                        <div className={classes.titleHead}>
                                            <h3>{name}</h3>
                                            <p>{date.slice(resize)}</p>
                                            {/* <p>{`${hours}:${currentMinutes} ${ampm}`}</p> */}
                                        </div>
                                        <div className={classes.titleHead}>
                                            <span>{truncateMsg(message, 20)}</span>
                                            {/* <p className={classes.titleUnRead}> {messages.length}</p> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={classes.chatBox}>
                        <h3 style={{ marginBottom: "auto" }} className={classes.currentUser}>
                            {user.name || "Notifications"}
                        </h3>
                        <div className={classes.messages}>
                            {messages?.map(({ message, name, date }, index) => {
                                const lasteMessage = messages.length - 1 === index;
                                const consumer = name === name1;
                                return (
                                    <div
                                        ref={lasteMessage ? setRef : null}
                                        key={index}
                                        className={!consumer ? classes.messenger : classes.receiver}
                                    >
                                        <Avatar
                                            style={{ background: "#444", fontSize: "x-large" }}
                                            className={classes.Avatar}
                                            alt={name}
                                            src={name}
                                        />
                                        <p>{message}</p>
                                        {/* <span style={{ fontSize: "12px", transform: "translate(-40px,20px)", color: "gray" }}>{date}</span> */}
                                    </div>
                                );
                            })}
                        </div>
                        <form className={classes.chatInput}>
                            <textarea
                                disabled={!user.userId}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                type={"text"}
                                placeholder={"Type your text"}
                            />
                            <div className={classes.chatInputOptions}>
                                <button onClick={handleSubmit} className={classes.chatButton} type={"submit"}>
                                    Send
                                </button>
                                <div type={"button"} className={classes.chatInputOption}>
                                    <img src={pin} alt={""} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
