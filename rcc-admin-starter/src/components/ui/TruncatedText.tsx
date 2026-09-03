import { Tooltip, Typography } from "@mui/material";

interface TruncatedTextProps {
  text: string;
  maxLength: number;
}

/**
 * Shows `text` as-is if it fits, otherwise truncates it and wraps it in a
 * Tooltip that reveals the full value on hover.
 *
 * This exact pattern was copy-pasted into nearly every table cell in the old
 * codebase (name, email, batch id, etc). It now lives in one place.
 */
export default function TruncatedText({ text, maxLength }: TruncatedTextProps) {
  if (!text) return <>-</>;
  if (text.length <= maxLength) return <>{text}</>;

  const shortened = `${text.slice(0, maxLength)}…`;

  return (
    <Tooltip arrow title={text}>
      <Typography component="span" variant="body2" noWrap>
        {shortened}
      </Typography>
    </Tooltip>
  );
}
