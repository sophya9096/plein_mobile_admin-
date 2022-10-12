import React, { useEffect, useState } from "react";
// import { Switch, Redirect } from "react-router-dom";
import { Redirect, Switch } from "react-router-dom";
import AllOrders from "../containers/AllOrders";
import AllPayments from "../containers/AllPayments";
import AllRequests from "../containers/AllRequests";
import AllUsersAccounts from "../containers/AllUsersAccounts";
import AllVehicles from "../containers/AllVehicles";
import ChangePassword from "../containers/ChangePassword";
import ForgotPassword from "../containers/ForgotPassword";
import FuelType from "../containers/FuelType";
import Home from "../containers/Home";
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import SingleOrder from "../containers/SingleOrder";
import SingleUsersAccount from "../containers/SingleUsersAccount";
import SingleVehicle from "../containers/SingleVehicle";
import PageNotFound from "../containers/PageNotFound";
import Route from "./route";
import { useAuth } from "../shared/hooks/auth-hooks";
import Support from "../containers/Support";
import Chat from "../containers/Chat";
import Pusher from "pusher-js";
import { formatRelative, subDays } from "date-fns";
import ChatHook from "../shared/hooks/chat-hook";

const Router = (props) => {
    const { userId, token } = useAuth();
    let content;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({});
    const [message, setMessage] = useState("");
    const [user, setUser] = ChatHook();
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const pusher = new Pusher(`df62896bae0aebeae741`, {
            cluster: "ap2",
        });

        // local storage stuff

        let clients = JSON.parse(localStorage.getItem("clients")) || [];
        console.log(clients, "clients");
        setClients(clients);

        const date = formatRelative(subDays(new Date(), ""), new Date());
        const channel = pusher.subscribe("messages");
        channel.bind("inserted", (newMessage) => {
            clients = clients.filter((client) => client.userId !== newMessage.userId || !newMessage.consumer);
            if (newMessage.userId) {
                newMessage.consumer && clients.unshift({ ...newMessage, date });
            }
            localStorage.setItem("clients", JSON.stringify(clients));

            let currentTalk = JSON.parse(localStorage.getItem(newMessage.userId)) || [];
            currentTalk = [...currentTalk, { ...newMessage, date }];
            localStorage.setItem(newMessage.userId, JSON.stringify(currentTalk));

            if (newMessage.userId === user.userId) {
                console.log(user);
                setMessages([...messages, { ...newMessage, date }]);
            }
            if (newMessage.userId !== user.userId) {
                setMessages(messages);
            }
            if (!user.userId) {
                setMessages([...messages, { ...newMessage, date }]);
            }
            setNewMessage({ message: newMessage });
        });
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [messages, newMessage]);

    if (!token)
        content = (
            <Switch>
                <Route exact path="/" component={Login} />
                {/* <PvtRoute exact path="/reset/:token/:date" component={ChangePassword} /> */}
                <Redirect from={`/*`} to={`/`} />
                {/* <Route component={PageNotFound} /> */}
            </Switch>
        );
    else
        content = (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={() => <Redirect to="/" />} />
                <Route exact path="/404" component={PageNotFound} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/change-password" component={ChangePassword} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/all-orders" component={AllOrders} />
                <Route exact path="/all-orders/:id" component={SingleOrder} />
                <Route exact path="/fuel-type" component={FuelType} />
                <Route exact path="/all-requests" component={AllRequests} />
                <Route exact path="/all-users-accounts" component={AllUsersAccounts} />
                <Route exact path="/support" component={Support} />
                <Route exact path="/chat">
                    <Chat
                        setMessages={setMessages}
                        messages={messages}
                        message={message}
                        setMessage={setMessage}
                        user={user}
                        setUser={setUser}
                        clients={clients}
                        setClients={setClients}
                    />
                </Route>
                <Route exact path="/all-users-accounts/:id" component={SingleUsersAccount} />
                <Route exact path="/all-vehicles" component={AllVehicles} />
                <Route exact path="/all-vehicles/:id" component={SingleVehicle} />
                <Route exact path="/all-payments" component={AllPayments} />
                <Route component={PageNotFound} />
                {/* <Route exact path="/login" component={LoginContainer} />
      <Route exact path="/404" component={PageNotFound} />
      <Route exact path="/*" component={() => <Redirect to="/404" />} /> */}
            </Switch>
        );
    return content;
    // return (
    //   <Switch>
    //     <Route exact path="/" component={Home} />
    //     <Route exact path="/login" component={Login} />
    //     <Route exact path="/404" component={PageNotFound} />
    //     <Route exact path="/signup" component={Signup} />
    //     <Route exact path="/change-password" component={ChangePassword} />
    //     <Route exact path="/forgot-password" component={ForgotPassword} />
    //     <Route exact path="/all-orders" component={AllOrders} />
    //     <Route exact path="/all-orders/:id" component={SingleOrder} />
    //     <Route exact path="/fuel-type" component={FuelType} />
    //     <Route exact path="/all-requests" component={AllRequests} />
    //     <Route exact path="/all-users-accounts" component={AllUsersAccounts} />
    //     <Route
    //       exact
    //       path="/all-users-accounts/:id"
    //       component={SingleUsersAccount}
    //     />
    //     <Route exact path="/all-vehicles" component={AllVehicles} />
    //     <Route exact path="/all-vehicles/:id" component={SingleVehicle} />
    //     <Route exact path="/all-payments" component={AllPayments} />
    //     {/* <Route exact path="/login" component={LoginContainer} />
    //     <Route exact path="/404" component={PageNotFound} />
    //     <Route exact path="/*" component={() => <Redirect to="/404" />} /> */}
    //   </Switch>
    // );
};

export default Router;
