import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import ProductFeed from "../components/ProductFeed/ProductFeed";

interface HomeProps {
  products: IProduct[];
}

const Home: NextPage<HomeProps> = ({ products }) => {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
        {/* Preoduct Feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const products = await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return {
    props: {
      products,
    },
  };
}
