import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import BlueInfoSection from "../components/BlueInfoSection";
import StayCard from "../components/StayCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Ophold = () => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStays = async () => {
      try {
        const response = await fetch("http://localhost:3042/stays");
        const result = await response.json();

        if (result.status === "ok" && result.data) {
          setStays(result.data);
        }
      } catch (error) {
        console.error("Error fetching stays:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStays();
  }, []);

  return (
    <Box>
      <HeroSection
        backgroundImage="/src/assets/image_01.jpg"
        title="Vores ophold"
      />

      <BlueInfoSection title="Vi har ophold til enhver smag">
        <Typography
          sx={{
            fontSize: "1rem",
            lineHeight: 1.7,
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          Vores glampingophold er skabt til at tilbyde en kombination af eventyr
          og afslapning. Det er muligheden for at nyde naturen, mens du har den
          perfekte sted at genoplade batterierne i en naturnær idyl.
        </Typography>
        <br />
        <Typography
          sx={{
            fontSize: "1rem",
            lineHeight: 1.7,
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          Book dit ophold nu, og skab minder, der varer ved sammen med dine
          kære. Uanset om du søger eventyr, fordyber dig i naturen og myte lukus
          i det fri. Vi er fans og vil byde dig velkommen med kærlighed og
          passer rigtig godt på dig og din familie. Vi ses snart. Gitte,
          Michelle, Madeleine og Grev Hugo.
        </Typography>
      </BlueInfoSection>

      {/* Stays Section */}
      <Box
        sx={{
          pt: 24,
          pb: 12,
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Container maxWidth="xl">
            <Grid container spacing={4} justifyContent="center">
              {stays.map((stay) => (
                <Grid item xs={12} sm={6} md={4} key={stay._id}>
                  <StayCard stay={stay} />
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </Box>

      <Footer />
    </Box>
  );
};

export default Ophold;
