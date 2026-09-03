import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { store } from "./app/store";
import theme from "./theme/theme";
import AppRoutes from "./routes/AppRoutes";

/**
 * Composition root. Every cross-cutting provider (state, theming, date
 * localization, toasts, routing) lives here and only here — feature code
 * never wraps itself in another <ThemeProvider> or <Provider>.
 */
export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop />
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}
