import React from "react";
import { Box } from "@mui/material";

const Faq = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // bgcolor: "#EFF5FF", // Updated Background Color
        p: 5,
        borderRadius: 2,
        mt: 8, // Added margin-top for spacing
      }}
    >
      <img
        src="/Faq.png"
        alt="Referral Step"
        style={{ maxWidth: "70%", height: "auto" }}
      />
    </Box>
  );
};

export default Faq;