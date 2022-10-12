import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LeftPanel from "../components/LeftPanel";
import MiddleCol from "../components/Home/MiddleCol";
import RightCol from "../components/Home/RightCol";

const Home = (props) => {
  const [isOpenedMiddleCol, setIsOpenedMiddleCol] = useState(true);
  return (
    <div className="d-flex">
      <LeftPanel />
      <MiddleCol />
      <RightCol
        isOpenedMiddleCol={isOpenedMiddleCol}
        setIsOpenedMiddleCol={setIsOpenedMiddleCol}
      />
    </div>
  );
};

export default Home;
