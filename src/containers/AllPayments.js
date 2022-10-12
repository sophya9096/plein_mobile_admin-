import React from "react";
import Table from "../components/Home/Table";
import LeftPanel from "../components/LeftPanel";
import TitleBar from "../components/TitleBar";

const AllPayments = () => {
  const tableHeader = [
    {
      id: 1,
      title: "User Name",
      flex: 1,
    },
    {
      id: 2,
      title: "Vehicle",
      flex: 1,
    },
    {
      id: 3,
      title: "Price",
      flex: 1,
    },
    {
      id: 4,
      title: "Quantity",
      flex: 1,
    },
    {
      id: 5,
      title: "Date",
      flex: 1,
    },
    {
      id: 6,
      title: "Payment Type",
      flex: 1,
    },
    {
      id: 7,
      title: "Status",
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
      value: "Paypal",
      flex: 1,
    },
    {
      id: 9,
      value: "Paid",
      flex: 1,
      action: true,
    },
  ];
  return (
    <div className="d-flex align-items-center">
      <LeftPanel />
      <div className="col-10" style={{ backgroundColor: "#eaeaea" }}>
        <div className="py-5">
          <TitleBar title="All Payments" />
          <Table
            tableHeader={tableHeader}
            tableData={tableData}
            maxHeight="77vh"
          />
        </div>
      </div>
    </div>
  );
};

export default AllPayments;
