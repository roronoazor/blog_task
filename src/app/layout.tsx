import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { ReduxProvider } from "@/lib/redux_providers";
import ReactQueryProvider from "@/lib/react_query_provider";
import ResponsiveDrawer from "@/components/ResponsiveDrawer";
import Container from "@mui/material/Container";

export const metadata = {
  title: "Open Blog App",
  description: "Open Blog App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ReactQueryProvider>
            <ThemeRegistry>
              <Box sx={{ display: "flex" }}>
                <ResponsiveDrawer />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                  }}
                >
                  <Toolbar />
                  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    {children}
                  </Container>
                </Box>
              </Box>
            </ThemeRegistry>
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
