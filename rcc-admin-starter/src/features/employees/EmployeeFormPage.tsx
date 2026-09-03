import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, Paper } from "@mui/material";
import { toast } from "react-toastify";

import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import FormTextField from "../../components/form/FormTextField";
import FormSelect, { type SelectOption } from "../../components/form/FormSelect";
import FormCheckbox from "../../components/form/FormCheckbox";

import { employeeFormSchema, employeeFormDefaultValues, type EmployeeFormSchema } from "./employees.schema";
import { createEmployee, fetchEmployeeById, updateEmployee } from "./employees.api";

const ROLE_OPTIONS: SelectOption[] = [
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "Staff", value: "staff" },
];

/**
 * One page handles both "add" and "edit" — same form, same schema, same
 * components. Only the submit handler and the initial data-fetch differ.
 * Copy this file's shape for any other feature's add/edit page.
 */
export default function EmployeeFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [loadingRecord, setLoadingRecord] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<EmployeeFormSchema>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: employeeFormDefaultValues,
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const employee = await fetchEmployeeById(id);
        reset({
          name: employee.name,
          email: employee.email,
          role: employee.role,
          isActive: employee.status === "active",
        });
      } finally {
        setLoadingRecord(false);
      }
    })();
  }, [id, reset]);

  const onSubmit = async (values: EmployeeFormSchema) => {
    setSubmitting(true);
    try {
      if (isEditMode && id) {
        await updateEmployee(id, values);
        toast.success("Employee updated");
      } else {
        await createEmployee(values);
        toast.success("Employee added");
      }
      navigate("/employees");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingRecord) return <Loader />;

  return (
    <div>
      <PageHeader
        title={isEditMode ? "Edit Employee" : "Add Employee"}
        subtitle={isEditMode ? "Update this employee's details." : "Create a new employee account."}
      />

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, maxWidth: 640 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2.5}>
            <Grid size={12}>
              <FormTextField name="name" control={control} label="Full Name" />
            </Grid>
            <Grid size={12}>
              <FormTextField name="email" control={control} label="Email Address" type="email" />
            </Grid>
            <Grid size={12}>
              <FormSelect name="role" control={control} label="Role" options={ROLE_OPTIONS} />
            </Grid>
            <Grid size={12}>
              <FormCheckbox name="isActive" control={control} label="Active" />
            </Grid>
            <Grid size={12} sx={{ display: "flex", gap: 1.5, justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={() => navigate("/employees")} disabled={submitting}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" loading={submitting} disabled={isEditMode && !isDirty}>
                {isEditMode ? "Save Changes" : "Add Employee"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
