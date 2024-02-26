// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import Container from '@mui/material/Container'
// import { useState } from "react";

import { Mail, Notifications, Pets } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";

import React, { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";

import axios from "axios";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../Service/redux/reducers/auth/authSlice";

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const NavBar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // auth.isLoggedIn, auth.token, auth.userId;

  const { userProfile } = useSelector((state) => state.users);

  const [open, setOpen] = useState(false);

  // Search Box
  const [allUsers, setAllUsers] = useState([]);
  const getAllUser = async () => {
    try {
      const user = await axios.get(`http://localhost:5000/users`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setAllUsers(user.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const [filter, setFilter] = useState(allUsers);
  const handleFilter = (event) => {
    const value = event.target.value;
    const filtered = allUsers.filter((allUsers) =>
      allUsers.user_name.includes(value)
    );
    setFilter(filtered);
  };


  // console.log(filter);


  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6">
          {/* <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}> */}
          <NavLink className={"Home"} to={"/home"}>
            MetaBook
          </NavLink>
        </Typography>
        {/* <Pets sx={{ display: { xs: "block", sm: "none" } }} /> */}
        <Stack spacing={2} sx={{ width: 400, bgcolor: "white" }}>
          <Autocomplete
            disableClearable
            options={allUsers.map((option) => option.user_name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Stack>
        {/* <Search>
          <InputBase onChange={handleFilter} placeholder="search..." />
        </Search> */}

        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={userProfile.image}
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar sx={{ width: 30, height: 30 }} src={userProfile.image} />
          <Typography variant="span">{userProfile.user_name}</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>
          <NavLink className={"userInfo"} to={`/profile`}>
            Profile
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink
            className={"userInfo"}
            onClick={() => {
              dispatch(setLogout());
            }}
            to="/login"
          >
            Logout
          </NavLink>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default NavBar;
