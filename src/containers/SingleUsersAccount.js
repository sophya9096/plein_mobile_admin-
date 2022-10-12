import React, { useEffect, useState } from "react";
import { Colors } from "../shared/Colors";
// import Table from "../components/Home/Table";
import Table from "../components/Home/TableNew";
import LeftPanel from "../components/LeftPanel";
import TitleBar from "../components/TitleBar";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useAuth } from "../shared/hooks/auth-hooks";
import { BoldText } from "../shared/UI/Text";
import Button from "../shared/UI/Button";
import classes from "../components/Home/RightCol.module.css";

const SingleUsersAccount = (props) => {
  console.log("props", props);
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userOrders, setUserOrders] = useState([]);
  const [userVehicles, setUserVehicles] = useState([]);
  useEffect(() => {
    const dashboard = async () => {
      console.log("Dashboard");
      try {
        const responseData = await sendRequest(
          `http://11.0.0.100:5000/admin/order-by-userid`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            user: props.match.params.id,
          })
        );
        console.log("responseDataSingleUserOrder", responseData);

        // setFuelTypes(tempArr);
        setUserOrders(responseData.orders);
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
          `http://11.0.0.100:5000/admin/vehicle-by-userid`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            user: props.match.params.id,
          })
        );
        // console.log("responseDataSingleUserVehicles", responseData);

        // setFuelTypes(tempArr);
        setUserVehicles(responseData.vehicles);
      } catch (err) {
        console.log("err", err);
      }
    };
    dashboard();
  }, [sendRequest]);

  const tableHeader = [
    {
      id: 1,
      title: "Order Id",
      flex: 1,
    },
    {
      id: 2,
      title: "Price / Liter",
      flex: 1,
    },
    {
      id: 3,
      title: "Qty",
      flex: 1,
    },
    {
      id: 5,
      title: "Location",
      flex: 1,
    },
  ];
  const tableHeaderVehicle = [
    {
      id: 1,
      title: "Fuel Type",
      flex: 1,
    },
    {
      id: 2,
      title: "Vehicle Model",
      flex: 1,
    },
    {
      id: 3,
      title: "Make",
      flex: 1,
    },
    {
      id: 5,
      title: "License",
      flex: 1,
    },
  ];
  const tableData = [
    {
      id: 1,
      value: "Alyssa Hansen",
      flex: 1,
    },
    {
      id: 2,
      value: "Acura",
      flex: 1,
    },
    {
      id: 3,
      value: "$150",
      flex: 1,
    },
    {
      id: 4,
      value: "15 Litres",
      flex: 1,
    },
    {
      id: 5,
      value: "10 Dec 2020",
      flex: 1,
    },
    {
      id: 8,
      value: "DeActivate",
      flex: 1,
      action: true,
    },
  ];
  const handleViewUserDetail = async (data) => {
    try {
      let endPoint = "single-user";
      const responseData = await sendRequest(
        `http://11.0.0.100:5000/admin/${endPoint}`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({
          userId,
          user: data._id,
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
  const userOrdersData = (
    <div>
      {userOrders &&
        userOrders.map((data, i) => {
          return (
            <div
              key={i}
              className="d-flex py-2 align-items-center"
              style={{ borderBottom: "solid 1px #ccc" }}
            >
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{data.oid}</p>
              </div>
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{data.pricePerLiter}</p>
              </div>
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{data.qty}</p>
              </div>
              <div
                style={{ color: "#000", flex: 1 }}
                className="d-flex justify-content-center"
              >
                <a
                  href={`https://maps.google.com/?q=${data.location.coordinates[1]},${data.location.coordinates[0]}`}
                  target="_blank"
                  className="mr-2 py-2 text-center"
                  style={{
                    flex: 1,
                    backgroundColor: Colors.blue,
                    color: "#000",
                    border: "none",
                    borderRadius: "25px",
                    textDecoration: "none",
                  }}
                  onClick={() => handleViewUserDetail(data)}
                >
                  View
                </a>
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
  const userVehiclesData = (
    <div>
      {userVehicles &&
        userVehicles.map((data, i) => {
          return (
            <div
              key={i}
              className="d-flex py-3"
              style={{ borderBottom: "solid 1px #ccc" }}
            >
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{data.fuelType}</p>
              </div>
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{data.vehicleModel}</p>
              </div>
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{data.make}</p>
              </div>
              <div style={{ color: "#000", flex: 1 }}>
                <p className="m-0 text-center">{data.license}</p>
              </div>
            </div>
          );
        })}
    </div>
  );

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
  const noVehicles = (
    <div>
      <BoldText
        className="text-center m-0"
        style={{ color: "#000", fontWeight: 600 }}
      >
        No Vehicles
      </BoldText>
    </div>
  );
  return (
    <div className="d-flex">
      <LeftPanel />
      <div className="col-10" style={{ backgroundColor: "#eaeaea" }}>
        <div className="py-1">
          <TitleBar title="User Orders" />
          <Table
            tableHeader={tableHeader}
            tableData={tableData}
            maxHeight="36.5vh"
          >
            {userOrders && userOrders.length ? userOrdersData : noOrders}
            {userOrders && userOrders.length === 10 && (
              <div className={[`mt-3`, "pb-2"].join(" ")}>
                <Button
                  className={classes.loadMoreButton}
                  style={{ backgroundColor: Colors.darkBackground }}
                >
                  Load More
                </Button>
              </div>
            )}
          </Table>
        </div>
        <div>
          <TitleBar title="User Vehicles" />
          <Table
            tableHeader={tableHeaderVehicle}
            tableData={tableData}
            maxHeight="36.5vh"
          >
            {userVehicles && userVehicles.length
              ? userVehiclesData
              : noVehicles}
            {userVehicles && userVehicles.length === 10 && (
              <div className={[`mt-3`, "pb-2"].join(" ")}>
                <Button
                  className={classes.loadMoreButton}
                  style={{ backgroundColor: Colors.darkBackground }}
                >
                  Load More
                </Button>
              </div>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SingleUsersAccount;
