import React, { useEffect, useState } from "react";
// import Table from "../components/Home/Table";
import Table from "../components/Home/TableNew";
import LeftPanel from "../components/LeftPanel";
import TitleBar from "../components/TitleBar";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useAuth } from "../shared/hooks/auth-hooks";
import { Colors } from "../shared/Colors";
import { BoldText } from "../shared/UI/Text";
import Input from "../shared/UI/Input";

const SingleOrder = (props) => {
  console.log("props", props);
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [ordersList, setOrdersList] = useState([]);
  const [orderDetail, setOrderDetail] = useState();
  useEffect(() => {
    const dashboard = async () => {
      console.log("Dashboard");
      try {
        const responseData = await sendRequest(
          `http://11.0.0.100:5000/admin/single-order`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            orderId: props.match.params.id,
          })
        );
        console.log("responseData", responseData);
        setOrderDetail(responseData.order);

        // setFuelTypes(tempArr);
        // setOrdersList(responseData.orders);
      } catch (err) {
        console.log("err", err);
      }
    };
    dashboard();
  }, [sendRequest]);

  const handleOrderAction = async (data, type) => {
    try {
      let endPoint = "order-action";
      const responseData = await sendRequest(
        `http://11.0.0.100:5000/admin/${endPoint}`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          type: type,
          orderId: data,
        })
      );
      console.log("ResponseSingleUSer", responseData);
      setOrderDetail(responseData.order);
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
          <TitleBar title="Order Detail" />
          <div className="col">
            <div
              style={{
                width: "100%",
                // height: "100%",
                // height: "100vh",
              }}
            >
              <div className="d-flex flex-wrap">
                <div
                  // className="d-flex"
                  style={{
                    flex: 1,

                    minHeight: "50px",
                  }}
                >
                  <BoldText className="m-0">Order ID</BoldText>
                  <Input
                    style={{ minWidth: "100%" }}
                    placeholder={orderDetail && orderDetail.oid}
                    disabled
                  />
                </div>
                <div
                  className="mx-3"
                  style={{
                    flex: 1,

                    minHeight: "50px",
                  }}
                >
                  <BoldText className="m-0">First Name</BoldText>
                  <Input
                    style={{ minWidth: "100%" }}
                    placeholder={orderDetail && orderDetail.user.fname}
                    disabled
                  />
                </div>
                <div
                  style={{
                    flex: 1,

                    minHeight: "50px",
                  }}
                >
                  <BoldText className="m-0">Last Name</BoldText>
                  <Input
                    style={{ minWidth: "100%" }}
                    placeholder={orderDetail && orderDetail.user.lname}
                    disabled
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap my-4">
                <div
                  // className="d-flex"
                  style={{
                    flex: 1,

                    minHeight: "50px",
                  }}
                >
                  <BoldText className="m-0">Qty</BoldText>
                  <Input
                    style={{ minWidth: "100%" }}
                    placeholder={orderDetail && orderDetail.qty}
                    disabled
                  />
                </div>
                <div
                  className="mx-3"
                  style={{
                    flex: 1,

                    minHeight: "50px",
                  }}
                >
                  <BoldText className="m-0">Price Per Liter</BoldText>
                  <Input
                    style={{ minWidth: "100%" }}
                    placeholder={orderDetail && orderDetail.pricePerLiter}
                    disabled
                  />
                </div>
                <div
                  style={{
                    flex: 1,

                    minHeight: "50px",
                  }}
                >
                  <BoldText className="m-0">Address</BoldText>
                  <Input
                    style={{ minWidth: "100%" }}
                    placeholder={orderDetail && orderDetail.address}
                    disabled
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap">
                <div
                  // className="d-flex"
                  style={{
                    flex: 1,

                    minHeight: "50px",
                  }}
                >
                  <BoldText className="m-0">Vehicle License</BoldText>
                  <Input
                    style={{ minWidth: "100%" }}
                    placeholder={orderDetail && orderDetail.vehicle.license}
                    disabled
                  />
                </div>
                <div
                  className="mx-3"
                  style={{
                    flex: 1,

                    minHeight: "50px",
                  }}
                >
                  <BoldText className="m-0">Vehicle Make</BoldText>
                  <Input
                    style={{ minWidth: "100%" }}
                    placeholder={orderDetail && orderDetail.vehicle.make}
                    disabled
                  />
                </div>
                <div
                  style={{
                    flex: 1,

                    minHeight: "50px",
                  }}
                >
                  <BoldText className="m-0">Vehicle Model</BoldText>
                  <Input
                    style={{ minWidth: "100%" }}
                    placeholder={
                      orderDetail && orderDetail.vehicle.vehicleModel
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap my-4">
                <div
                  className="d-flex flex-column"
                  style={{
                    // flex: 1,

                    minWidth: "10%",

                    // minHeight: "50px",
                  }}
                >
                  {/* <BoldText className="m-0">View Order Location</BoldText> */}
                  {/* <Input
                    style={{ minWidth: "100%" }}
                    placeholder={orderDetail && orderDetail.vehicle.license}
                    disabled
                  /> */}
                  <a
                    href={`https://maps.google.com/?q=${
                      orderDetail && orderDetail.location.coordinates[1]
                    },${orderDetail && orderDetail.location.coordinates[0]}`}
                    target="_blank"
                    className="py-2 text-center"
                    style={{
                      flex: 1,
                      backgroundColor: Colors.blue,
                      color: "#000",
                      border: "none",
                      borderRadius: "10px",
                      textDecoration: "none",
                    }}
                    // onClick={() => handleViewUserDetail(data)}
                  >
                    View
                  </a>
                </div>
                {orderDetail && orderDetail.active && !orderDetail.accepted && (
                  <div
                    className="mx-3"
                    style={{
                      // flex: 1,
                      // minHeight: "50px",
                      minWidth: "10%",
                    }}
                  >
                    {/* <BoldText className="m-0">Vehicle Model</BoldText> */}
                    {/* <Input
                    style={{ minWidth: "100%" }}
                    placeholder={
                      orderDetail && orderDetail.vehicle.vehicleModel
                    }
                    disabled
                  /> */}
                    <button
                      // href={`https://maps.google.com/?q=${
                      //   orderDetail && orderDetail.location.coordinates[1]
                      // },${orderDetail && orderDetail.location.coordinates[0]}`}
                      // target="_blank"
                      className="py-2 text-center"
                      style={{
                        flex: 1,
                        backgroundColor:
                          orderDetail && orderDetail.active
                            ? Colors.greenTitle
                            : "#888",
                        color: "#000",
                        border: "none",
                        borderRadius: "10px",
                        textDecoration: "none",
                        minWidth: "100%",
                      }}
                      onClick={() => handleOrderAction(orderDetail._id, "a")}
                      disabled={orderDetail && !orderDetail.active}
                    >
                      Approve
                    </button>
                  </div>
                )}
                {orderDetail && orderDetail.active && !orderDetail.accepted && (
                  <div
                    style={{
                      // flex: 1,
                      // minHeight: "50px",
                      minWidth: "10%",
                    }}
                  >
                    {/* <BoldText className="m-0">Vehicle Make</BoldText> */}
                    {/* <Input
                    style={{ minWidth: "100%" }}
                    placeholder={orderDetail && orderDetail.vehicle.make}
                    disabled
                  /> */}
                    <button
                      // href={`https://maps.google.com/?q=${
                      //   orderDetail && orderDetail.location.coordinates[1]
                      // },${orderDetail && orderDetail.location.coordinates[0]}`}
                      // target="_blank"
                      className="py-2 text-center"
                      style={{
                        flex: 1,
                        backgroundColor:
                          orderDetail && orderDetail.active ? "red" : "#888",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        textDecoration: "none",
                        minWidth: "100%",
                      }}
                      onClick={() => handleOrderAction(orderDetail._id, "c")}
                      disabled={orderDetail && !orderDetail.active}
                    >
                      Cancel
                    </button>
                  </div>
                )}
                {orderDetail && orderDetail.active && orderDetail.accepted && (
                  <div
                    className="mx-3"
                    style={{
                      // flex: 1,
                      // minHeight: "50px",
                      minWidth: "10%",
                    }}
                  >
                    {/* <BoldText className="m-0">Vehicle Make</BoldText> */}
                    {/* <Input
                    style={{ minWidth: "100%" }}
                    placeholder={orderDetail && orderDetail.vehicle.make}
                    disabled
                  /> */}
                    <button
                      // href={`https://maps.google.com/?q=${
                      //   orderDetail && orderDetail.location.coordinates[1]
                      // },${orderDetail && orderDetail.location.coordinates[0]}`}
                      // target="_blank"
                      className="py-2 text-center"
                      style={{
                        flex: 1,
                        backgroundColor:
                          orderDetail && orderDetail.active
                            ? Colors.greenTitle
                            : "#888",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        textDecoration: "none",
                        minWidth: "100%",
                      }}
                      onClick={() => handleOrderAction(orderDetail._id, "d")}
                      disabled={orderDetail && !orderDetail.active}
                    >
                      {orderDetail &&
                        orderDetail.active &&
                        orderDetail.accepted &&
                        "Deliver"}
                    </button>
                  </div>
                )}
                {orderDetail &&
                  !orderDetail.active &&
                  orderDetail.accepted &&
                  !orderDetail.cancelled && (
                    <div
                      className="mx-3"
                      style={{
                        // flex: 1,
                        // minHeight: "50px",
                        minWidth: "10%",
                      }}
                    >
                      {/* <BoldText className="m-0">Vehicle Make</BoldText> */}
                      {/* <Input
                    style={{ minWidth: "100%" }}
                    placeholder={orderDetail && orderDetail.vehicle.make}
                    disabled
                  /> */}
                      <button
                        // href={`https://maps.google.com/?q=${
                        //   orderDetail && orderDetail.location.coordinates[1]
                        // },${orderDetail && orderDetail.location.coordinates[0]}`}
                        // target="_blank"
                        className="py-2 text-center"
                        style={{
                          flex: 1,
                          backgroundColor:
                            orderDetail && orderDetail.active
                              ? Colors.greenTitle
                              : "#888",
                          color: "#fff",
                          border: "none",
                          borderRadius: "10px",
                          textDecoration: "none",
                          minWidth: "100%",
                        }}
                        onClick={() => handleOrderAction(orderDetail._id, "d")}
                        disabled={orderDetail && !orderDetail.active}
                      >
                        {"Delivered"}
                      </button>
                    </div>
                  )}
                {orderDetail &&
                  !orderDetail.active &&
                  orderDetail.accepted &&
                  orderDetail.cancelled && (
                    <div
                      className="mx-3"
                      style={{
                        // flex: 1,
                        // minHeight: "50px",
                        minWidth: "10%",
                      }}
                    >
                      {/* <BoldText className="m-0">Vehicle Make</BoldText> */}
                      {/* <Input
                    style={{ minWidth: "100%" }}
                    placeholder={orderDetail && orderDetail.vehicle.make}
                    disabled
                  /> */}
                      <button
                        // href={`https://maps.google.com/?q=${
                        //   orderDetail && orderDetail.location.coordinates[1]
                        // },${orderDetail && orderDetail.location.coordinates[0]}`}
                        // target="_blank"
                        className="py-2 text-center"
                        style={{
                          flex: 1,
                          backgroundColor:
                            orderDetail && orderDetail.active
                              ? Colors.greenTitle
                              : "#888",
                          color: "#fff",
                          border: "none",
                          borderRadius: "10px",
                          textDecoration: "none",
                          minWidth: "100%",
                        }}
                        onClick={() => handleOrderAction(orderDetail._id, "d")}
                        disabled={orderDetail && !orderDetail.active}
                      >
                        {"Cancelled"}
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
