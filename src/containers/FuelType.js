import React, { useEffect, useState } from "react";
import Table from "../components/Home/TableNew";
import LeftPanel from "../components/LeftPanel";
import TitleBar from "../components/TitleBar";
import { useHttpClient } from "../shared/hooks/http-hook";
import { Formik, withFormik } from "formik";
import { Colors } from "../shared/Colors";
import Input from "../shared/UI/Input";
import { BoldText } from "../shared/UI/Text";
import Button from "../shared/UI/Button";
import classes from "./Login.module.css";
import { useAuth } from "../shared/hooks/auth-hooks";
import LoadingSpinner from "../shared/UI/LoadingSpinner";
const FuelType = () => {
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editingFuelType, setEditingFuelType] = useState("");
  const [fuelTypes, setFuelTypes] = useState([]);
  const handleEdit = () => {
    setInitialState((ps) => {
      return {
        ...ps,
        fueltype: "Gas",
        price: 150,
      };
    });
  };
  const tableHeader = [
    {
      id: 1,
      title: "S.No",
      flex: 1,
    },
    {
      id: 2,
      title: "Fuel Type",
      flex: 1,
    },
    {
      id: 3,
      title: "Price",
      flex: 1,
    },

    {
      id: 4,
      title: "Action",
      flex: 1,
    },
  ];
  const tableData = [
    {
      id: 1,
      value: "ORD123456",
      flex: 1,
    },
    {
      id: 2,
      value: "Petrol",
      flex: 1,
    },
    {
      id: 3,
      value: "$50",
      flex: 1,
    },

    {
      id: 4,
      value: "Edit",
      flex: 1,
      action: true,
      func: handleEdit,
    },
  ];
  const [initialState, setInitialState] = useState({
    fueltype: "",
    price: 0,
  });
  // let initialState = {
  //   fueltype: "",
  //   price: 0,
  // };
  const initialValidate = (values) => {
    const errors = {};
    const isnum = (val) => /^\d+$/.test(val);

    if (!values.fueltype) errors.fueltype = "REQUIRED";
    if (!values.price) errors.price = "REQUIRED";

    return errors;
  };
  const _handleSubmit = async (values, { resetForm }) => {
    try {
      let endPoint = "add-fueltype";
      if (isEditing) endPoint = "edit-fueltype";
      const responseData = await sendRequest(
        `http://11.0.0.100:5000/admin/${endPoint}`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          fuelTypeId: editingFuelType,
          fuelType: values.fueltype,
          price: values.price,
        })
      );
      console.log("Response", responseData);
      setInitialState({
        fueltype: "",
        price: "",
      });
      if (isEditing) setIsEditing(false);
      dashboard();
      // auth.login(responseData.userId, responseData.token);
      // history.push("/");
      // history.go("/");
    } catch (err) {
      console.log("error", error);
      // setErrorAlert(true);
    }
  };
  const dashboard = async () => {
    console.log("Dashboard");
    try {
      const responseData = await sendRequest(
        `http://11.0.0.100:5000/admin/all-fueltypes`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
        })
      );
      console.log("responseData", responseData);
      const tempArr = [];
      const tempData = responseData.fuelTypes.map((data) => {
        tempArr.push([
          { id: data._id, fuelType: data.fuelType, price: data.price },
        ]);
      });
      // setFuelTypes(tempArr);
      setFuelTypes(responseData.fuelTypes);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    dashboard();
  }, [sendRequest]);

  const handleViewEdit = (data) => {
    setEditingFuelType(data._id);
    setIsEditing(true);
    setInitialState((ps) => {
      return {
        ...ps,
        fueltype: data.fuelType,
        price: data.price,
      };
    });
  };
  const handleCancelEdit = () => {
    console.log("hi");
    setInitialState({
      fueltype: "",
      price: 0,
    });
    setEditingFuelType("");
    setIsEditing(false);
  };

  const handleDelete = async (data) => {
    try {
      let endPoint = "delete-fueltype";
      const responseData = await sendRequest(
        `http://11.0.0.100:5000/admin/${endPoint}`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          fuelTypeId: data._id,
        })
      );
      console.log("Response", responseData);
      dashboard();
      // auth.login(responseData.userId, responseData.token);
      // history.push("/");
      // history.go("/");
    } catch (err) {
      console.log("error", error);
      // setErrorAlert(true);
    }
  };

  return (
    <div className="d-flex">
      <LeftPanel />
      <div className="col-10" style={{ backgroundColor: "#eaeaea" }}>
        <div className="py-5">
          <TitleBar title="Fuel Type" rightPadd="35px" />
          <div className="d-flex pr-4">
            <div style={{ flex: 2 }}>
              <Table
                tableHeader={tableHeader}
                tableData={tableData}
                maxHeight="77vh"
                data={fuelTypes}
              >
                {fuelTypes.map((data, i) => {
                  return (
                    <div
                      key={i}
                      className="d-flex py-3 align-items-center"
                      style={{ borderBottom: "solid 1px #ccc" }}
                    >
                      <div style={{ color: "#000", flex: 1 }}>
                        <p className="m-0 text-center">{i}</p>
                      </div>
                      <div style={{ color: "#000", flex: 1 }}>
                        <p className="m-0 text-center">{data.fuelType}</p>
                      </div>
                      <div style={{ color: "#000", flex: 1 }}>
                        <p className="m-0 text-center">{data.price}</p>
                      </div>
                      <div
                        style={{ color: "#000", flex: 1 }}
                        className="d-flex justify-content-center"
                      >
                        <button
                          className="mr-2 py-2"
                          style={{
                            flex: 1,
                            backgroundColor: Colors.blue,
                            color: "#000",
                            border: "none",
                            borderRadius: "25px",
                          }}
                          onClick={() => handleViewEdit(data)}
                        >
                          Edit
                        </button>
                        <button
                          className="py-2"
                          style={{
                            flex: 1,
                            backgroundColor: Colors.blue,
                            color: "#000",
                            border: "none",
                            borderRadius: "25px",
                          }}
                          onClick={() => handleDelete(data)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Table>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ height: "100%" }}>
                <TitleBar title="Add Fuel Type" />
                <div className="col mt-4">
                  <Formik
                    initialValues={initialState}
                    validate={initialValidate}
                    onSubmit={_handleSubmit}
                    enableReinitialize={true}
                    reini
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
                      setFieldValue,
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

                        <form
                          className="subscriptionForm"
                          onSubmit={handleSubmit}
                        >
                          <div>
                            <Input
                              placeholder="Enter Fuel Type"
                              value={values.fueltype}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              id="fueltype"
                              style={{
                                flex: 1,
                                border: errors.fueltype && "solid 1px red",
                              }}
                              name="fueltype"
                            />
                            {errors.fueltype && touched.fueltype && (
                              <BoldText className="text-danger f-12 pt-2 m-0">
                                {errors.fueltype}
                              </BoldText>
                            )}
                            <Input
                              placeholder="Enter Price"
                              type="number"
                              step="0.001"
                              min="0"
                              className="mt-4"
                              value={values.price}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              style={{
                                flex: 1,
                                border: errors.price && "solid 1px red",
                              }}
                              id="price"
                              name="price"
                            />
                            {errors.price && touched.price && (
                              <BoldText className="text-danger f-12 pt-2 m-0">
                                {errors.price}
                              </BoldText>
                            )}
                          </div>
                          <div className="d-flex">
                            {/* {!isLoading ? (
                              <LoadingSpinner />
                            ) : ( */}
                            <Button
                              className={[classes.loginButton, `mt-4`].join(
                                " "
                              )}
                              style={{
                                backgroundColor: Colors.darkBackground,
                                flex: 1,
                              }}
                              divStyle={{ flex: 1 }}
                              divClass={isEditing && "mr-2"}
                              type="submit"
                            >
                              {isEditing ? "Edit" : "Create"}
                            </Button>
                            {/* )} */}
                            {isEditing && (
                              <Button
                                className={[classes.loginButton, `mt-4`].join(
                                  " "
                                )}
                                style={{
                                  backgroundColor: Colors.darkBackground,
                                  flex: 1,
                                }}
                                divStyle={{ flex: 1 }}
                                type="button"
                                onClick={handleCancelEdit}
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </form>
                      </>
                    )}
                  </Formik>
                  {/* <button type="button" onClick={handleEdit}>
                    Edit
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuelType;
