import React from "react";
import { Route as ReactRouter } from "react-router-dom";
import Layout from "../components/Layout";

const Route = (props) => {
  //   const withoutHeaderAndFooter = props.withoutHeaderAndFooter;
  const schema = (
    <React.Fragment>
      {/* {!withoutHeaderAndFooter && <Header />} */}
      <ReactRouter {...props} />
      {/* {!withoutHeaderAndFooter && <Footer />} */}
    </React.Fragment>
  );
  if (props.withoutLayout) return schema;
  return <Layout>{schema}</Layout>;
};

export default Route;
