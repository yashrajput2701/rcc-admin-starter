import { createTheme } from "@mui/material/styles";

// One theme file. Every reusable component below reads spacing/colors from
// `theme`, never from hardcoded hex codes or px values — so a rebrand is a
// one-file change instead of a grep-and-replace across 60 components.
const theme = createTheme({
  palette: {
    primary: { main: "#2F54EB" },
    secondary: { main: "#6B7280" },
    error: { main: "#D92D20" },
    warning: { main: "#B54708" },
    success: { main: "#027A48" },
    background: { default: "#F7F8FA" },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 600, whiteSpace: "nowrap" },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
  },
});

export default theme;
