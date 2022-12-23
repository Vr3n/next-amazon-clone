import React from "react";
import Header from "../components/Header/Header";
import Head from "next/head";

const Orders = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Amazon Orders</title>
      </Head>
      <Header />
    </div>
  );
};

export default Orders;
