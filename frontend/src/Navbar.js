import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ width: 250 }}>
      <List>
        <ListItem button>
          <ListItemText primary="Courses" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Refer & Earn" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Resources" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="About Us" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component="a" href="https://accredian.com/login" target="_blank">
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button component="a" href="https://trial.accredian.com/" target="_blank">
          <ListItemText primary="Try for free" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      {/* Top Strip */}
      <Box
        sx={{
          backgroundColor: "#EAF2FD",
          textAlign: "center",
          py: 0.5,
          fontSize: "14px",
        }}
      >
        Navigate your ideal career path with tailored expert advice{" "}
        <Typography
          component="span"
          sx={{ color: "#1A73E8", fontWeight: "bold", cursor: "pointer" }}
        >
          Contact Expert
        </Typography>
      </Box>

      {/* Main Navbar */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: "1px solid #ddd", px: 2 }}>
        <Toolbar>
          {isMobile ? (
            <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
              <Typography variant="h6" sx={{ flexGrow: 1, color: "#1A73E8", fontWeight: "bold", textAlign: "center" }}>
                accredian
              </Typography>
              <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Box>
          ) : (
            // Desktop View
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Typography variant="h6" sx={{ color: "#1A73E8", fontWeight: "bold", mr: 1, textAlign: 'center' }}>
                accredian
                <Typography variant="caption" sx={{ color: "#333", fontWeight: "normal", fontSize: "0.5rem", textAlign: 'center', display: 'block', mt: -0.5 }}>
                  credentials that matter
                </Typography>
              </Typography>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  bgcolor: "#1A73E8",
                  color: "white",
                  borderRadius: "6px",
                  px: 2,
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#084a94" },
                }}
              >
                Courses <KeyboardArrowDownIcon fontSize="small" />
              </Button>
            </Box>
          )}

          {/* Mobile: Drawer Navigation */}
          <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
            {drawerContent}
          </Drawer>

          {/* Desktop Menu Items */}
          {!isMobile && (
            <>
              <Button sx={{ textTransform: "none", color: "black" }}>Refer & Earn</Button>
              <Button sx={{ textTransform: "none", color: "black" }}>Resources</Button>
              <Button sx={{ textTransform: "none", color: "black" }}>About Us</Button>
              <Button
                variant="outlined"
                href="https://accredian.com/login"
                target="_blank"
                sx={{
                  textTransform: "none",
                  borderColor: "#ddd",
                  backgroundColor: "#F3F3F3",
                  color: "black",
                  mx: 1,
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                href="https://trial.accredian.com/"
                target="_blank"
                sx={{
                  textTransform: "none",
                  bgcolor: "#1A73E8",
                  color: "white",
                  borderRadius: "6px",
                  px: 2,
                }}
              >
                Try for free
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
