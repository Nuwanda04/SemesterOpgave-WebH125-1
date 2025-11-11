import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = ({ color = (theme) => theme.palette.primary.main }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
      <CircularProgress sx={{ color }} />
    </Box>
  );
};

export default LoadingSpinner;
