import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
import InstallPWAInstruction from "./common/InstallPWAInstruction";

const steps = [
  {
    title: "In Chrome, click the 'more' button",
    image: "/assets/img/android-install-step1.png",
  },
  {
    title: "Click 'Install app'",
    image: "/assets/img/android-install-step2.png",
  },
  {
    title: "Review settings and click 'Install'",
    image: "/assets/img/android-install-step3.png",
  },
  {
    title: "Launch app from home screen'",
    image: "/assets/img/android-install-step4.png",
  },
];

const AndroidInstallPWAInstruction = () => {
  return (
    <InstallPWAInstruction
      steps={steps}
      description={
        "If running this web app on phone device, please download Progressive Web App to continue. Thank you"
      }
    />
  );
};

export default AndroidInstallPWAInstruction;
