import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, MainHeading } from "../../../globalStyles";
import {
  HeroVideo,
  HeroSection,
  HeroText,
  ButtonWrapper,
  HeroButton,
} from "./HeroStyles";

const Hero = () => {
  return (
    <HeroSection>
      <HeroVideo src="../../assets/hero.mp4" />
      <Container>
        <MainHeading>Serpent</MainHeading>
        <HeroText>
          We help you grow your business across online and offline platforms
          right from the palm of your hands
        </HeroText>
        <ButtonWrapper>
          <Link to="/login">
            <Button>Get Started</Button>
          </Link>
          <HeroButton>Find More</HeroButton>
        </ButtonWrapper>
      </Container>
    </HeroSection>
  );
};

export default Hero;
