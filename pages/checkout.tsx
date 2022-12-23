import Head from "next/head";
import Header from "../components/Header/Header";
import Image from "next/image";
import Advert from "../public/advert.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  selectItems,
  selectTotal,
} from "../slice/basketSlice";
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from "react-currency-formatter";
import { signIn, useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key || "");

const Checkout = () => {
  const items = useSelector(selectItems);
  const cartTotal = useSelector(selectTotal);
  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call the backend for checkout session.
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session?.user?.email,
    });

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result?.error) {
      alert(result?.error.message);
    }
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon: Checkout</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto lg:flex">
        {/* Left */}

        <section className="flex-grow m-5 shadow-sm">
          <Image
            src={Advert}
            width={1020}
            height={250}
            alt="Advertisement"
            style={{ objectFit: "cover" }}
          />
          <div className="flex flex-col p-5 space-y-5 mt-2 bg-white">
            <h1 className="text-3xl border-b pb-4">Your Shopping Cart</h1>
            {items.map((item, idx) => (
              <CheckoutProduct product={item} key={idx} />
            ))}
          </div>
        </section>

        {/* Right */}
        <aside className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">
                  <Currency quantity={cartTotal} currency="GBP" />
                </span>
              </h2>
              <button
                role="link"
                disabled={!session?.user}
                onClick={() => {
                  session?.user ? createCheckoutSession() : signIn();
                }}
                className={`button mt-2 ${
                  !session?.user &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-500 "
                } `}
              >
                {!session?.user ? "Sign in to Checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </aside>
      </main>
    </div>
  );
};

export default Checkout;

interface ICheckoutProductProps {
  product: IProduct;
}

const CheckoutProduct: React.FC<ICheckoutProductProps> = ({ product }) => {
  const dispatch = useDispatch();

  const removeItemFromCart = (id: number) => {
    dispatch(removeFromBasket(id));
  };
  return (
    <div
      className="flex shadow-md rounded-md bg-white gap-3 p-3"
      key={product.id}
    >
      <Image src={product.image} height={100} width={200} alt={product.title} />
      <div>
        <h2 className="text-2xl">{product.title}</h2>
        <div className="flex">
          {Array(Math.round(product.rating.rate))
            .fill({})
            .map((_, idx) => (
              <StarIcon className="h-5 text-yellow-500" key={idx} />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-2">{product.description}</p>
        <div className="mb-5">
          <Currency quantity={product.price} currency="GBP" />
        </div>
      </div>
      <div>
        <button
          onClick={() => removeItemFromCart(product.id)}
          className="self-end button"
        >
          Remove From Card
        </button>
      </div>
    </div>
  );
};
