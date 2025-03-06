import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Typography, IconButton, Paper, Box, CircularProgress, useMediaQuery, List, ListItem, ListItemText, } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReferralModal = ({ open, handleClose }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [selectedBonus, setSelectedBonus] = useState(null);
  const [isDuplicateReferee, setIsDuplicateReferee] = useState(false); // State for duplicate check
  const [isLoading, setIsLoading] = useState(false); //  Track loading state
  const isMobile = useMediaQuery("(max-width: 600px)"); //  Responsive check

  const { control, handleSubmit, watch, setValue, trigger, formState: { errors }, } = useForm({ defaultValues: { referrerEmail: "", otp: "", refereeEmail: "", program: "", }, });

  const referrerEmail = watch("referrerEmail");
  const refereeEmail = watch("refereeEmail");
  const selectedProgram = watch("program");
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get("https://referandearn-7tsl.onrender.com/api/auth/programs");
        console.log("Programs API Response:", res.data);
        setPrograms(res.data.programs || []);
      } catch (err) {
        console.error("Error fetching programs:", err);
      }
    };

    fetchPrograms();
  }, []); //  Fetch programs only once when the component mounts

  // Separate effect for handling bonus based on selected program
  useEffect(() => {
    if (selectedProgram) {
      const programData = programs.find((p) => p.name === selectedProgram);

      if (programData) {
        setSelectedBonus({
          referrerBonus: programData.referrer_bonus_amount,
          refereeBonus: programData.referee_bonus_amount,
        });
        sessionStorage.setItem("program",selectedProgram);
      } else {
        setSelectedBonus(null);
      }
    }
  }, [selectedProgram, programs]); //  Update bonus when the selected program changes
  
useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    const storedEmail = sessionStorage.getItem("referrerEmail"); //  Get email from sessionStorage

    if (authToken && storedEmail) {
      setOtpVerified(true);
      setValue("referrerEmail", storedEmail); //  Set email in the form
      setValue("program", storedProgram); //  Set email in the form
      fetchReferrals(authToken, storedEmail);
    }
  }, [open]); //  Runs when the modal opens

  const sendOtp = async () => {
    setIsSendingOtp(true);
    sessionStorage.removeItem("authToken"); // Clear session storage before sending OTP
    try {
      await axios.post("https://referandearn-7tsl.onrender.com/api/auth/send-otp", { email: referrerEmail });
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      toast.error("Failed to send OTP. Try again.");
    }
    setIsSendingOtp(false);
  };

  const validateOtp = async () => {
    setIsVerifyingOtp(true);
    sessionStorage.removeItem("authToken"); // Clear session storage before login

    try {
      const response = await axios.post("https://referandearn-7tsl.onrender.com/api/auth/login", {
        email: referrerEmail,
        otp: watch("otp"),
      });

      const authToken = response.data.token;
      sessionStorage.setItem("authToken", authToken);
      sessionStorage.setItem("referrerEmail", referrerEmail);
      setOtpVerified(true);
      toast.success("OTP verified successfully!");

      //  Fetch referrals only after OTP verification and token storage
      if (authToken) {
        fetchReferrals(authToken, referrerEmail);
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    }

    setIsVerifyingOtp(false);
  };

  //  Modify fetchReferrals to accept authToken and email as parameters
  const fetchReferrals = async (authToken, email) => {
    if (!authToken || !email) return;

    try {
      const res = await axios.post(
        "https://referandearn-7tsl.onrender.com/api/auth/referrals", //  Change GET to POST
        { email }, //  Send email in request body (like Postman)
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Referrals API Response:", res.data);
      if (res.data.referrals) {
        setReferrals(res.data.referrals);
      }
    } catch (err) {
      console.error("Error fetching referrals:", err);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true); //  Start loading animation

      const program = programs.find((p) => p.name === data.program);
      if (!program) {
        toast.error("Invalid program selection.");
        setIsLoading(false);
        return;
      }

      const payload = {
        email: data.referrerEmail,
        name: "Referee Name",
        programId: program.id,
        referee_email: data.refereeEmail,
      };

      console.log("Checking for duplicate referral:", payload);

      // Check for existing referral before submitting
      const checkResponse = await axios.post(
        "https://referandearn-7tsl.onrender.com/api/auth/check-referral",
        { referee_email: data.refereeEmail },
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("authToken")}` } }
      );

      if (checkResponse.data.exists) {
        setIsDuplicateReferee(true); //  Update UI state
        toast.error("Duplicate referral is not possible. This email has already been referred.");
        setIsLoading(false); // 🔥 Stop loading
        return;
      }

      // If not a duplicate, proceed with submission
      setIsDuplicateReferee(false); // Reset state
      console.log("Submitting referral:", payload);

      const response = await axios.post(
        "https://referandearn-7tsl.onrender.com/api/auth/refer",
        payload,
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("authToken")}` } }
      );

      toast.success("Referral submitted successfully!");
      handleClose();
    } catch (error) {
      console.error("Error submitting referral:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to submit referral. Try again.");
    } finally {
      setIsLoading(false); // 🔥 Stop loading animation after API call
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile} //  Full screen on mobile for better UX
    >
      <Paper elevation={4} sx={{ p: isMobile ? 2 : 3, borderRadius: 2 }}>
        {/* Header with Close Button */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle sx={{ fontSize: isMobile ? "1rem" : "1.5rem" }}>
            Refer a Friend & Earn Rewards
          </DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Referrer Email */}
            <Controller
              name="referrerEmail"
              control={control}
              rules={{
                required: otpVerified ? false : "Email is required",
                pattern: otpVerified ? null : /^\S+@\S+\.\S+$/,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Your Email Address"
                  fullWidth
                  margin="dense"
                  error={!!errors.referrerEmail}
                  helperText={errors.referrerEmail?.message}
                  disabled={otpSent || otpVerified}
                />
              )}
            />

            {!otpVerified && (
              <Button
                onClick={sendOtp}
                variant="contained"
                color="primary"
                disabled={isSendingOtp || !referrerEmail || errors.referrerEmail}
                startIcon={isSendingOtp ? <CircularProgress size={20} color="inherit" /> : null}
                sx={{ width: isMobile ? "100%" : "auto", my: 2 }}
              >
                {isSendingOtp ? "Sending OTP..." : "Send OTP"}
              </Button>
            )}

            {otpSent && !otpVerified && (
              <Controller
                name="otp"
                control={control}
                rules={{ required: "OTP is required", minLength: 6, maxLength: 6 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Enter OTP"
                    fullWidth
                    margin="dense"
                    error={!!errors.otp}
                    helperText={errors.otp?.message}
                  />
                )}
              />
            )}

            {otpSent && !otpVerified && (
              <Button
                onClick={validateOtp}
                variant="contained"
                color="success"
                disabled={isVerifyingOtp || !watch("otp")}
                startIcon={isVerifyingOtp ? <CircularProgress size={20} color="inherit" /> : null}
                sx={{ width: isMobile ? "100%" : "auto", my:2 }}
              >
                {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
              </Button>
            )}
            {otpVerified && (
              <>
                {/* Referee Email */}
                <Controller
                  name="refereeEmail"
                  control={control}
                  rules={{
                    required: "Friend's Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email address",
                    },
                    validate: (value) => {
                      if (value === referrerEmail) return "You cannot refer yourself";
                      if (isDuplicateReferee) return "This email has already been referred";
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Friend's Email Address"
                      fullWidth
                      margin="dense"
                      error={!!errors.refereeEmail || isDuplicateReferee}
                      helperText={
                        errors.refereeEmail?.message || (isDuplicateReferee ? "This email has already been referred" : "")
                      }
                      onChange={(e) => {
                        field.onChange(e); // Update field value
                        setIsDuplicateReferee(false); // Reset duplicate flag on change
                      }}
                    />
                  )}
                />

                {/* Program Selection */}
                <Controller
                  name="program"
                  control={control}
                  rules={{ required: "Please select a program" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Select Program"
                      fullWidth
                      margin="dense"
                      error={!!errors.program}
                      helperText={errors.program?.message}
                    >
                      {programs.map((p, index) => (
                        <MenuItem key={index} value={p.name}>
                          {p.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                {/* Submit Button */}
                <DialogActions sx={{ flexDirection: isMobile ? "column" : "row" }}>
                  <Button
                    onClick={handleClose}
                    color="secondary"
                    sx={{ width: isMobile ? "100%" : "auto" }} //  Full width on mobile
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isDuplicateReferee || isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                    sx={{ width: isMobile ? "100%" : "auto" }}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </Button>
                </DialogActions>
              </>
            )}
          </Box>
        </DialogContent>

        {/* Display Selected Bonus */}
        {selectedBonus && (
          <Box mt={2} p={2} bgcolor="#EEF5FF" borderRadius={2} textAlign="center">
            <Typography variant="h6" color="primary" fontWeight="bold">
              🎉 Referral Bonus:
            </Typography>
            <Typography variant="body1">
              <strong>Referrer Bonus:</strong> ₹{selectedBonus.referrerBonus}
            </Typography>
            <Typography variant="body1">
              <strong>Referee Bonus:</strong> ₹{selectedBonus.refereeBonus}
            </Typography>
          </Box>
        )}

        {/* Display User's Referrals */}
        <Box mt={3} p={2} bgcolor="#f5f5f5" borderRadius={2}>
          <Typography variant="h6">Your Referrals</Typography>
          {referrals.length > 0 ? (
            <List>
              {referrals
                .sort((a, b) => b.id - a.id) // Sort by ID (higher ID = more recent)
                .map((ref, index) => {
                  const program = programs.find((p) => p.id === ref.programId);
                  return (
                    <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <ListItemText primary={ref.email} secondary={program ? program.name : "Unknown Program"} />
                    </ListItem>
                  );
                })}
            </List>
          ) : (
            <Typography fontWeight="bold" color="primary">
              Refer Now!
            </Typography>
          )}
        </Box>
      </Paper>
    </Dialog>
  );
};

export default ReferralModal;
