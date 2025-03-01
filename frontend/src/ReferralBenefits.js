import React from "react";
import { Button, Switch, Grid, Paper, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ReferralModal from "./ReferralModal";
import { useState } from "react";

const ReferralBenefits = () => {
  const [open, setOpen] = useState(false); // State to control modal
  return (
    <Grid container spacing={0} sx={{ p: 2, maxWidth: 1200, margin: '0 auto' }}>
        <Box sx={{ width: '100%', textAlign: 'center', m: 5 }}>
         <Typography variant="h6">
           What Are The <span style={{ color: "#007bff" }}>Referral Benefits?</span>
         </Typography>
       </Box>
      {/* Left Side: PNG Container */}
      <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Box sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // bgcolor: '#f5f9ff',
                  borderRadius: 2,
                  padding: 0, // Ensure no extra padding
              }}>
                  <img
                      src="/left-container.png"
                      alt="Left Container"
                      style={{
                          width: '61%',
                          height: 'auto',
                          maxWidth: 300,
                          objectFit: 'contain',
                          padding: 0, // Remove padding
                          margin: 0, // Remove margin
                          display: 'block', // Prevent inline spacing issues
                      }}
                  />
              </Box>
      </Grid>

      {/* Right Side: Referral Benefits Table */}
      <Grid item xs={12} md={8} sx={{ height: '100%' }}>
        <Box sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <Box>
            
            <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="body2" sx={{ mr: 1 }}>Enrolled</Typography>
              <Switch color="primary" size="small" />
            </Box>
            
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#e0f0ff' }}>
                    <TableCell sx={{ fontWeight: 'bold', py: 1, width: '55%', fontSize: '0.875rem' }}>Programs</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', py: 1, fontSize: '0.875rem' }}>Referrer Bonus</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', py: 1, fontSize: '0.875rem' }}>Referee Bonus</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { program: "Professional Certificate Program in Product Management", referrer: "₹7,000", referee: "₹9,000" },
                    { program: "PG Certificate Program in Strategic Product Management", referrer: "₹9,000", referee: "₹11,000" },
                    { program: "Professional Certificate Program in Product Management", referrer: "₹7,000", referee: "₹9,000" },
                    { program: "PG Certificate Program in Strategic Product Management", referrer: "₹9,000", referee: "₹11,000" },
                    { program: "Executive Program in Data Driven Product Management", referrer: "₹10,000", referee: "₹10,000" },
                    { program: "Executive Program in Product Management and Digital Transformation", referrer: "₹10,000", referee: "₹10,000" },
                    { program: "Executive Program in Product Management", referrer: "₹10,000", referee: "₹10,000" },
                    { program: "Advanced Certification in Product Management", referrer: "₹10,000", referee: "₹10,000" },
                    { program: "Executive Program in Product Management and Project Management", referrer: "₹10,000", referee: "₹10,000" },
                    // ... other table data
                  ].map((item, index) => (
                    <TableRow key={index} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                      <TableCell sx={{ py: 1, fontSize: '0.875rem' }}>{item.program}</TableCell>
                      <TableCell sx={{ textAlign: 'center', py: 1, fontSize: '0.875rem' }}>{item.referrer}</TableCell>
                      <TableCell sx={{ textAlign: 'center', py: 1, fontSize: '0.875rem' }}>{item.referee}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Box>
        </Box>
      </Grid>
      {/* Button Outside Individual Containers */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                  variant="contained"
                  onClick={() => setOpen(true)} // Open modal on click
                  sx={{
                      mt: 3,
                      borderRadius: "10px",
                      fontWeight: "bold",
                      px: 4,
                      py: 1.5,
                      fontSize: "1rem",
                      textTransform: "none",
                      bgcolor: "#1A73E8", // Updated Button Color
                  }}
              >
                  Refer Now
              </Button>
          </Box>
          {/* Referral Modal Component */}
      <ReferralModal open={open} handleClose={() => setOpen(false)} />
    </Grid>
  );
};

export default ReferralBenefits;