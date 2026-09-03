// Shared, framework-level types. Feature-specific types live inside each
// feature folder (e.g. src/features/employees/employees.types.ts) — keep this
// file for shapes that are genuinely reused across features.

/** Standard shape we normalize every list/table API response into. */
export interface PaginatedResult<T> {
  items: T[];
  page: number; // 1-based current page
  limit: number; // rows per page
  total: number; // total row count on the server
}

/** Generic wrapper for a single-record API response. */
export interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data: T;
}

export type SortDirection = "asc" | "desc";

export interface SortState {
  field: string | null;
  direction: SortDirection;
}

/** Params every "list" endpoint accepts. Extend per-feature if you need more filters. */
export interface ListQueryParams {
  page: number;
  limit: number;
  search?: string;
  sortField?: string;
  sortDirection?: SortDirection;
}
