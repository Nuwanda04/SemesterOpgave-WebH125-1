import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import Footer from "../components/Footer";

const Kontakt = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to thank you page
    navigate("/tak", { state: { name: formData.name } });
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: "70vh",
          backgroundImage:
            'linear-gradient(rgba(54, 54, 54, 0.7), rgba(54, 54, 54, 0.7)), url("/src/assets/image_03.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          Kontakt Gitte
        </Typography>
      </Box>

      {/* Contact Form Section */}
      <Box
        className="curved-border"
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          marginTop: "-15vh",
          pt: 12,
          pb: 12,
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", sm: "3rem" },
                color: "white",
                mb: 3,
              }}
            >
              Vil du booke et ophold?
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem" },
                color: "white",
                mb: 1,
              }}
            >
              Eller har du blot et spørgsmål?
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem" },
                color: "white",
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Så tøv ikke med at tage kontakt til os herunder. Vi bestræber os
              på at svare inden for 24 timer, men op til ferier kan der være op
              til 48 timer.
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              fullWidth
              name="name"
              placeholder="Navn"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{
                backgroundColor: "transparent",
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "white",
                    borderRadius: "25px",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "white",
                  opacity: 0.8,
                },
              }}
            />

            <TextField
              fullWidth
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{
                backgroundColor: "transparent",
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "white",
                    borderRadius: "25px",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "white",
                  opacity: 0.8,
                },
              }}
            />

            <TextField
              fullWidth
              name="question"
              placeholder="Hvad drejer henvendelsen sig om?"
              value={formData.question}
              onChange={handleChange}
              required
              sx={{
                backgroundColor: "transparent",
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "white",
                    borderRadius: "25px",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "white",
                  opacity: 0.8,
                },
              }}
            />

            <TextField
              fullWidth
              name="message"
              placeholder="Besked (Skriv datoen, hvis det drejer sig om en booking)"
              value={formData.message}
              onChange={handleChange}
              required
              multiline
              rows={6}
              sx={{
                backgroundColor: "transparent",
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "white",
                    borderRadius: "25px",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "white",
                  opacity: 0.8,
                },
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                type="submit"
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
                Indsend
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Kontakt;
