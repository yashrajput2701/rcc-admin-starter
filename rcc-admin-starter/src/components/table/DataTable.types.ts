import type { ReactNode } from "react";

/**
 * One column definition for <DataTable>.
 *
 * `T` is the row's data shape (e.g. `Employee`). Everything about how a
 * column looks and behaves is described here — the table component itself
 * never knows what an "Employee" or a "Manufacturer" is.
 */
export interface DataTableColumn<T> {
  /** Unique key for the column (also used as the React key). */
  key: string;
  /** Text shown in the header cell. */
  headerName: string;
  align?: "left" | "center" | "right";
  /** Fixed width, e.g. "120px" or "10%". */
  width?: string;
  /**
   * How to render the cell's value. If omitted, DataTable reads
   * `row[key as keyof T]` and prints it directly.
   */
  render?: (row: T, rowIndex: number) => ReactNode;
  /**
   * If set, long plain strings from `render`/`field` longer than this many
   * characters are truncated with a "…" and shown in full on hover.
   * Only applies when `render` returns a plain string (or is omitted).
   */
  truncateAt?: number;
  /** Hide this column without removing it from the array (e.g. by role/permission). */
  hidden?: boolean;
}

/** One entry in a row's actions menu/toolbar. */
export interface DataTableAction<T> {
  label: string;
  icon?: ReactNode;
  onClick: (row: T) => void;
  /** Return true to hide this action for a specific row. */
  hidden?: (row: T) => boolean;
  /** Return true to disable (but still show) this action for a specific row. */
  disabled?: (row: T) => boolean;
  /** Renders the label in the theme's error color — use for destructive actions. */
  destructive?: boolean;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  /** Returns a stable unique id for a row — used as the React key. */
  getRowId: (row: T) => string | number;
  loading?: boolean;
  emptyMessage?: string;

  /** Per-row actions, rendered as a kebab menu in a trailing "Action" column. */
  actions?: DataTableAction<T>[];

  onRowClick?: (row: T) => void;

  /** Pagination — omit all three to render the table without a pagination bar. */
  page?: number;
  limit?: number;
  total?: number;
  onPageChange?: (page: number) => void;
}
