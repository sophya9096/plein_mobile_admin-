import React, { useState, useContext } from "react";
import classes from "./Login.module.css";
// import Logo from "../assets/Logo.png";
import Logo from "../assets/Logo1.png";
import { Colors } from "../shared/Colors";
import Input from "../shared/UI/Input";
import { BoldText } from "../shared/UI/Text";
import Button from "../shared/UI/Button";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from "../shared/context/index";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../shared/UI/LoadingSpinner";

const Login = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    // const [message, setMessage] = useState("");
    const initialState = {
        email: "",
        password: "",
    };
    const initialValidate = (values) => {
        const errors = {};
        const validateEmail = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };
        const isnum = (val) => /^\d+$/.test(val);

        if (!values.email) errors.email = "REQUIRED";
        else if (!validateEmail(values.email)) errors.email = "INVALID EMAIL";
        if (!values.password) errors.password = "REQUIRED";
        else if (String(values.password).length < 6) errors.password = "Min 6 digits";
        else if (String(values.password).length > 15) errors.password = "Max 16 digits";

        return errors;
    };
    const _handleSubmit = async (values, { resetForm }) => {
        try {
            const responseData = await sendRequest(
                // `${process.env.REACT_APP_BACKEND_URL}/login`,
                `https://plein-mobile.herokuapp.com/admin/login`,
                // `http://localhost:5000/admin/login`,
                "POST",
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + "token",
                },
                JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            );
            console.log("Response", responseData);
            auth.login(responseData.userId, responseData.token);
            history.push("/");
            history.go("/");
        } catch (err) {
            console.log(process.env.REACT_APP_BACKEND_URL + "/login");
            console.log(process.env.REACT_APP_BACKEND_BASE_URL);
            console.log(process.env);
            console.log(err);
            // setErrorAlert(true);
        }
    };
    return (
        <div
            className={[classes.loginMainDiv, `d-flex`, `justify-content-center`, `align-items-center`].join(" ")}
            style={{
                // backgroundImage: `radial-gradient( ${Colors.greenTitle},${Colors.blue},${Colors.darkBackground})`,
                backgroundImage: `linear-gradient( ${Colors.darkBackground},${Colors.darkBackground})`,
            }}
        >
            <div className={[classes.loginFormMainDiv, `container`, `col`, `col-md-4`, `py-4`].join(" ")}>
                <div className="d-flex justify-content-center">
                    <img src={Logo} alt="Login" />
                </div>
                <div className="d-flex justify-content-center py-4">
                    <BoldText className="m-0" style={{ fontSize: "25px", fontWeight: "600" }}>
                        Login To Panel
                    </BoldText>
                </div>
                <div>
                    <Formik initialValues={initialState} validate={initialValidate} onSubmit={_handleSubmit} enableReinitialize={true}>
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValidating }) => (
                            <>
                                {/* {message && (
                  <div
                    className="contact-message alert alert-primary animated fadeIn"
                    role="alert"
                  >
                    {message}
                  </div>
                )} */}

                                <form className="subscriptionForm" onSubmit={handleSubmit}>
                                    <div>
                                        <Input
                                            placeholder="Enter Email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="name"
                                            style={{
                                                flex: 1,
                                                border: errors.email && "solid 1px red",
                                            }}
                                            id="email"
                                        />
                                        {errors.email && touched.email && (
                                            <BoldText className="text-danger f-12 m-0">{errors.email}</BoldText>
                                        )}
                                        <Input
                                            placeholder="Enter Password"
                                            style={{
                                                flex: 1,
                                                border: errors.password && "solid 1px red",
                                            }}
                                            type="password"
                                            className="mt-4"
                                            id="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="password"
                                        />
                                        {errors.password && touched.password && (
                                            <BoldText className="text-danger f-12 m-0">{errors.password}</BoldText>
                                        )}
                                    </div>
                                    {isLoading && (
                                        <div className="mt-4 d-flex justify-content-center">
                                            <LoadingSpinner />
                                        </div>
                                    )}
                                    {!isLoading && (
                                        <Button
                                            className={[classes.loginButton, `mt-4`].join(" ")}
                                            style={{ backgroundColor: Colors.darkBackground }}
                                            type="submit"
                                        >
                                            Login
                                        </Button>
                                    )}
                                </form>
                            </>
                        )}
                    </Formik>
                    <div className="pt-4">
                        <Link to="/forgot-password">
                            <BoldText className="text-center m-0" style={{ color: Colors.darkBackground, fontWeight: "600" }}>
                                Forgot Password
                            </BoldText>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
