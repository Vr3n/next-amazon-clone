import React from "react";
import Header from "../components/Header/Header";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();

  return (
    <div className="h-screen">
      <Head>
        <title>Amazon Checkout: Payment Success!</title>
      </Head>
      <Header />
      <main className="max-w-screen-lg mx-auto">
        <section className="flex flex-col p-10 bg-white shadow-md">
          <section className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you, your order has been confirmed!
            </h1>
          </section>
          <p>
            Thank you for shopping with us. We'll send a confirmation on your
            mail when the item is shipped, if you would like to check the status
            of your order(s) please press the link below.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="button mt-8"
          >
            Go to my orders
          </button>
        </section>
      </main>
    </div>
  );
};

export default Success;
