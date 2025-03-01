import React, { useState } from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import ReferralModal from "./ReferralModal";

const ReferralSection = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)"); // Detect mobile screen

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#EFF5FF",
        p: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold" textAlign="center" mb={2}>
        How Do I <Typography component="span" color="primary">Refer?</Typography>
      </Typography>

      {/* Image Section */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <img
          src={isMobile ? "/Group 22095.png" : "/middleimg.png"} // Change image for mobile
          alt="Referral Steps"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>

      {/* "Refer Now" Button - Positioned below the image on mobile */}
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{
          mt: 3,
          borderRadius: "10px",
          fontWeight: "bold",
          px: 4,
          py: 1.5,
          fontSize: "1rem",
          textTransform: "none",
          bgcolor: "#1A73E8",
        }}
      >
        Refer Now
      </Button>

      <ReferralModal open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
};

export default ReferralSection;
