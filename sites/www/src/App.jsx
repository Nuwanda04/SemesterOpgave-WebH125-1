import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import Navigation from "./components/Navigation";
import Forside from "./pages/Forside";
import Ophold from "./pages/Ophold";
import Aktiviteter from "./pages/Aktiviteter";
import Kontakt from "./pages/Kontakt";
import Profile from "./pages/Profile";
import Tak from "./pages/Tak";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5a8a8f", // Primary blue
      dark: "#33626C", // Dark teal
    },
    secondary: {
      main: "#8fa9a3", // Sage green
    },
    background: {
      default: "#e8e5dc", // Beige background
      paper: "#ffffff",
    },
    warning: {
      main: "#c9b896", // Tan/gold (using warning slot for tan color)
    },
  },
  typography: {
    fontFamily: '"Nanum Gothic", sans-serif',
    h1: {
      fontFamily: '"Zen Loop", cursive',
      fontWeight: 400,
    },
    h2: {
      fontFamily: '"Zen Loop", cursive',
      fontWeight: 400,
    },
    h3: {
      fontFamily: '"Zen Loop", cursive',
      fontWeight: 400,
    },
    h4: {
      fontFamily: '"Zen Loop", cursive',
      fontWeight: 400,
    },
    h5: {
      fontFamily: '"Zen Loop", cursive',
      fontWeight: 400,
    },
    h6: {
      fontFamily: '"Zen Loop", cursive',
      fontWeight: 400,
    },
    button: {
      fontFamily: '"Nanum Gothic", sans-serif',
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 0, // Set default to 0 so our custom class works
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Nanum Gothic", sans-serif',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Forside />} />
          <Route path="/ophold" element={<Ophold />} />
          <Route path="/aktiviteter" element={<Aktiviteter />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/tak" element={<Tak />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        toastStyle={{
          borderRadius: "18px",
          backgroundColor: "#2c4f54",
          color: "#ffffff",
          fontFamily: '"Nanum Gothic", sans-serif',
        }}
      />
    </ThemeProvider>
  );
}

export default App;
