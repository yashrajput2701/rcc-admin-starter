import { z } from "zod";

export const employeeFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().trim().email("Enter a valid email address"),
  role: z.string().min(1, "Select a role"),
  isActive: z.boolean(),
});

// Infer the TS type straight from the schema — change a validation rule here
// and the form's types update automatically, no separate interface to keep in sync.
export type EmployeeFormSchema = z.infer<typeof employeeFormSchema>;

export const employeeFormDefaultValues: EmployeeFormSchema = {
  name: "",
  email: "",
  role: "",
  isActive: true,
};
