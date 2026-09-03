import { Box, CircularProgress, type SxProps, type Theme } from "@mui/material";

interface LoaderProps {
  size?: number;
  fullHeight?: boolean;
  sx?: SxProps<Theme>;
}

export default function Loader({ size = 32, fullHeight = true, sx }: LoaderProps) {
  return (
    <Box
      sx={[
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: fullHeight ? 240 : "auto",
          width: "100%",
        },
        ...(sx ? (Array.isArray(sx) ? sx : [sx]) : []),
      ]}
    >
      <CircularProgress size={size} />
    </Box>
  );
}
