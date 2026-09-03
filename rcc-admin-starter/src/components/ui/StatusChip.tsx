import { Chip, type ChipProps } from "@mui/material";

type StatusColor = "success" | "warning" | "error" | "default" | "info";

interface StatusChipProps {
  label: string;
  /** Map raw status values (e.g. "active", "blocked") to a chip color. */
  colorMap?: Record<string, StatusColor>;
  size?: ChipProps["size"];
}

const DEFAULT_COLOR_MAP: Record<string, StatusColor> = {
  active: "success",
  approved: "success",
  enabled: "success",
  pending: "warning",
  blocked: "error",
  rejected: "error",
  disabled: "error",
  inactive: "default",
};

/**
 * One chip component for every "status" column across every table, instead
 * of each page hand-rolling its own `statusClassMap` + CSS classes.
 */
export default function StatusChip({
  label,
  colorMap = DEFAULT_COLOR_MAP,
  size = "small",
}: StatusChipProps) {
  const color = colorMap[label.toLowerCase()] ?? "default";
  return (
    <Chip
      label={label}
      color={color}
      size={size}
      variant={color === "default" ? "outlined" : "filled"}
      sx={{ textTransform: "capitalize", fontWeight: 600 }}
    />
  );
}
