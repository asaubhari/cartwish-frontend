import React from "react";
import "./HomePage.css";
import HeroSection from "./HeroSection";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import FeatureProducts from "./FeatureProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy i phone 14 pro"
        subtitle="Experience the power of the latest i phone 14 with our most Pro camera ever."
        link="/"
        image={iphone}
      />
      <FeatureProducts />
      <HeroSection
        title="Build the ultimate setup"
        subtitle="You can add studio display and colour matched magic accessories to your bag after configure your mac mini."
        link="/"
        image={mac}
      />
    </div>
  );
};

export default HomePage;
