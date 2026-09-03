import { Box, Button, Pagination, Typography } from "@mui/material";

interface TablePaginationBarProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

/**
 * Standalone pagination bar. Pulled out of DataTable so it can also be reused
 * anywhere you paginate something that ISN'T a table (e.g. a card grid).
 */
export default function TablePaginationBar({
  page,
  limit,
  total,
  onPageChange,
}: TablePaginationBarProps) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const startEntry = total === 0 ? 0 : (page - 1) * limit + 1;
  const endEntry = Math.min(page * limit, total);

  if (total === 0) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        px: 1,
        py: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Showing {startEntry} to {endEntry} of {total} entries
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          size="small"
          variant="outlined"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <Pagination
          page={page}
          count={totalPages}
          shape="rounded"
          variant="outlined"
          onChange={(_, value) => onPageChange(value)}
        />
        <Button
          size="small"
          variant="outlined"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
