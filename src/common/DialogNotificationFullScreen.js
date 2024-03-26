"use client";

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import { ModalContext } from "@/context/ModalContext";
import { useContext } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Stack } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import Popover from "@mui/material/Popover";
import { useRouter } from "next/navigation";
import { useIsOnline } from "react-use-is-online";
import { TASKS_ID_VISITED } from "@/util/Utils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const { setOpen, open, notifications, handleViewMessage, setOpenWarning } =
    useContext(ModalContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isFilterd, setIsFilterd] = React.useState(false);
  const [openFilter, setFilter] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const router = useRouter();
  const { isOffline } = useIsOnline();

  const handleClickFilter = (event) => {
    setFilter(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setFilter(false);
    setAnchorEl(null);
  };

  const handleClickDetail = (id) => {
    let tasksId = localStorage.getItem(TASKS_ID_VISITED) || [];
    tasksId = !Array.isArray(tasksId) ? JSON.parse(tasksId) : tasksId;
    const isCurrentIdVisited = tasksId.includes(id);
    if (isOffline && !isCurrentIdVisited) {
      setOpenWarning(true);
      return;
    }
    handleViewMessage(id);
    router.push(`/detail`);
  };

  React.useEffect(() => {
    const filteredNotifications = isFilterd
      ? notifications.filter((item) => !item.isRead)
      : notifications;
    setMessages(filteredNotifications);
  }, [isFilterd, notifications, open]);

  return (
    <Box>
      <Popover
        open={openFilter}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List>
          <ListItemButton>
            <ListItemText primary="All" onClick={() => setIsFilterd(false)} />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText primary="UnRead" onClick={() => setIsFilterd(true)} />
          </ListItemButton>
        </List>
      </Popover>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
        direction="left"
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#F4721E",
            }}
          >
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
            >
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  setOpen(false);
                  setIsFilterd(false);
                }}
                aria-label="close"
              >
                <ChevronLeftIcon />
              </IconButton>
              <Typography variant="h6">Notifications</Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClickFilter}
                aria-label="close"
              >
                <FilterListIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
        {messages?.length > 0 ? (
          <List>
            {messages.map((msg) => (
              <ListItemButton
                onClick={() => handleClickDetail(msg.taskId)}
                sx={{
                  backgroundColor: msg.isRead ? "#fff" : "#fce2d2",
                  "&:hover": {
                    backgroundColor: msg.isRead ? "#fff" : "#fce2d2",
                  },
                }}
              >
                <ListItemText primary={msg.title} secondary={msg.text} />
              </ListItemButton>
            ))}
          </List>
        ) : (
          <Box>
            <ListItemText
              sx={{ p: 2, color: "InactiveCaptionText" }}
              primary="Nothing to show"
            />
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
