import { useState, type MouseEvent } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Loader from "../ui/Loader";
import EmptyState from "../ui/EmptyState";
import TruncatedText from "../ui/TruncatedText";
import TablePaginationBar from "./TablePaginationBar";
import type { DataTableAction, DataTableColumn, DataTableProps } from "./DataTable.types";

/**
 * <DataTable> — one table component for the entire app.
 *
 * Instead of writing a new `<XyzListing>` component per feature (as the old
 * codebase did ~40 times), a page defines a `columns` array describing WHAT
 * to show, and hands this component the `rows` to show it for. See
 * `src/features/employees/EmployeeListPage.tsx` for a full example.
 *
 * @example
 * <DataTable<Employee>
 *   columns={[
 *     { key: "name", headerName: "Employee Name", truncateAt: 20 },
 *     { key: "email", headerName: "Email", truncateAt: 25 },
 *     { key: "status", headerName: "Status", render: (row) => <StatusChip label={row.status} /> },
 *   ]}
 *   rows={employees}
 *   getRowId={(row) => row.id}
 *   actions={[{ label: "Edit", onClick: (row) => navigate(`/employees/${row.id}`) }]}
 *   page={page} limit={limit} total={total} onPageChange={setPage}
 * />
 */
export default function DataTable<T>({
  columns,
  rows,
  getRowId,
  loading = false,
  emptyMessage,
  actions,
  onRowClick,
  page,
  limit,
  total,
  onPageChange,
}: DataTableProps<T>) {
  const visibleColumns = columns.filter((c) => !c.hidden);
  const hasPagination = page !== undefined && limit !== undefined && total !== undefined && onPageChange;

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {visibleColumns.map((col) => (
                <TableCell key={col.key} align={col.align ?? "left"} sx={{ width: col.width }}>
                  {col.headerName}
                </TableCell>
              ))}
              {actions && actions.length > 0 && (
                <TableCell align="center" sx={{ width: 72 }}>
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + (actions ? 1 : 0)}>
                  <Loader />
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + (actions ? 1 : 0)}>
                  <EmptyState message={emptyMessage} />
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, rowIndex) => (
                <TableRow
                  key={getRowId(row)}
                  hover={Boolean(onRowClick)}
                  onClick={() => onRowClick?.(row)}
                  sx={{ cursor: onRowClick ? "pointer" : "default" }}
                >
                  {visibleColumns.map((col) => (
                    <TableCell key={col.key} align={col.align ?? "left"}>
                      {renderCell(col, row, rowIndex)}
                    </TableCell>
                  ))}
                  {actions && actions.length > 0 && (
                    <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                      <RowActionsMenu row={row} actions={actions} />
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {hasPagination && (
        <TablePaginationBar page={page} limit={limit} total={total} onPageChange={onPageChange} />
      )}
    </Paper>
  );
}

function renderCell<T>(column: DataTableColumn<T>, row: T, rowIndex: number) {
  if (column.render) return column.render(row, rowIndex);

  const rawValue = (row as Record<string, unknown>)[column.key];
  const value = rawValue === null || rawValue === undefined || rawValue === "" ? "-" : String(rawValue);

  if (column.truncateAt && value !== "-") {
    return <TruncatedText text={value} maxLength={column.truncateAt} />;
  }
  return value;
}

function RowActionsMenu<T>({ row, actions }: { row: T; actions: DataTableAction<T>[] }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const visibleActions = actions.filter((action) => !action.hidden?.(row));
  if (visibleActions.length === 0) return null;

  const handleOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {visibleActions.map((action) => (
          <MenuItem
            key={action.label}
            disabled={action.disabled?.(row)}
            onClick={() => {
              handleClose();
              action.onClick(row);
            }}
            sx={action.destructive ? { color: "error.main" } : undefined}
          >
            {action.icon && <ListItemIcon sx={action.destructive ? { color: "error.main" } : undefined}>{action.icon}</ListItemIcon>}
            <ListItemText>{action.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
