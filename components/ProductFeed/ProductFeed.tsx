import Image from "next/image";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from "react-currency-formatter";
import PrimeCheckMark from "../../public/prime_checkmark.png";

interface ProductFeedProps {
  products: IProduct[];
}

const ProductFeed: React.FC<ProductFeedProps> = ({ products }) => {
  return (
    <div className="px-5 space-x-3 space-y-3 grid grid-flow-row-dense mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-80">
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

  useEffect(() => {
    setHasPrime(Math.random() < 0.5);
  }, []);

  return (
    <div className=" relative p-5 shadow-md bg-white flex flex-col items-center gap-2 z-20">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category}
      </p>
      <img src={product.image} className="h-20 w-20" alt={product.title} />
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
        <div className="inline-flex items-center space-x-2 -mt-5">
          <Image
            src={PrimeCheckMark}
            alt="Prime check mark"
            className="h-10 w-20"
          />
          <p className="text-xs text-gray-500">Free Next-day Delivery</p>
        </div>
      )}
      <button className="button">Add to Cart</button>
    </div>
  );
};
