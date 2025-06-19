import React from "react";
import { Carousel } from "antd";

import Container from "../sharred/Container";

const CarouselPage: React.FC = () => (
  <Container>
    <Carousel autoplay className="cursor-pointer">
      <div>
        <div
          className="relative bg-cover bg-center"
          style={{
            backgroundImage: "url('../../../images/bg2.jpg')",
            height: "40vh", // Adjusted for better flexibility on smaller screens
            minHeight: "300px", // Ensures a minimum height for very small screens
          }}
        >
          {/* <button className="absolute bottom-8 left-6 text-white bg-yellow-500 text-bold px-5 py-2 rounded-full text-sm sm:text-base md:text-lg">
            Shop Now
          </button> */}
        </div>
      </div>
      <div>
        <div
          className="relative bg-cover bg-center"
          style={{
            backgroundImage: "url('../../../images/bg3.jpg')",
            height: "40vh", // Adjusted for better flexibility on smaller screens
            minHeight: "300px", // Ensures a minimum height for very small screens
          }}
        >
          {/* <button className="absolute bottom-8 left-6 text-white bg-primary px-5 py-2 rounded-full text-sm sm:text-base md:text-lg">
            Shop Now
          </button> */}
        </div>
      </div>
      <div>
        <div
          className="relative bg-cover bg-center"
          style={{
            backgroundImage: "url('../../../images/bg.jpg')",
            height: "40vh", // Adjusted for better flexibility on smaller screens
            minHeight: "300px", // Ensures a minimum height for very small screens
          }}
        >
          {/* <button className="absolute bottom-8 left-9  text-white bg-primary px-5 py-2 rounded-full text-sm sm:text-base md:text-lg">
            Shop Now
          </button> */}
        </div>
      </div>
    </Carousel>
  </Container>
);

export default CarouselPage;
