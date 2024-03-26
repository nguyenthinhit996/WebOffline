import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BedgeStatus from "@/common/BadgeStatus";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";

const TaskListItem = ({ task, handleClick }) => {
  const router = useRouter();
  const { id, title, warehouse, status } = task;

  return (
    <IconButton
      sx={{ width: "100%" }}
      aria-label="arrow"
      onClick={() => handleClick(id)}
    >
      <Box
        container
        sx={{
          border: "2px solid #35C2C1",
          borderRadius: "1rem",
          mb: "1rem",
          py: "1rem",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box id="text-area" sx={{ pl: "1rem" }}>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            align="left"
            sx={{ fontWeight: "700" }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
            align="left"
          >
            {warehouse}
          </Typography>
        </Box>

        <Box id="btn" item sx={{ pr: "1rem" }}>
          <BedgeStatus status={status} />
        </Box>
      </Box>
    </IconButton>
  );
};

export default TaskListItem;
