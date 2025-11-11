import React from "react";
import { Box, Typography } from "@mui/material";

const HeroSection = ({ backgroundImage, title, showOverlay = true }) => {
  return (
    <Box
      sx={{
        height: "70vh",
        backgroundImage: showOverlay
          ? `linear-gradient(rgba(54, 54, 54, 0.7), rgba(54, 54, 54, 0.7)), url("${backgroundImage}")`
          : `url("${backgroundImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
          color: "white",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default HeroSection;
