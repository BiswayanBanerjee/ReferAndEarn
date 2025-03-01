import React from "react";
import { Button, Box, useMediaQuery } from "@mui/material";

const SubNav = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = section.offsetTop - 50; // Adjust based on navbar height
      const screenHeight = window.innerHeight;

      if (id === "faq" || id === "contact") {
        window.scrollTo({
          top: offset - screenHeight / 4,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      }
    }
  };

  const buttonStyles = {
    position: "relative",
    color: "#333",
    fontWeight: "bold",
    textTransform: "none",
    transition: "color 0.2s ease-in-out",
    fontSize: isMobile ? "12px" : "14px",
    padding: isMobile ? "5px 8px" : "8px 16px",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#0A66C2",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-5px",
      left: "50%",
      transform: "translateX(-50%) scale(0)",
      width: "6px",
      height: "6px",
      backgroundColor: "#0A66C2",
      borderRadius: "50%",
      transition: "transform 0.2s ease-in-out",
    },
    "&:hover::after": {
      transform: "translateX(-50%) scale(1)",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "#EEF5FF",
        borderRadius: "30px",
        padding: "8px",
        width: isMobile ? "90%" : "70%",
        maxWidth: "600px",
        margin: "20px auto",
        alignItems: "center",
        overflowX: isMobile ? "auto" : "unset",
      }}
    >
      <Button sx={buttonStyles} onClick={() => handleScroll("refer")}>
        Refer
      </Button>
      <Button sx={buttonStyles} onClick={() => handleScroll("benefits")}>
        Benefits
      </Button>
      <Button sx={buttonStyles} onClick={() => handleScroll("faq")}>
        FAQs
      </Button>
      <Button sx={buttonStyles} onClick={() => handleScroll("contact")}>
        Support
      </Button>
    </Box>
  );
};

export default SubNav;
