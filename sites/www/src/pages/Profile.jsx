import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ActivityCard from "../components/ActivityCard";
import BlueInfoSection from "../components/BlueInfoSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Login-tilstand
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  // Favorit-tilstand
  const [likedActivities, setLikedActivities] = useState([]);

  // Admin-tilstand
  const [activities, setActivities] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [currentActivity, setCurrentActivity] = useState({
    id: "",
    title: "",
    date: "",
    time: "",
    description: "",
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Tjek om bruger er logget ind
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      setIsLoggedIn(true);
      const user = JSON.parse(userData);
      setIsAdmin(user.role === "admin");

      if (user.role === "admin") {
        fetchActivities();
      }
    }

    // Hent gemte aktiviteter
    const savedLikes = localStorage.getItem("likedActivities");
    if (savedLikes) {
      setLikedActivities(JSON.parse(savedLikes));
    }
  }, []);

  const handleLoginChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3042/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.status === "ok" && data.data && data.data.token) {
        const token = data.data.token;
        localStorage.setItem("authToken", token);

        // Afkod JWT for at hente brugerdata (uden validering)
        const tokenParts = token.split(".");
        const payload = JSON.parse(atob(tokenParts[1]));
        localStorage.setItem("userData", JSON.stringify(payload));

        setIsLoggedIn(true);
        setIsAdmin(payload.role === "admin");

        if (payload.role === "admin") {
          fetchActivities();
        }
      } else {
        setLoginError("Forkert e-mail eller adgangskode");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Der opstod en fejl. Prøv igen senere.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCredentials({ email: "", password: "" });
  };

  const handleRemoveFavorite = (activityId) => {
    // Fjern aktivitet fra favoritter
    const removedActivity = likedActivities.find(
      (activity) => activity._id === activityId
    );
    const updatedLikes = likedActivities.filter(
      (item) => item._id !== activityId
    );
    setLikedActivities(updatedLikes);
    localStorage.setItem("likedActivities", JSON.stringify(updatedLikes));
    if (removedActivity) {
      toast.info(`${removedActivity.title} fjernet fra favoritter`);
    }
  };

  // Admin-funktioner
  const fetchActivities = async () => {
    try {
      const response = await fetch("http://localhost:3042/activities");
      const data = await response.json();
      const activitiesArray = data.activities || data.data || data;
      setActivities(Array.isArray(activitiesArray) ? activitiesArray : []);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setError("Kunne ikke hente aktiviteter");
    }
  };

  const handleOpenDialog = (mode, activity = null) => {
    setDialogMode(mode);
    if (mode === "update" && activity) {
      setCurrentActivity({
        id: activity._id,
        title: activity.title,
        date: activity.day,
        time: activity.time,
        description: activity.description,
        image: activity.image,
      });
    } else {
      setCurrentActivity({
        id: "",
        title: "",
        date: "",
        time: "",
        description: "",
        image: "",
      });
    }
    setSelectedFile(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError("");
    setSuccess("");
  };

  const handleInputChange = (e) => {
    setCurrentActivity({
      ...currentActivity,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    const token = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("title", currentActivity.title);
    formData.append("date", currentActivity.date);
    formData.append("time", currentActivity.time);
    formData.append("description", currentActivity.description);

    if (dialogMode === "update") {
      formData.append("id", currentActivity.id);
    }

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const url = "http://localhost:3042/activity";
      const method = dialogMode === "add" ? "POST" : "PUT";

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.status === "ok") {
        setSuccess(
          dialogMode === "add" ? "Aktivitet oprettet" : "Aktivitet opdateret"
        );
        fetchActivities();
        setTimeout(() => {
          handleCloseDialog();
        }, 1500);
      } else {
        setError("Der opstod en fejl. Prøv igen.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Der opstod en fejl. Prøv igen.");
    }
  };

  const handleDelete = async (activityId) => {
    if (!window.confirm("Er du sikker på, at du vil slette denne aktivitet?")) {
      return;
    }

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `http://localhost:3042/activity/${activityId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.status === "ok") {
        setSuccess("Aktivitet slettet");
        fetchActivities();
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } else {
        setError("Kunne ikke slette aktiviteten");
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      setError("Der opstod en fejl ved sletning");
    }
  };

  return (
    <Box>
      <HeroSection
        backgroundImage={
          isLoggedIn ? "/src/assets/image_05.jpg" : "/src/assets/image_01.jpg"
        }
        title={isLoggedIn ? "Min Profil" : "Log ind"}
      />

      <BlueInfoSection showTitle={false}>
        <Container maxWidth="md">
          {isLoggedIn ? (
            <Box sx={{ position: "relative" }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "2rem", sm: "2.5rem" },
                    color: "white",
                    mb: 1,
                  }}
                >
                  {isAdmin ? "Admin Panel" : "Gemte aktiviteter:"}
                </Typography>
                {!isAdmin && (
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: "3rem", sm: "4rem" },
                      color: "white",
                      fontWeight: 400,
                    }}
                  >
                    {likedActivities.length}
                  </Typography>
                )}
              </Box>
              <Button
                variant="contained"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: (theme) => theme.palette.primary.dark,
                  borderRadius: "20px",
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.warning.main,
                  },
                }}
              >
                Log ud
              </Button>
            </Box>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3.5rem" },
                  color: "white",
                }}
              >
                Velkommen
              </Typography>
            </Box>
          )}
        </Container>
      </BlueInfoSection>

      {/* Main Content Section */}
      <Box
        sx={{
          backgroundColor: "#e8e5dc",
          pt: !isLoggedIn || isAdmin ? 8 : 24,
          pb: 12,
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Container maxWidth="xl">
          {!isLoggedIn ? (
            // Loginformular
            <Container maxWidth="sm">
              <Box
                component="form"
                onSubmit={handleLogin}
                className="curved-border"
                sx={{
                  backgroundColor: "white",
                  padding: { xs: 4, sm: 6 },
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                {loginError && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: "20px" }}>
                    {loginError}
                  </Alert>
                )}

                <TextField
                  fullWidth
                  label="E-mail"
                  name="email"
                  type="email"
                  value={credentials.email}
                  onChange={handleLoginChange}
                  required
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Adgangskode"
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleLoginChange}
                  required
                  sx={{
                    mb: 4,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: "white",
                    borderRadius: "20px",
                    padding: "12px 0",
                    fontSize: "1.1rem",
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.primary.dark,
                    },
                    "&:disabled": {
                      backgroundColor: (theme) => theme.palette.warning.main,
                    },
                  }}
                >
                  {loading ? "Logger ind..." : "Log ind"}
                </Button>
              </Box>
            </Container>
          ) : (
            // Indhold for indloggede
            <>
              {/* Favoritsektion - kun for gæster */}
              {!isAdmin && (
                <>
                  {likedActivities.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 8 }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: { xs: "2rem", sm: "3rem" },
                          color: (theme) => theme.palette.primary.main,
                        }}
                      >
                        Du har ingen gemte aktiviteter endnu
                      </Typography>
                    </Box>
                  ) : (
                    <Grid container spacing={6} justifyContent="center">
                      {likedActivities.map((activity) => (
                        <Grid
                          size={{ xs: 12, sm: 6, md: 4 }}
                          key={activity._id}
                          sx={{
                            minWidth: "388px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <ActivityCard
                            activity={activity}
                            onRemove={handleRemoveFavorite}
                            showAccordion={true}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </>
              )}

              {/* Adminpanel - kun for admins */}
              {isAdmin && (
                <>
                  {error && (
                    <Alert
                      severity="error"
                      sx={{ mb: 3, borderRadius: "20px" }}
                    >
                      {error}
                    </Alert>
                  )}
                  {success && (
                    <Alert
                      severity="success"
                      sx={{ mb: 3, borderRadius: "20px" }}
                    >
                      {success}
                    </Alert>
                  )}

                  <Box
                    sx={{
                      mb: 3,
                      textAlign: { xs: "center", md: "right" },
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => handleOpenDialog("add")}
                      sx={{
                        backgroundColor: (theme) => theme.palette.primary.main,
                        borderRadius: "20px",
                        fontSize: { xs: "0.9rem", md: "1.1rem" },
                        padding: { xs: "8px 20px", md: "10px 30px" },
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.primary.dark,
                        },
                      }}
                    >
                      Tilføj ny aktivitet
                    </Button>
                  </Box>

                  <TableContainer
                    component={Paper}
                    sx={{
                      borderRadius: "20px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      overflowX: "auto",
                    }}
                  >
                    <Table sx={{ minWidth: { xs: 650, md: "auto" } }}>
                      <TableHead>
                        <TableRow
                          sx={{
                            backgroundColor: (theme) =>
                              theme.palette.primary.main,
                          }}
                        >
                          <TableCell
                            sx={{
                              fontSize: { xs: "0.9rem", md: "1.2rem" },
                              color: "white",
                              fontWeight: "bold",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Aktivitet
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: { xs: "0.9rem", md: "1.2rem" },
                              color: "white",
                              fontWeight: "bold",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Dato
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: { xs: "0.9rem", md: "1.2rem" },
                              color: "white",
                              fontWeight: "bold",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Tid
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              fontSize: { xs: "0.9rem", md: "1.2rem" },
                              color: "white",
                              fontWeight: "bold",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Handlinger
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {activities.map((activity) => (
                          <TableRow
                            key={activity._id}
                            sx={{
                              "&:hover": {
                                backgroundColor: "#f5f3ee",
                              },
                            }}
                          >
                            <TableCell
                              sx={{
                                fontSize: { xs: "0.85rem", md: "1rem" },
                                whiteSpace: "nowrap",
                              }}
                            >
                              {activity.title}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: { xs: "0.85rem", md: "1rem" },
                                whiteSpace: "nowrap",
                              }}
                            >
                              {activity.day}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: { xs: "0.85rem", md: "1rem" },
                                whiteSpace: "nowrap",
                              }}
                            >
                              {activity.time}
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                onClick={() =>
                                  handleOpenDialog("update", activity)
                                }
                                sx={{
                                  color: (theme) => theme.palette.primary.main,
                                  "&:hover": {
                                    backgroundColor: (theme) =>
                                      theme.palette.warning.main,
                                  },
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => handleDelete(activity._id)}
                                sx={{
                                  color: "#d32f2f",
                                  "&:hover": {
                                    backgroundColor: "#ffebee",
                                  },
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </>
          )}
        </Container>
      </Box>

      {/* Dialog til tilføjelse/opdatering */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            padding: 2,
          },
        }}
      >
        <DialogTitle
          component="h2"
          sx={{
            fontSize: "2rem",
            color: (theme) => theme.palette.primary.main,
          }}
        >
          {dialogMode === "add" ? "Tilføj aktivitet" : "Opdater aktivitet"}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: "10px" }}>
              {success}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Aktivitet"
            name="title"
            value={currentActivity.title}
            onChange={handleInputChange}
            required
            sx={{
              mb: 2,
              mt: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
              },
            }}
          />

          <TextField
            fullWidth
            label="Dato"
            name="date"
            placeholder="Fredage og lørdage"
            value={currentActivity.date}
            onChange={handleInputChange}
            required
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
              },
            }}
          />

          <TextField
            fullWidth
            label="Tid"
            name="time"
            placeholder="15.00-17.00"
            value={currentActivity.time}
            onChange={handleInputChange}
            required
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
              },
            }}
          />

          <TextField
            fullWidth
            label="Beskrivelse"
            name="description"
            multiline
            rows={4}
            value={currentActivity.description}
            onChange={handleInputChange}
            required
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
              },
            }}
          />

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              borderRadius: "15px",
              borderColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.main,
              padding: "12px",
              "&:hover": {
                borderColor: (theme) => theme.palette.primary.dark,
                backgroundColor: "#f5f3ee",
              },
            }}
          >
            Upload billede
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          {selectedFile && (
            <Typography
              sx={{
                mt: 1,
                fontSize: "0.9rem",
                color: (theme) => theme.palette.primary.main,
              }}
            >
              Valgt fil: {selectedFile.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ padding: 3 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              borderRadius: "15px",
              color: "#666",
            }}
          >
            Annuller
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              borderRadius: "15px",
              fontSize: "1.1rem",
              padding: "8px 30px",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.dark,
              },
            }}
          >
            {dialogMode === "add" ? "Opret" : "Opdater"}
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </Box>
  );
};

export default Profile;
