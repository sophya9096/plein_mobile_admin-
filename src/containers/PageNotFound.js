import React, { useEffect, useState } from "react";
// import Table from "../components/Home/Table";
import Table from "../components/Home/TableNew";
import LeftPanel from "../components/LeftPanel";
import TitleBar from "../components/TitleBar";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useAuth } from "../shared/hooks/auth-hooks";
import { Colors } from "../shared/Colors";
import { Link } from "react-router-dom";
import { BoldText } from "../shared/UI/Text";

const PageNotFound = (props) => {
  console.log("props", props);
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [ordersList, setOrdersList] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  useEffect(() => {
    const dashboard = async () => {
      console.log("Dashboard");
      try {
        const responseData = await sendRequest(
          `http://11.0.0.100:5000/admin/all-orders`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            active: true,
          })
        );
        // console.log("responseData", responseData);

        // setFuelTypes(tempArr);
        setOrdersList(responseData.orders);
      } catch (err) {
        console.log("err", err);
      }
    };
    dashboard();
  }, [sendRequest]);
  useEffect(() => {
    const dashboard = async () => {
      console.log("Dashboard");
      try {
        const responseData = await sendRequest(
          `http://11.0.0.100:5000/admin/all-orders`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            active: false,
          })
        );
        console.log("responseDataNotActive", responseData);

        // setFuelTypes(tempArr);
        setCompletedOrders(responseData.orders);
      } catch (err) {
        console.log("err", err);
      }
    };
    dashboard();
  }, [sendRequest]);
  const handleViewOrderDetail = async (data) => {
    try {
      let endPoint = "single-order";
      const responseData = await sendRequest(
        `http://11.0.0.100:5000/admin/${endPoint}`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          orderId: data._id,
        })
      );
      console.log("ResponseSingleUSer", responseData);
      // auth.login(responseData.userId, responseData.token);
      // history.push("/");
      // history.go("/");
    } catch (err) {
      console.log("error", error);
      // setErrorAlert(true);
    }
  };
  const tableHeader = [
    {
      id: 1,
      title: "S.No",
      flex: 1,
    },
    {
      id: 2,
      title: "User Name",
      flex: 1,
    },
    // {
    //   id: 3,
    //   title: "Fuel Type",
    //   flex: 1,
    // },
    {
      id: 4,
      title: "Vehicle Model",
      flex: 1,
    },
    {
      id: 5,
      title: "License Plate",
      flex: 1,
    },
    {
      id: 6,
      title: "Qty.",
      flex: 1,
    },
    {
      id: 7,
      title: "Price/Ltr",
      flex: 1,
    },
    {
      id: 8,
      title: "Action",
      flex: 1,
    },
  ];
  const noOrders = (
    <div>
      <BoldText
        className="text-center m-0"
        style={{ color: "#000", fontWeight: 600 }}
      >
        No Orders
      </BoldText>
    </div>
  );
  const pendingOrders = (
    <div>
      {ordersList &&
        ordersList.map((data, i) => {
          return (
            <div
              key={i}
              className="d-flex py-1"
              style={{ borderBottom: "solid 1px #ccc" }}
            >
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{i + 1}</p>
              </div>
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{data.user.fname}</p>
              </div>
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{data.vehicle.vehicleModel}</p>
              </div>
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{data.vehicle.license}</p>
              </div>
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{data.qty}</p>
              </div>
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{data.pricePerLiter}</p>
              </div>
              <div
                style={{ color: "#000", flex: 1 }}
                className="d-flex justify-content-center"
              >
                {/* <button
                        className="mr-2 py-2"
                        style={{
                          flex: 1,
                          backgroundColor: Colors.blue,
                          color: "#000",
                          border: "none",
                          borderRadius: "25px",
                        }}
                        onClick={() => handleViewOrderDetail(data)}
                      >
                        View
                      </button> */}
                <Link
                  to={`/all-orders/${data._id}`}
                  className="mr-2 py-2 text-center"
                  style={{
                    flex: 1,
                    backgroundColor: Colors.blue,
                    color: "#000",
                    border: "none",
                    borderRadius: "25px",
                    textDecoration: "none",
                  }}
                  onClick={() => handleViewOrderDetail(data)}
                >
                  View
                </Link>
                {/* <button
                        className="py-2"
                        style={{
                          flex: 1,
                          backgroundColor: Colors.blue,
                          color: "#000",
                          border: "none",
                          borderRadius: "25px",
                        }}
                        // onClick={() => handleDelete(data)}
                      >
                        Delete
                      </button> */}
              </div>
            </div>
          );
        })}
    </div>
  );
  const completedOrderss = (
    <div>
      {completedOrders &&
        completedOrders.map((data, i) => {
          return (
            <div
              key={i}
              className="d-flex py-1"
              style={{ borderBottom: "solid 1px #ccc" }}
            >
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{i + 1}</p>
              </div>
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{data.user.fname}</p>
              </div>
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{data.vehicle.vehicleModel}</p>
              </div>
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{data.vehicle.license}</p>
              </div>
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{data.qty}</p>
              </div>
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{data.pricePerLiter}</p>
              </div>
              <div
                style={{ color: "#000", flex: 1 }}
                className="d-flex justify-content-center"
              >
                <Link
                  to={`/all-orders/${data._id}`}
                  className="mr-2 py-2 text-center"
                  style={{
                    flex: 1,
                    backgroundColor: Colors.blue,
                    color: "#000",
                    border: "none",
                    borderRadius: "25px",
                    textDecoration: "none",
                  }}
                  onClick={() => handleViewOrderDetail(data)}
                >
                  View
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
  return (
    <div className="d-flex">
      <LeftPanel />
      <div
        className="col-10 d-flex justify-content-center pt-5 align-items-center"
        style={{ backgroundColor: "#eaeaea" }}
      >
        <BoldText style={{ height: "fit-content", fontSize: "50px" }}>
          Error:404, No Page Found
        </BoldText>
      </div>
    </div>
  );
};

export default PageNotFound;
