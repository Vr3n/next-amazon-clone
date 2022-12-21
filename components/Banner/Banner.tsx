import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Banner1 from "../../public/banner1.jpg";
import Banner2 from "../../public/banner2.jpg";
import Banner3 from "../../public/banner3.jpg";

const Banner = () => {
  return (
    <section className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to transparent bottom-0 z-10" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
        dynamicHeight
      >
        <div>
          <Image loading="lazy" src={Banner1} alt="banner1" />
        </div>
        <div>
          <Image loading="lazy" src={Banner2} alt="banner2" />
        </div>
        <div>
          <Image loading="lazy" src={Banner3} alt="banner3" />
        </div>
      </Carousel>
    </section>
  );
};

export default Banner;
