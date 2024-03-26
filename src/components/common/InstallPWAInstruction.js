import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
const InstallPWAInstruction = (props) => {
  const { steps = [], description } = props;
  return (
    <Box
      sx={{
        p: { xs: "1rem", sm: "2rem" },
      }}
    >
      <Box
        sx={{
          py: { xs: "1rem", sm: "2rem" },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: "1.75rem",
            fontWeight: "700",
            marginBottom: "1rem",
          }}
        >
          How to download Progressive Web App
        </Typography>
        <p>{description}</p>
      </Box>
      <Grid container spacing={2}>
        {steps.map((step, index) => {
          return (
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    Step {index + 1}: {step.title}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  height={"400px"}
                  image={step.image}
                  alt={step.title}
                  style={{ objectFit: "contain" }}
                />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default InstallPWAInstruction;
