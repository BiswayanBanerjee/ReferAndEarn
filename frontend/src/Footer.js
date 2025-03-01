import React from "react";
import { Box, useMediaQuery } from "@mui/material";

const Footer = () => {
  const isMobile = useMediaQuery("(max-width: 600px)"); // Detects mobile screen

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Center the image
        alignItems: "center",
        mt: 8,
        width: "100%", // Ensures full width
        overflow: "hidden", // Prevents overflow issues
      }}
    >
      <img
        src="/Footer.png"
        alt="Footer"
        style={{
          width: isMobile ? "100%" : "100%", // Full width on all screens
          height: "auto", // Maintains aspect ratio
          maxHeight: isMobile ? "auto" : "796px", // Adjust max height for desktop
        }}
      />
    </Box>
  );
};

export default Footer;
