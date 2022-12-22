import Image from "next/image";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from "react-currency-formatter";
import PrimeCheckMark from "../../public/prime_checkmark.png";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../slice/basketSlice";

interface ProductFeedProps {
  products: IProduct[];
}

const ProductFeed: React.FC<ProductFeedProps> = ({ products }) => {
  return (
    <div className="grid grid-flow-row-dense mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52">
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductFeed;

interface ProductProps {
  product: IProduct;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const [hasPrime, setHasPrime] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setHasPrime(Math.random() < 0.5);
  }, []);

  const addItemToCart = () => {
    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 rounded-md shadow-md">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category}
      </p>
      <Image
        src={product.image}
        height={100}
        width={100}
        style={{ objectFit: "contain" }}
        className="self-center"
        alt={product.title}
      />
      <h4 className="my-3">{product.title}</h4>
      <div className="flex">
        {Array(Math.round(product.rating.rate))
          .fill({})
          .map((_, idx) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{product.description}</p>
      <div className="mb-5">
        <Currency quantity={product.price} currency="GBP" />
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <Image src={PrimeCheckMark} alt="Prime check mark" className="w-12" />
          <p className="text-xs text-gray-500">Free Next-day Delivery</p>
        </div>
      )}
      <button onClick={() => addItemToCart()} className="mt-auto button">
        Add to Cart
      </button>
    </div>
  );
};
