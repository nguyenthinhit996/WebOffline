import ThemeRegistry from "@/theme/ThemeRegistry";
import ServiceWorkerRegister from "@/context/ServiceWorkerRegister";
import { AuthProvider } from "@/context/AuthContext";
import { StepActionProvider } from "@/context/StepContext";

import "@/app/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ModalProvider } from "@/context/ModalContext";
import { DeviceInfoProvider } from "@/context/DeviceInfoContext";

export const metadata = {
  title: "Delivery App",
  description: "Generated by create next app",
  manifest: "/manifest.json",
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <ServiceWorkerRegister>
          <StepActionProvider>
            <DeviceInfoProvider>
              <ModalProvider>
                <AuthProvider>
                  <body>{children}</body>
                </AuthProvider>
              </ModalProvider>
            </DeviceInfoProvider>
          </StepActionProvider>
        </ServiceWorkerRegister>
      </ThemeRegistry>
    </html>
  );
}
