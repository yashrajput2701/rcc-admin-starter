import { Button as MuiButton, CircularProgress, type ButtonProps as MuiButtonProps } from "@mui/material";
import type { ReactNode } from "react";

interface ButtonProps extends Omit<MuiButtonProps, "color"> {
  loading?: boolean;
  /** Adds an error-colored, filled destructive style regardless of `variant`. */
  destructive?: boolean;
  color?: MuiButtonProps["color"];
  children: ReactNode;
}

/**
 * Thin wrapper around MUI's Button that standardizes two things every admin
 * panel needs on nearly every button: a loading spinner, and a one-word way
 * to say "this is a destructive action" instead of remembering `color="error"`
 * every time.
 *
 * Covers what used to be 4 separate components (contained-button,
 * outlined-button, removeButton, buttonAndIcon) — the variant/color/icon
 * props already do that job, so a single component is enough.
 */
export default function Button({
  loading = false,
  destructive = false,
  disabled,
  startIcon,
  children,
  color,
  ...rest
}: ButtonProps) {
  return (
    <MuiButton
      color={destructive ? "error" : color}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      {...rest}
    >
      {children}
    </MuiButton>
  );
}
