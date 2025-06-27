"use client";
import "@aws-amplify/ui-react/styles.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Amplify } from "aws-amplify";
import awsExports from "@/aws-exports";

Amplify.configure(awsExports);          // inicializa Auth en el cliente

const theme = createTheme({
  palette: { mode: "light", primary: { main: "#1976d2" } }
});

export default function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
