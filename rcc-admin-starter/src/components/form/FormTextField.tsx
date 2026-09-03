import { TextField, type TextFieldProps } from "@mui/material";
import { useController, type Control, type FieldPath, type FieldValues } from "react-hook-form";

interface FormTextFieldProps<TFieldValues extends FieldValues>
  extends Omit<TextFieldProps, "name" | "error" | "helperText" | "defaultValue"> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
}

/**
 * Every text/number/password input on a form is this one component. It
 * wires react-hook-form's `useController` to an MUI `<TextField>` so the
 * form's zod schema is the single source of truth for validation — no
 * `useField`/`meta.touched` bookkeeping like the old Formik-based inputs.
 */
export default function FormTextField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  ...rest
}: FormTextFieldProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <TextField
      {...field}
      value={field.value ?? ""}
      label={label}
      fullWidth
      error={Boolean(error)}
      helperText={error?.message}
      {...rest}
    />
  );
}
