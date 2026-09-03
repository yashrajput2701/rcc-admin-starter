import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";

import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import StatusChip from "../../components/ui/StatusChip";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import DataTable from "../../components/table/DataTable";
import type { DataTableColumn } from "../../components/table/DataTable.types";

import useEmployeeList from "./useEmployeeList";
import type { Employee } from "./employees.types";

export default function EmployeeListPage() {
  const navigate = useNavigate();
  const {
    rows,
    total,
    page,
    limit,
    loading,
    setPage,
    pendingDeleteId,
    setPendingDeleteId,
    deleting,
    handleConfirmDelete,
  } = useEmployeeList();

  // This is the only place that describes what an "employee row" looks like.
  // Swap this array out per feature — DataTable itself never changes.
  const columns: DataTableColumn<Employee>[] = [
    { key: "name", headerName: "Employee Name", truncateAt: 22 },
    { key: "email", headerName: "Email", truncateAt: 28 },
    { key: "role", headerName: "Role" },
    {
      key: "joinedOn",
      headerName: "Added On",
      render: (row) => new Date(row.joinedOn).toLocaleDateString(),
    },
    {
      key: "status",
      headerName: "Status",
      align: "center",
      render: (row) => <StatusChip label={row.status} />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Employee Management"
        subtitle="View, add, and manage employee accounts."
        actions={
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/employees/new")}>
            Add Employee
          </Button>
        }
      />

      <DataTable<Employee>
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        loading={loading}
        emptyMessage="No employees added yet"
        page={page}
        limit={limit}
        total={total}
        onPageChange={setPage}
        actions={[
          {
            label: "Edit",
            icon: <EditOutlinedIcon fontSize="small" />,
            onClick: (row) => navigate(`/employees/${row.id}`),
          },
          {
            label: "Delete",
            icon: <DeleteOutlineIcon fontSize="small" />,
            destructive: true,
            onClick: (row) => setPendingDeleteId(row.id),
          },
        ]}
      />

      <ConfirmDialog
        open={Boolean(pendingDeleteId)}
        title="Remove this employee?"
        description="This action cannot be undone."
        confirmLabel="Remove"
        destructive
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
