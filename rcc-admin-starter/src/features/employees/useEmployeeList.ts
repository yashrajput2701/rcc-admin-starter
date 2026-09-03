import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteEmployee, fetchEmployees } from "./employees.api";
import type { Employee } from "./employees.types";

const PAGE_SIZE = 10;

/**
 * Holds everything the employee list page needs: fetching, pagination,
 * delete-with-confirmation. Any new "XyzListPage" copies this shape and
 * swaps in its own API functions/types.
 */
export default function useEmployeeList() {
  const [rows, setRows] = useState<Employee[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  // Bumping this forces the effect below to refetch (e.g. after a delete)
  // without adding `loadEmployees`'s result to a dependency array.
  const [refreshTick, setRefreshTick] = useState(0);

  // Fetching data that a component depends on to render IS synchronizing
  // with an external system, so this belongs in an effect — but we guard it
  // with `cancelled` so a fast page change can't let a stale, slow response
  // overwrite newer data ("race condition" protection).
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const result = await fetchEmployees({ page, limit: PAGE_SIZE });
        if (cancelled) return;
        setRows(result.items);
        setTotal(result.total);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [page, refreshTick]);

  const refresh = useCallback(() => setRefreshTick((tick) => tick + 1), []);

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;
    setDeleting(true);
    try {
      await deleteEmployee(pendingDeleteId);
      toast.success("Employee removed");
      setPendingDeleteId(null);
      refresh();
    } finally {
      setDeleting(false);
    }
  };

  return {
    rows,
    total,
    page,
    limit: PAGE_SIZE,
    loading,
    setPage,
    pendingDeleteId,
    setPendingDeleteId,
    deleting,
    handleConfirmDelete,
  };
}

