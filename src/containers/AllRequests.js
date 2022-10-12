import React from "react";
import Table from "../components/Home/Table";
import LeftPanel from "../components/LeftPanel";
import TitleBar from "../components/TitleBar";

const AllRequests = () => {
  const tableHeader = [
    {
      id: 1,
      title: "Ref No.",
      flex: 1,
    },
    {
      id: 2,
      title: "User",
      flex: 1,
    },
    {
      id: 3,
      title: "Subject",
      flex: 1,
    },
    {
      id: 4,
      title: "Date",
      flex: 1,
    },
    {
      id: 5,
      title: "Last Seen",
      flex: 1,
    },
    {
      id: 6,
      title: "Status",
      flex: 1,
    },
  ];
  const tableData = [
    {
      id: 1,
      value: "2135321",
      flex: 1,
    },
    {
      id: 2,
      value: "Alyssa Hansen",
      flex: 1,
    },
    {
      id: 3,
      value: "Account",
      flex: 1,
    },
    {
      id: 4,
      value: "10 Dec 2020",
      flex: 1,
    },
    {
      id: 5,
      value: "12 Dec 2020",
      flex: 1,
    },
    {
      id: 8,
      value: "Open",
      flex: 1,
      action: true,
    },
  ];
  return (
    <div className="d-flex align-items-center">
      <LeftPanel />
      <div className="col-10" style={{ backgroundColor: "#eaeaea" }}>
        <div className="py-5">
          <TitleBar title="All Requests" />
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

export default AllRequests;
