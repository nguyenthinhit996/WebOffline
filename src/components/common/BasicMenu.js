import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

const BasicMenu = ({ anchorEl, handleClose, open, menuItems }) => {
  return (
    <Box id="notification-modal">
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuItems.map((item) => (
          <MenuItem onClick={handleClose}>{item.label}</MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default BasicMenu;
