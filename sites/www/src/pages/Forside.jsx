import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Forside = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3042/reviews");
        const result = await response.json();

        if (result.status === "ok" && result.data) {
          setReviews(result.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#e8e5dc" }}>
      {/* Hero-billedsektion */}
      <Box
        sx={{
          position: "relative",
          height: "120vh",
          backgroundImage: "url(/src/assets/image_00.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: 0.78,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          },
        }}
      >
        {/* Logo og titel */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            mb: 4,
          }}
        >
          <Box
            component="img"
            src="/src/assets/logo.png"
            alt="Gittes Glamping Logo"
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              p: 2,
              mb: 2,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: 400,
              fontSize: { xs: "3rem", sm: "4rem" },
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Gittes
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: 400,
              fontSize: { xs: "3rem", sm: "4rem" },
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Glamping
          </Typography>
        </Box>

        {/* "Book nu"-knap */}
        <Button
          variant="outlined"
          className="curved-border"
          sx={{
            position: "relative",
            zIndex: 2,
            color: "white",
            borderColor: "white",
            borderWidth: 2,
            px: 6,
            py: 1.5,
            fontSize: "1.2rem",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            "&:hover": {
              borderColor: "white",
              borderWidth: 2,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          BOOK NU
        </Button>
      </Box>

      {/* Blå velkomstsektion */}
      <Box
        className="curved-border"
        sx={{
          position: "relative",
          backgroundColor: (theme) => theme.palette.primary.main,
          color: "white",
          py: 8,
          px: 4,
          textAlign: "center",
          zIndex: 2,
          marginTop: "-20vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 400,
            fontSize: "64px",
            mb: 4,
          }}
        >
          Kom og prøv
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 400,
            fontSize: { xs: "2.5rem", sm: "3.5rem" },
            mb: 4,
          }}
        >
          glamping hos Gitte!
        </Typography>

        <Container maxWidth="md" sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: "1rem",
              lineHeight: 1.7,
              mb: 4,
              fontWeight: 400,
            }}
          >
            Vi er stolte af at byde dig velkommen til Gitte's Glamping, hvor
            hjertevarme og omsorg møder naturens skønhed og eventyr. Vores lille
            team, anført af Gitte selv, er her for at skabe den perfekte ramme
            om din ferie, uanset om du besøger os som par, familie eller
            soloeventurer. Vi tilbyder et bred vifte af aktiviteter og
            arrangementer, der passer til alle aldre og interesser. Udforsk
            naturen, slap af ved bållet, del historier med nye venner, eller
            find indre ro med vores wellnessaktiviteter.
          </Typography>
        </Container>

        <Box
          component="img"
          src="/src/assets/gitte.jpg"
          alt="Gitte"
          sx={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            objectFit: "cover",
            mb: 4,
          }}
        />

        <Button
          variant="text"
          className="curved-border"
          sx={{
            color: "white",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            paddingTop: "43px",
            paddingBottom: "43px",
            paddingLeft: "17px",
            paddingRight: "17px",
            fontSize: "1.1rem",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            },
          }}
        >
          SE VORES OPHOLD
        </Button>
      </Box>

      {/* Guest Reviews Section */}
      <Box
        sx={{
          py: 8,
          px: 3,
        }}
      >
        <Box
          className="curved-border"
          sx={{
            backgroundColor: (theme) => theme.palette.warning.main,
            paddingTop: "43px",
            paddingBottom: "43px",
            paddingLeft: "17px",
            paddingRight: "17px",
            mb: 6,
            mx: "auto",
            maxWidth: { xs: "300px", sm: "400px" },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: 400,
              fontSize: "2.5rem",
              textAlign: "center",
              whiteSpace: { xs: "normal", sm: "nowrap" },
            }}
          >
            Vores gæster udtaler
          </Typography>
        </Box>

        <Grid
          container
          spacing={"28px"}
          sx={{
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          {loading ? (
            <Grid size={12}>
              <LoadingSpinner color={(theme) => theme.palette.secondary.main} />
            </Grid>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <Grid key={review._id} size={{ xs: 12, sm: 6 }}>
                <Paper
                  elevation={0}
                  className="curved-border"
                  sx={{
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    color: "white",
                    paddingTop: "43px",
                    paddingBottom: "43px",
                    paddingLeft: "17px",
                    paddingRight: "17px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 400,
                      fontSize: "32px",
                      mb: 0.5,
                      textAlign: "center",
                    }}
                  >
                    {review.name}, {review.age} år
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 400,
                      fontSize: "32px",
                      mb: 2,
                      textAlign: "center",
                    }}
                  >
                    {review.stay}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "15px",
                      lineHeight: 1.6,
                      textAlign: "center",
                    }}
                  >
                    {review.review}
                  </Typography>
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid size={12}>
              <Typography
                sx={{
                  textAlign: "center",
                  color: (theme) => theme.palette.secondary.main,
                }}
              >
                Ingen anmeldelser tilgængelige
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Sidefod */}
      <Box
        sx={{
          backgroundColor: "#2c4f54",
          color: "white",
          py: 6,
          px: 3,
          textAlign: "center",
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          <IconButton
            sx={{
              backgroundColor: "white",
              color: "#2c4f54",
              width: 60,
              height: 60,
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <FacebookIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "white",
              color: "#2c4f54",
              width: 60,
              height: 60,
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <InstagramIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Stack>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Box
            component="img"
            src="/src/assets/logo.png"
            alt="Logo"
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              p: 1,
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              fontSize: "1.8rem",
            }}
          >
            Gittes Glamping
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Forside;
