import { Box, Typography } from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = "No records found" }: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        py: 6,
        color: "text.secondary",
      }}
    >
      <InboxOutlinedIcon fontSize="large" color="disabled" />
      <Typography variant="body2">{message}</Typography>
    </Box>
  );
}
