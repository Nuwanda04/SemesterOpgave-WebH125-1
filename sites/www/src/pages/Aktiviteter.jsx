import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ActivityCard from "../components/ActivityCard";
import BlueInfoSection from "../components/BlueInfoSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import LoadingSpinner from "../components/LoadingSpinner";

const Aktiviteter = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedActivities, setLikedActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("http://localhost:3042/activities");
        const data = await response.json();
        // Backend returnerer { activities: [...] } eller { data: [...] }
        const activitiesArray = data.activities || data.data || data;
        setActivities(Array.isArray(activitiesArray) ? activitiesArray : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setActivities([]);
        setLoading(false);
      }
    };

    fetchActivities();

    // Hent favoritter fra localStorage
    const savedLikes = localStorage.getItem("likedActivities");
    if (savedLikes) {
      setLikedActivities(JSON.parse(savedLikes));
    }
  }, []);

  const handleLike = (activity) => {
    const isLiked = likedActivities.some((item) => item._id === activity._id);
    let updatedLikes;

    if (isLiked) {
      // Fjern fra favoritter
      updatedLikes = likedActivities.filter(
        (item) => item._id !== activity._id
      );
      toast.info(`${activity.title} fjernet fra dine favoritter`);
    } else {
      // Tilføj til favoritter
      updatedLikes = [...likedActivities, activity];
      toast.success(`${activity.title} gemt under favoritter`);
    }

    setLikedActivities(updatedLikes);
    localStorage.setItem("likedActivities", JSON.stringify(updatedLikes));
  };

  return (
    <Box>
      <HeroSection
        backgroundImage="/src/assets/image_02.jpg"
        title="Aktiviteter"
      />

      <BlueInfoSection title="Ingen skal kede sig hos Gitte">
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem" },
              color: "white",
              lineHeight: 1.8,
            }}
          >
            Glamping er mere end bare at sove ude i naturen. Hos os tilbyder vi
            mange aktiviteter som f.eks. gratis yoga, vinsmagning, kanosejlads,
            naturvandring, bål-hygge med blandt andet marshmallows og meget
            mere. Du kan også nyde at gå en tur i naturen, hvor du kan læse om
            blomsterne og planterne i området. For de yngste gæster tilbyder vi
            også underholdning - alt sammen med målet at du har en dejlig
            oplevelse når du opholder dig hos Gittes Glamping! Klikke på
            aktiviteterne nedenfor for mere information.
          </Typography>
        </Box>
      </BlueInfoSection>

      {/* Activities Section */}
      <Box
        sx={{
          backgroundColor: "#e8e5dc",
          pt: 24,
          pb: 12,
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Container maxWidth="xl">
            <Grid container spacing={6} justifyContent="center">
              {activities.map((activity) => (
                <Grid
                  size={{ xs: 12, md: 4 }}
                  key={activity._id}
                  sx={{ minWidth: "388px" }}
                >
                  <ActivityCard
                    activity={activity}
                    onLike={handleLike}
                    isLiked={likedActivities.some(
                      (item) => item._id === activity._id
                    )}
                    showAccordion={true}
                  />
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

export default Aktiviteter;
