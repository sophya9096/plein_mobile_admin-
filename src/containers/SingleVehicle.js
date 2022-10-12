import React, { useEffect, useState } from "react";
import { Colors } from "../shared/Colors";
// import Table from "../components/Home/Table";
import Table from "../components/Home/TableNew";
import LeftPanel from "../components/LeftPanel";
import TitleBar from "../components/TitleBar";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useAuth } from "../shared/hooks/auth-hooks";
import { Link } from "react-router-dom";
import { BoldText } from "../shared/UI/Text";
import Input from "../shared/UI/Input";

const SingleVehicle = (props) => {
  console.log("props", props);
  const { userId, token } = useAuth();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [vehicles, setVehicles] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState();
  useEffect(() => {
    const dashboard = async () => {
      console.log("Dashboard");
      try {
        const responseData = await sendRequest(
          `http://11.0.0.100:5000/admin/all-vehicles`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
          })
        );
        // console.log("responseData", responseData);

        // setFuelTypes(tempArr);
        setVehicles(responseData.vehiceles);
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
          `http://11.0.0.100:5000/admin/single-vehicle`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify({
            userId,
            vehicleId: props.match.params.id,
          })
        );
        console.log("responseDataSingleVehicle", responseData);

        // setFuelTypes(tempArr);
        setVehicleDetails(responseData.vehicle);
      } catch (err) {
        console.log("err", err);
      }
    };
    dashboard();
  }, [sendRequest]);

  const tableHeader = [
    {
      id: 1,
      title: "S.No",
      flex: 1,
    },
    {
      id: 2,
      title: "Model",
      flex: 1,
    },
    {
      id: 3,
      title: "Make",
      flex: 1,
    },
    {
      id: 4,
      title: "License",
      flex: 1,
    },
    {
      id: 5,
      title: "Action",
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
  return (
    <div className="d-flex">
      <LeftPanel />
      <div className="col-10" style={{ backgroundColor: "#eaeaea" }}>
        <div className="py-5">
          <TitleBar title="Vehicle Details" />
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
                  <BoldText className="m-0">Vehicle Model</BoldText>
                  <Input
                    style={{ minWidth: "100%" }}
                    placeholder={vehicleDetails && vehicleDetails.vehicleModel}
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
                    placeholder={vehicleDetails && vehicleDetails.make}
                    disabled
                  />
                </div>
                <div
                  style={{
                    flex: 1,

                    minHeight: "50px",
                  }}
                >
                  <BoldText className="m-0">License Plate</BoldText>
                  <Input
                    style={{ minWidth: "100%" }}
                    placeholder={vehicleDetails && vehicleDetails.license}
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
                  <BoldText className="m-0">Color</BoldText>
                  <Input
                    style={{ minWidth: "100%" }}
                    placeholder={vehicleDetails && vehicleDetails.color}
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
                  <BoldText className="m-0">Fuel Type</BoldText>
                  <Input
                    style={{ minWidth: "100%" }}
                    placeholder={vehicleDetails && vehicleDetails.fuelType}
                    disabled
                  />
                </div>
                <div
                  style={{
                    flex: 1,

                    minHeight: "50px",
                  }}
                >
                  <BoldText className="m-0">Model Year</BoldText>
                  <Input
                    style={{ minWidth: "100%" }}
                    placeholder={vehicleDetails && vehicleDetails.year}
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
                    placeholder={vehicleDetails && vehicleDetails.license}
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
                    placeholder={vehicleDetails && vehicleDetails.make}
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
                    placeholder={vehicleDetails && vehicleDetails.vehicleModel}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleVehicle;
