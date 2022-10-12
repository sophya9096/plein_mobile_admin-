import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    token: null,
    restaurantName: "",
    userCell: "",
    email: "",
    login: () => {},
    logout: () => {},
    firstLogin: () => {},
});

export default AuthContext;
