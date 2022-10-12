import { useState, useCallback, useEffect } from "react";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userCell, setUserCell] = useState("");
    const [email, setEmail] = useState("");
    const [restaurantName, setRestaurantName] = useState(null);

    const login = useCallback((uId, token) => {
        // setEmail(email);
        setToken(token);
        setUserId(uId);
        // setRestaurantName(restaurantName);
        // setUserCell(userCell ? userCell : undefined);
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId: uId,
                token: token,
            }),
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        // setTokenExpirationDate(null);
        setUserId(null);
        localStorage.removeItem("userData");
        localStorage.removeItem("chatInfo");
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        if (storedData && storedData.token) {
            login(storedData.userId, storedData.token);
        }
    }, [login]);

    return {
        email,
        token,
        login,
        logout,
        userId,
        restaurantName,
        userCell,
        // firstLogin,
    };
};
