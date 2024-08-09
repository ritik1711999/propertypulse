import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";
import React from "react";
import FeaturedProperties from "@/components/FeaturedProperties";

function Home() {
  return (
    <>
      <Hero />;
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
}

export default Home;
