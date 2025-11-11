import { Box, Button, CardMedia, Typography } from "@mui/material";

const StayCard = ({ stay, onReadMore }) => {
  return (
    <Box
      sx={{
        position: "relative",
        paddingBottom: "140px",
      }}
    >
      {/* Billede */}
      <Box
        sx={{
          position: "relative",
          width: "388px",
          height: "314px",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={stay.image || "/src/assets/image_00.jpg"}
          alt={stay.title}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Sandfarvet boks med opholdsinfo */}
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
            fontSize: { xs: "32px", sm: "48px", md: "50px" },
            lineHeight: "100%",
            mb: 0.5,
            color: "white",
          }}
        >
          {stay.title}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 400,
            fontSize: { xs: "18px", sm: "28px", md: "36px" },
            lineHeight: "100%",
            mb: 0.3,
            color: "white",
          }}
        >
          {stay.numberOfPersons} personer
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 400,
            fontSize: { xs: "18px", sm: "28px", md: "36px" },
            lineHeight: "100%",
            color: "white",
          }}
        >
          fra {stay.price},-
        </Typography>
      </Box>

      {/* Salviegrøn knap */}
      <Box
        sx={{
          position: "absolute",
          top: "262px",
          left: "62px",
          zIndex: 3,
        }}
      >
        <Button
          className="curved-border"
          variant="contained"
          onClick={() => onReadMore && onReadMore(stay)}
          sx={{
            backgroundColor: (theme) => theme.palette.secondary.main,
            color: "white",
            width: "265px",
            height: "103px",
            paddingTop: "43px",
            paddingBottom: "43px",
            paddingLeft: "17px",
            paddingRight: "17px",
            fontSize: "1.2rem",
            fontWeight: 400,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#7a9489",
            },
          }}
        >
          Læs mere
        </Button>
      </Box>
    </Box>
  );
};

export default StayCard;
