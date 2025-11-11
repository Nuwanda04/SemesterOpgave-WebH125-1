import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Tak = () => {
  const location = useLocation();
  const name = location.state?.name || "Lars";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#2c4f54",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
          color: "white",
          textAlign: "center",
          mb: 2,
        }}
      >
        Hej {name},
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
          color: "white",
          textAlign: "center",
          mb: 1,
        }}
      >
        Tak for din besked!
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
          color: "white",
          textAlign: "center",
          mb: 6,
        }}
      >
        Du hører fra os snarest.
      </Typography>

      <Button
        component={Link}
        to="/"
        className="curved-border"
        sx={{
          backgroundColor: (theme) => theme.palette.secondary.main,
          color: "white",
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
          padding: "15px 60px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#7a9489",
          },
        }}
      >
        Tilbage
      </Button>
    </Box>
  );
};

export default Tak;
