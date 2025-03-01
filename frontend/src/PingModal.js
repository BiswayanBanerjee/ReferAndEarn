import { useState, useEffect } from "react";
import { Modal, Box, Typography, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";

const PingModal = ({ backendUrl }) => {
  const [open, setOpen] = useState(true);
  const [serverAwake, setServerAwake] = useState(false);

  useEffect(() => {
    const pingServer = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/auth/ping`);
        if (response.ok) {
          setServerAwake(true);
          toast.success("Server is awake! Good to go!");
          setTimeout(() => setOpen(false), 2000); // Close modal after 2 sec
        }
      } catch {
        console.log("Server still sleeping...");
      }
    };

    // Ping every 500ms until the server wakes up
    const interval = setInterval(async () => {
      await pingServer();
    }, 500);

    return () => clearInterval(interval);
  }, [backendUrl]);

  return (
    <Modal open={open} disableAutoFocus>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        {!serverAwake ? (
          <>
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
            Waking up the server (it’s idle due to inactivity). Platforms like Render put the server to sleep, so please wait...
            </Typography>
          </>
        ) : (
          <Typography variant="h6" color="success">
            ✅ Good to go!
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default PingModal;
