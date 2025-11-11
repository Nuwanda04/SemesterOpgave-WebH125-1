import React from "react";
import { Box, Typography, Container } from "@mui/material";

const BlueInfoSection = ({
  title,
  children,
  marginTop = "-17.5vh",
  showTitle = true,
}) => {
  return (
    <Box
      className="curved-border"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        marginTop: marginTop,
        pt: 12,
        pb: 8,
        px: { xs: 2, sm: 4, md: 6 },
        position: "relative",
        zIndex: 3,
      }}
    >
      <Container maxWidth="md">
        {showTitle && (
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem" },
              color: "white",
              mb: 4,
              textAlign: "center",
            }}
          >
            {title}
          </Typography>
        )}
        <Box sx={{ color: "white" }}>{children}</Box>
      </Container>
    </Box>
  );
};

export default BlueInfoSection;
