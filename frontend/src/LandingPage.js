import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import SubNav from "./SubNav";
import ReferralSection from "./ReferralSection";
import ReferralBenefits from "./ReferralBenefits";
import PingModal from "./PingModal";
import Faq from "./Faq";
import Contact from "./Contact";
import Footer from "./Footer";
import { Box } from "@mui/material";

const LandingPage = () => {
  return (
    <>
      {/* Ping Modal to wake up the backend */}
      <PingModal backendUrl="http://localhost:5000" />
      <Navbar />
      <SubNav />

      {/* Sections with IDs for smooth scrolling */}
      <Box id="hero">
        <HeroSection />
      </Box>

      <Box id="refer">
        <ReferralSection />
      </Box>

      <Box id="benefits">
        <ReferralBenefits />
      </Box>

      <Box id="faq">
        <Faq />
      </Box>

      <Box id="contact">
        <Contact />
      </Box>

      <Footer />
    </>
  );
};

export default LandingPage;
