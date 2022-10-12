import React, { useState } from "react";
import classes from "./ForgotPassword.module.css";
import Logo from "../assets/Logo.png";
// import Logo1 from "../assets/Logo1.png";
import Password from "../assets/Password.png";
import { Colors } from "../shared/Colors";
import Input from "../shared/UI/Input";
import { BoldText } from "../shared/UI/Text";
import Button from "../shared/UI/Button";
import { Formik } from "formik";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [formStep, setFormStep] = useState(1);
  // const [message, setMessage] = useState("");
  const initialState = {
    email: "",
    password: "",
  };
  const initialValidateEmail = (values) => {
    const errors = {};
    const validateEmail = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };
    // const isnum = (val) => /^\d+$/.test(val);

    if (!values.email) errors.email = "REQUIRED";
    else if (!validateEmail(values.email)) errors.email = "INVALID EMAIL";
    return errors;
  };
  const initialValidatePass = (values) => {
    const errors = {};
    if (!values.password) errors.password = "REQUIRED";
    else if (String(values.password).length < 6)
      errors.password = "Min 6 digits";
    else if (String(values.password).length > 15)
      errors.password = "Max 16 digits";

    return errors;
  };
  const _handleSubmit = async (values, { resetForm }) => {
    if (formStep === 1) {
      setFormStep(2);
    } else {
      try {
        // const payload = {
        //   email: values.email,
        //   password: values.password,
        // };
        // const data = new FormData();
        // values &&
        //   Object.keys(payload).map((key) => {
        //     data.append(key, payload[key]);
        //   });
        alert("Submitted");

        //   const res = await fetch(
        //     "https://mediapeanuts.com/lp/web-development/contact/form_email_footer",
        //     {
        //       method: "POST",
        //       body: data,
        //       mode: "no-cors",
        //     }
        //   );
        // setMessage("Thank you we will response you soon!");
        resetForm({ email: "", password: "" });
        // setTimeout(() => {
        //   setMessage("");
        // }, 3000);
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  return (
    <div
      className={[
        classes.loginMainDiv,
        `d-flex`,
        `flex-column`,
        `justify-content-center`,
        `align-items-center`,
      ].join(" ")}
      style={{
        // backgroundImage: `linear-gradient( ${Colors.greenTitle},${Colors.blue},${Colors.darkBackground})`,
        backgroundImage: `linear-gradient( ${Colors.darkBackground},${Colors.darkBackground})`,
      }}
    >
      <div className="mb-4">
        <img src={Logo} alt="Login" />
      </div>
      <div
        className={[
          classes.loginFormMainDiv,
          `container`,
          `col`,
          `col-md-4`,
          `py-4`,
        ].join(" ")}
      >
        <div className="d-flex justify-content-center">
          {/* <img src={Password} alt="Login" /> */}
          <div>
            <div style={{ width: "100px", height: "100px" }}>
              <img src={Password} alt="Login" style={{ maxWidth: "100%" }} />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center py-4">
          <BoldText
            className="m-0"
            style={{ fontSize: "25px", fontWeight: "600" }}
          >
            Forgot Password
          </BoldText>
        </div>
        {formStep === 1 && (
          <div>
            <Formik
              initialValues={initialState}
              validate={initialValidateEmail}
              onSubmit={_handleSubmit}
              enableReinitialize={true}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValidating,
              }) => (
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
                        style={{
                          flex: 1,
                          border: errors.email && "solid 1px red",
                        }}
                        id="email"
                      />
                      {errors.email && touched.email && (
                        <BoldText className="text-danger f-12 m-0">
                          {errors.email}
                        </BoldText>
                      )}
                    </div>
                    <Button
                      className={[classes.loginButton, `mt-4`].join(" ")}
                      style={{ backgroundColor: Colors.darkBackground }}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </form>
                </>
              )}
            </Formik>
            {/* <div className="pt-4">
              <BoldText
                className="text-center m-0"
                style={{ color: Colors.darkBackground, fontWeight: "600" }}
              >
                Forgot Password
              </BoldText>
            </div> */}
          </div>
        )}
        {formStep === 2 && (
          <div>
            <Formik
              initialValues={initialState}
              validate={initialValidatePass}
              onSubmit={_handleSubmit}
              enableReinitialize={true}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValidating,
              }) => (
                <>
                  <form className="subscriptionForm" onSubmit={handleSubmit}>
                    <div>
                      <Input
                        placeholder="Enter Password"
                        style={{
                          flex: 1,
                          border: errors.password && "solid 1px red",
                        }}
                        type="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="password"
                      />
                      {errors.password && touched.password && (
                        <BoldText className="text-danger f-12 m-0">
                          {errors.password}
                        </BoldText>
                      )}
                    </div>
                    <Button
                      className={[classes.loginButton, `mt-4`].join(" ")}
                      style={{ backgroundColor: Colors.darkBackground }}
                      type="submit"
                    >
                      Login
                    </Button>
                  </form>
                </>
              )}
            </Formik>
          </div>
        )}
        <div className="pt-4">
          <Link to="/login">
            <BoldText
              className="text-center m-0"
              style={{ color: Colors.darkBackground, fontWeight: "600" }}
            >
              Login?
            </BoldText>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
