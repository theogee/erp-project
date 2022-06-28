import React from "react";

import Carousel from "../Carousel/Carousel";
import { Content } from "../Content/Content";
import Features from "../Features/Features";
import Hero from "../Hero/Hero";
import { heroOne, heroTwo, heroThree } from "../data/HeroData";

// Hero Feature Content Carousel

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Content {...heroOne} />
      <Content {...heroTwo} />
      <Content {...heroThree} />
      <Carousel />
    </>
  );
};

export default Home;
