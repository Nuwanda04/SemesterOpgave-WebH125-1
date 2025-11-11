import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;
const navItems = [
  { name: "Forside", path: "/" },
  { name: "Ophold", path: "/ophold" },
  { name: "Kontakt", path: "/kontakt" },
  { name: "Aktiviteter", path: "/aktiviteter" },
  { name: "Profil", path: "/profil" },
];

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        backgroundColor: (theme) => theme.palette.secondary.main,
        position: "relative",
      }}
    >
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "white",
          zIndex: 1,
        }}
      >
        <CloseIcon sx={{ fontSize: 32 }} />
      </IconButton>
      <List sx={{ pt: 8, px: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                textAlign: "center",
                py: 2,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <ListItemText
                primary={item.name}
                sx={{
                  "& .MuiTypography-root": {
                    fontWeight: 400,
                    color: "white",
                    fontSize: "1.1rem",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* Flydende burgerknap til mobil */}
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          display: { xs: "flex", sm: "none" },
          position: "fixed",
          top: "26px",
          right: "26px",
          zIndex: 1300,
          backgroundColor: (theme) => theme.palette.secondary.main,
          borderRadius: "25px 0 25px 0",
          width: "64px",
          height: "52px",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: "#7a9489",
          },
        }}
      >
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          display: { xs: "none", sm: "block" },
        }}
      >
        <Toolbar>
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexGrow: { xs: 1, sm: 0 },
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Box
              component="img"
              src="/src/assets/logo.png"
              alt="Logo"
              sx={{
                width: 45,
                height: 45,
              }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 400,
                fontSize: "1.5rem",
                display: { xs: "none", sm: "block" },
              }}
            >
              Gittes Glamping
            </Typography>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 1,
              ml: "auto",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                sx={{
                  color: "#fff",
                  fontWeight: 400,
                  fontSize: "1rem",
                  textTransform: "none",
                  px: 2,
                  borderRadius: "20px",
                  backgroundColor:
                    location.pathname === item.path
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: (theme) => theme.palette.secondary.main,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ width: "100%", pt: { xs: 0, sm: "64px" } }}>
        {/* Indhold vises her af React Router */}
      </Box>
    </Box>
  );
};

export default Navigation;
