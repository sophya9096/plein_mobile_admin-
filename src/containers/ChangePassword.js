import React, { useState } from "react";
import classes from "./Login.module.css";
// import Logo from "../assets/Logo.png";
import Logo from "../assets/Logo1.png";
import { Colors } from "../shared/Colors";
import Input from "../shared/UI/Input";
import { BoldText } from "../shared/UI/Text";
import Button from "../shared/UI/Button";
import { Formik } from "formik";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  // const [message, setMessage] = useState("");
  const initialState = {
    oldpassword: "",
    newpassword: "",
  };
  const initialValidate = (values) => {
    const errors = {};
    const validateEmail = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };
    const isnum = (val) => /^\d+$/.test(val);

    if (!values.oldpassword) errors.oldpassword = "REQUIRED";
    else if (String(values.oldpassword).length < 6)
      errors.oldpassword = "Min 6 digits";
    else if (String(values.oldpassword).length > 15)
      errors.oldpassword = "Max 16 digits";
    if (!values.newpassword) errors.newpassword = "REQUIRED";
    else if (String(values.newpassword).length < 6)
      errors.newpassword = "Min 6 digits";
    else if (String(values.newpassword).length > 15)
      errors.newpassword = "Max 16 digits";

    return errors;
  };
  const _handleSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        oldpassword: values.oldpassword,
        newpassword: values.newpassword,
      };
      const data = new FormData();
      values &&
        Object.keys(payload).map((key) => {
          data.append(key, payload[key]);
        });
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
  };
  return (
    <div
      className={[
        classes.loginMainDiv,
        `d-flex`,
        `justify-content-center`,
        `align-items-center`,
      ].join(" ")}
      style={{
        // backgroundImage: `radial-gradient( ${Colors.greenTitle},${Colors.blue},${Colors.darkBackground})`,
        backgroundImage: `linear-gradient( ${Colors.darkBackground},${Colors.darkBackground})`,
      }}
    >
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
          <img src={Logo} alt="Login" />
        </div>
        <div className="d-flex justify-content-center py-4">
          <BoldText
            className="m-0"
            style={{ fontSize: "25px", fontWeight: "600" }}
          >
            Create New Admin
          </BoldText>
        </div>
        <div>
          <Formik
            initialValues={initialState}
            validate={initialValidate}
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
                      placeholder="Enter Old Password"
                      style={{
                        flex: 1,
                        border: errors.oldpassword && "solid 1px red",
                      }}
                      type="password"
                      id="oldpassword"
                      value={values.oldpassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="oldpassword"
                    />
                    {errors.oldpassword && touched.oldpassword && (
                      <BoldText className="text-danger f-12 pt-2 m-0">
                        {errors.oldpassword}
                      </BoldText>
                    )}
                    <Input
                      placeholder="Enter New Password"
                      style={{
                        flex: 1,
                        border: errors.newpassword && "solid 1px red",
                      }}
                      type="password"
                      className="mt-4"
                      id="newpassword"
                      value={values.newpassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="newpassword"
                    />
                    {errors.newpassword && touched.newpassword && (
                      <BoldText className="text-danger f-12 pt-2 m-0">
                        {errors.newpassword}
                      </BoldText>
                    )}
                  </div>
                  <Button
                    className={[classes.loginButton, `mt-4`].join(" ")}
                    style={{ backgroundColor: Colors.darkBackground }}
                    type="submit"
                  >
                    Create
                  </Button>
                </form>
              </>
            )}
          </Formik>
          <div className="pt-4">
            <Link to="/forgot-password">
              <BoldText
                className="text-center m-0"
                style={{ color: Colors.darkBackground, fontWeight: "600" }}
              >
                Forgot Password
              </BoldText>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
