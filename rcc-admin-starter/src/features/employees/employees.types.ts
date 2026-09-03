export type EmployeeStatus = "active" | "blocked" | "pending";

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: EmployeeStatus;
  joinedOn: string; // ISO date
}

/** Shape of the add/edit form — a subset of Employee (no id/joinedOn, server sets those). */
export interface EmployeeFormValues {
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}
