import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

const ActivityCard = ({
  activity,
  onLike,
  isLiked,
  showAccordion = true,
  onRemove,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  const handleActionClick = () => {
    if (onRemove) {
      onRemove(activity._id);
    } else if (onLike) {
      onLike(activity);
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: "300px",
        position: "relative",
        zIndex: expanded ? 25 : 1,
        "&:hover": {
          zIndex: 25,
        },
      }}
    >
      <Box
        component={motion.div}
        transition={{ duration: 0.5, ease: "easeOut" }}
        sx={{
          position: "relative",
          width: "388px",
        }}
      >
        {/* Image */}
        <Box
          component={motion.div}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          sx={{
            position: "relative",
            width: "388px",
            height: "314px",
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={activity.image || "/src/assets/image_00.jpg"}
            alt={activity.title}
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Tan curved box with title */}
        <Box
          className="curved-border"
          sx={{
            backgroundColor: (theme) => theme.palette.warning.main,
            width: "347px",
            height: "182px",
            position: "absolute",
            top: "-100px",
            left: "21px",
            paddingTop: "14px",
            paddingBottom: "14px",
            paddingLeft: "45px",
            paddingRight: "45px",
            textAlign: "center",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              fontSize: { xs: "32px", sm: "48px", md: "64px" },
              lineHeight: "100%",
              mb: 0.5,
              color: "white",
            }}
          >
            {activity.title}
          </Typography>
        </Box>

        {/* Dark teal info container */}
        <Box
          className="curved-border"
          sx={{
            position: "absolute",
            top: "262px",
            left: "17px",
            zIndex: expanded ? 9999 : 3,
            backgroundColor: (theme) => theme.palette.primary.dark,
            width: "359px",
            padding: "27px 34px 20px 34px",
          }}
        >
          {/* Time and action button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: showAccordion ? 3 : 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "32px",
                  fontWeight: 400,
                  color: "white",
                  lineHeight: "100%",
                  mb: 2,
                }}
              >
                {activity.day}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "32px",
                  fontWeight: 400,
                  color: "white",
                  lineHeight: "100%",
                }}
              >
                kl. {activity.time}
              </Typography>
            </Box>
            <Box component={motion.div} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={handleActionClick}
                sx={{
                  color: "white",
                  padding: "8px",
                }}
              >
                {onRemove || isLiked ? (
                  <FavoriteIcon sx={{ fontSize: "2rem" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: "2rem" }} />
                )}
              </IconButton>
            </Box>
          </Box>

          {/* Accordion or description */}
          {showAccordion ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Accordion
                expanded={expanded}
                onChange={handleChange}
                sx={{
                  backgroundColor: "transparent",
                  width: "325px",
                  boxShadow: "none",
                  "&:before": {
                    display: "none",
                  },
                  "&.Mui-expanded": {
                    margin: 0,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon sx={{ color: "white", fontSize: "2rem" }} />
                  }
                  className="curved-border"
                  sx={{
                    minHeight: "63px",
                    height: "63px",
                    padding: "14px 45px",
                    backgroundColor: (theme) => theme.palette.primary.dark,
                    border: "1px solid #FFFFFF",
                    "& .MuiAccordionSummary-content": {
                      margin: 0,
                      justifyContent: "center",
                      "&.Mui-expanded": {
                        margin: 0,
                      },
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: "32px",
                      fontWeight: 400,
                      color: "white",
                      textAlign: "center",
                      lineHeight: "100%",
                    }}
                  >
                    {expanded ? "Læs mindre" : "Læs mere"}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.dark,
                    padding: "20px 27px",
                    border: "1px solid #FFFFFF",
                    borderTop: "none",
                    borderRadius: "0 0 50px 0",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: 400,
                      color: "white",
                      lineHeight: "100%",
                      textAlign: "center",
                    }}
                  >
                    {activity.description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          ) : (
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 400,
                color: "white",
                lineHeight: "100%",
                textAlign: "center",
                mt: 2,
              }}
            >
              {activity.description}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ActivityCard;
