import React, { useState } from "react";
import { Container, Typography, Button, Paper, Grid, Box, useMediaQuery } from "@mui/material";
import ReferralModal from "./ReferralModal"; // Import the modal component

const HeroSection = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)"); // Detect mobile screen

  return (
    <Container sx={{ textAlign: "center", my: 4, p: 0, maxWidth: "100%", position: "relative" }}>
      {isMobile ? (
        // Mobile View: Show uploaded image with "Refer Now" button on top
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", position: "relative" }}>
          {/* Refer Now Button Above Image Text */}
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpen(true)}
            sx={{
              borderRadius: "10px",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              bgcolor: "#1A73E8",
              position: "absolute",
              top: "68%", // Adjust to position above text
              zIndex: 2,
              transform: "translateY(-50%)",
            }}
          >
            Refer Now
          </Button>

          {/* Mobile Image */}
          <Box
            component="img"
            src="/hero-mobile.png" // Use uploaded image
            alt="Hero Mobile Banner"
            sx={{
              width: "100%",
              maxWidth: "430px", // Ensures it doesn't exceed 430px width
              height: "auto",
              borderRadius: "12px",
              boxShadow: "none", // Removes elevation
            }}
          />
        </Box>
      ) : (
        // Desktop & Tablet View: Original Layout
        <Paper
          elevation={3} // Keeps elevation only for desktop
          sx={{
            p: 0,
            borderRadius: "16px",
            backgroundColor: "#EEF5FF",
            maxWidth: "900px",
            width: "90%",
            mx: "auto",
            minHeight: "450px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background Cash Images */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            {Array.from({ length: 25 }).map((_, index) => {
              const cashImages = ["/cash.png", "/cash2.png"];
              const randomImage = cashImages[Math.floor(Math.random() * cashImages.length)];

              return (
                <Box
                  key={index}
                  component="img"
                  src={randomImage}
                  alt="Cash"
                  sx={{
                    position: "absolute",
                    width: `${Math.random() * 60 + 30}px`,
                    height: "auto",
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    zIndex: 0,
                    transform: `rotate(${Math.random() * 90 - 45}deg)`,
                  }}
                />
              );
            })}
          </Box>

          <Grid container alignItems="center" sx={{ margin: 0, width: "100%", display: "flex", flexWrap: "nowrap", gap: 0 }}>
            {/* Text Content Column */}
            <Grid item xs={12} md={6} sx={{ padding: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
              <Box sx={{ width: "100%", p: 2, position: "relative", zIndex: 1 }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  Let's Learn
                </Typography>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  & Earn
                </Typography>
                <Typography variant="h5" color="black" sx={{ mb: 2 }}>
                  Get a chance to win <br /> up-to
                  <Typography variant="h4" component="span" color="#0A66C2" fontWeight="bold" sx={{ mb: 4, ml: 1 }}>
                    Rs. 15,000
                  </Typography>
                </Typography>

                {/* "Refer Now" Button */}
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setOpen(true)}
                  sx={{
                    borderRadius: "10px",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    bgcolor: "#1A73E8",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  Refer Now
                </Button>
              </Box>
            </Grid>

            {/* Image Column */}
            <Grid item xs={12} md={6} sx={{ padding: 0, display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
              <Box
                component="img"
                src="/Anniversary.png"
                alt="Hero banner"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Referral Modal */}
      <ReferralModal open={open} handleClose={() => setOpen(false)} />
    </Container>
  );
};

export default HeroSection;
