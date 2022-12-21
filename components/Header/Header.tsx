import Image from "next/image";
import AmazonLogo from "../../public/amazon_logo.png";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header>
      <nav className="flex items-center bg-amazon_blue px-5 flex-grow py-2 gap-5">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 mr-3">
          <Image
            src={AmazonLogo}
            alt="amazon logo"
            width={150}
            height={40}
            className="cursor-pointer"
          />
        </div>
        <div className="bg-yellow-400 items-center h-10 rounded-md flex-grow cursor-pointer hidden sm:flex">
          <input
            type="text"
            name=""
            id=""
            className="p-2 h-full w-6 px-4 flex-grow flex-shrink rounded-l-md"
          />
          <MagnifyingGlassIcon className="h-12 p-4" />
        </div>
        <ul className="text-white flex items-center text-xs space-x-6">
          <li className="link">
            <p>Hello, Viren Patel</p>
            <p className="link-item">Account & Lists</p>
          </li>
          <li className="link">
            <p>Returns</p>
            <p className="link-item">& Orders</p>
          </li>
          <li className="relative link flex items-center">
            <span className="absolute top-0 right-0 h-4 w-6 bg-yellow-400 text-center text-black rounded-full md:right-5">
              0
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="link-item hidden mt-2 md:inline">Cart</p>
          </li>
        </ul>
      </nav>
      {/* Bottom Navigation */}
      <nav className="flex items-center bg-amazon_blue-light text-white text-sm p-2 pl-6 space-x-3">
        <p className="flex link items-center">
          <Bars3Icon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Todays deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </nav>
    </header>
  );
};

export default Header;
