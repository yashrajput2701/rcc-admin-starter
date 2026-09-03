import { Checkbox, FormControlLabel, FormHelperText, FormGroup } from "@mui/material";
import { useController, type Control, type FieldPath, type FieldValues } from "react-hook-form";

interface FormCheckboxProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  disabled?: boolean;
}

export default function FormCheckbox<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  disabled,
}: FormCheckboxProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox checked={Boolean(field.value)} onChange={field.onChange} onBlur={field.onBlur} disabled={disabled} />}
        label={label}
      />
      {error && <FormHelperText error>{error.message}</FormHelperText>}
    </FormGroup>
  );
}
