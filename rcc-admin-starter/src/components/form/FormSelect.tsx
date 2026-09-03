import { FormControl, FormHelperText, InputLabel, MenuItem, Select, type SelectProps } from "@mui/material";
import { useController, type Control, type FieldPath, type FieldValues } from "react-hook-form";

export interface SelectOption {
  label: string;
  value: string | number;
}

interface FormSelectProps<TFieldValues extends FieldValues>
  extends Omit<SelectProps, "name" | "error" | "defaultValue"> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  options: SelectOption[];
}

export default function FormSelect<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  options,
  ...rest
}: FormSelectProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormControl fullWidth error={Boolean(error)}>
      <InputLabel>{label}</InputLabel>
      <Select {...field} value={field.value ?? ""} label={label} {...rest}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}
