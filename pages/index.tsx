import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";

const Home: NextPage = () => {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
        {/* Preoduct Feed */}
      </main>
    </div>
  );
};

export default Home;
