import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header/Header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <h1 className="text-6xl text-bold">Amazon Clone</h1>
    </>
  );
};

export default Home;
