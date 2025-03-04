import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../hooks/useCustomer";
import { CUSTOMER_ID } from "../constants";

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { customer } = useCustomer(CUSTOMER_ID);

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          borderBottom: "4px solid #00A800",
        }}
      >
        <Toolbar sx={{ p: 0, gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src="/logo.svg"
              alt="Logo"
              sx={{ height: 25, mr: 1 }}
            />
            <Typography variant="h6" color="textPrimary">
              REZERVAČNÍ SYSTÉM
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleMenuOpen} sx={{ color: "black" }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem disableRipple>
          <Avatar
            sx={{ mr: 1 }}
          >{`${customer?.name[0]}${customer?.surname[0]}`}</Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {`${customer?.name} ${customer?.surname}`}
            </Typography>
            <Typography variant="body2">{customer?.email}</Typography>
          </Box>
        </MenuItem>
        <Divider sx={{ marginLeft: 2, marginRight: 2 }} />
        <MenuItem onClick={() => handleMenuItemClick("/reservations")}>
          Moje rezervace
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/personal-info")}>
          Osobní údaje
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Odhlásit se</MenuItem>
      </Menu>
    </>
  );
};

export default Header;
