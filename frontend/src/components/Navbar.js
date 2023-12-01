import React,{useEffect,useState} from "react";
import { Box, Button, AppBar, Toolbar, Typography,styled } from "@mui/material";
import '../App.css';
import { NavLink } from "react-router-dom";

const Navbar = () => { 
    const userInfo =JSON.parse(window.localStorage.getItem("user"));
    console.log(userInfo);
  return (
    <AppBar position="fixed" elevation={1} style={navbarStyle}>
      <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BookMyEvent.NitA
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Home</Button>
          <Button color="inherit">{userInfo?.name}</Button>
          <Button variant="outlined" color="inherit">
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const navbarStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  backdropFilter: "blur(1px)",
  boxShadow: "0px 2px 10px rgba(30,30,30,0.4)",
  // background: rgba(255,255,255,0.4);
};

const StyledNavLink = styled(Typography)(({ theme }) => ({
    position: "relative",
    marginRight: theme.spacing(2),
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "2px",
      backgroundColor: theme.palette.primary.main,
      opacity: 0,
      transition: "opacity 0.3s",
    },
    "&.activeLink:after": {
      opacity: 1,
    },
  }));

export default Navbar;
