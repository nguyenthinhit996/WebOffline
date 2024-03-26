import InstallPWAInstruction from "./common/InstallPWAInstruction";

const steps = [
  {
    title: "In Safari, click the 'share' button",
    image: "/assets/img/ios-install-step1.png",
  },
  {
    title: "Click 'Add to Home Screen'",
    image: "/assets/img/ios-install-step2.png",
  },
  {
    title: "Review settings and click 'Add'",
    image: "/assets/img/ios-install-step3.png",
  },
  {
    title: "Launch app from home screen'",
    image: "/assets/img/ios-install-step4.png",
  },
];

const IOSInstallPWAInstruction = () => {
  return (
    <InstallPWAInstruction
      steps={steps}
      description={
        'If running this web app on iOS device, please ensure you are using 16.5 or later, have this PWA "installed". Thank you'
      }
    />
  );
};

export default IOSInstallPWAInstruction;
