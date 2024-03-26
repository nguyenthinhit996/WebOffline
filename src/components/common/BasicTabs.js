"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import CustomTabPanel from "./CustomTabPanel";
import { Button, Link } from "@mui/material";
import CustomListItem from "./CustomListItem";

export default function BasicTabs({
  id,
  anchorEl,
  handleClose,
  open,
  notifications,
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const unReadNotifications = notifications?.filter((msg) => !msg.isRead);

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box id="main">
        <Box
          id="heading"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "1.5rem",
            padding: "0 1rem",
          }}
        >
          <Typography variant="h6" component="h6">
            Notifications
          </Typography>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab sx={{ paddingLeft: 0 }} label="All" {...a11yProps(0)} />
            <Tab sx={{ paddingLeft: 0 }} label="Unread" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <CustomListItem notifications={notifications} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <CustomListItem notifications={unReadNotifications} />
        </CustomTabPanel>
      </Box>
    </Popover>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
