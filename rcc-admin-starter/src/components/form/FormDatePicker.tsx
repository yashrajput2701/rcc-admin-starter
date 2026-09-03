import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { useController, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import dayjs from "dayjs";

interface FormDatePickerProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  disabled?: boolean;
  minDate?: dayjs.Dayjs;
  maxDate?: dayjs.Dayjs;
}

/**
 * Stores the field value as an ISO string (`YYYY-MM-DD`) in form state — the
 * form schema/API never has to deal with dayjs objects, only plain strings.
 */
export default function FormDatePicker<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  disabled,
  minDate,
  maxDate,
}: FormDatePickerProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <DatePicker
      label={label}
      disabled={disabled}
      minDate={minDate}
      maxDate={maxDate}
      value={field.value ? dayjs(field.value) : null}
      onChange={(newValue) => {
        const nextValue = newValue && dayjs.isDayjs(newValue) && newValue.isValid() ? newValue.format("YYYY-MM-DD") : null;
        field.onChange(nextValue);
      }}
      slotProps={{
        textField: {
          fullWidth: true,
          onBlur: field.onBlur,
          error: Boolean(error),
          helperText: error?.message,
        },
      }}
      slots={{ textField: TextField }}
    />
  );
}
