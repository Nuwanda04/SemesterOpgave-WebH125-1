import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#2c4f54",
        color: "white",
        py: 6,
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 3 }}>
        <IconButton
          sx={{
            backgroundColor: "white",
            color: "#2c4f54",
            width: 56,
            height: 56,
            "&:hover": {
              backgroundColor: "#e8e5dc",
            },
          }}
        >
          <FacebookIcon sx={{ fontSize: 32 }} />
        </IconButton>
        <IconButton
          sx={{
            backgroundColor: "white",
            color: "#2c4f54",
            width: 56,
            height: 56,
            "&:hover": {
              backgroundColor: "#e8e5dc",
            },
          }}
        >
          <InstagramIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
        }}
      >
        <Box
          component="img"
          src="/src/assets/logo.png"
          alt="Logo"
          sx={{
            width: 40,
            height: 40,
          }}
        />
        <Typography
          variant="body1"
          sx={{
            fontWeight: 400,
            fontSize: "1.2rem",
          }}
        >
          Gittes Glamping
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
