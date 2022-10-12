// import logo from "./logo.svg";
import { BrowserRouter } from "react-router-dom";
import Router from "./routers";
import { AuthContext } from "./shared/context/index";
import { useAuth } from "./shared/hooks/auth-hooks";

import "./App.css";

function App() {
    const { login, logout, userId, token, restaurantName, email, userCell } = useAuth();
    return (
        <BrowserRouter>
            <div className="app">
                <AuthContext.Provider
                    value={{
                        isLoggedIn: !!token,
                        token: token,
                        userId: userId,
                        login,
                        logout,
                        restaurantName,
                        email,
                        userCell,
                    }}
                >
                    <Router />
                </AuthContext.Provider>
            </div>
        </BrowserRouter>
    );
}

export default App;
