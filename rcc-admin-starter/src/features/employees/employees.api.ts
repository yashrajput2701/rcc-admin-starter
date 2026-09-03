import api from "../../lib/axios";
import type { ListQueryParams, PaginatedResult } from "../../types/common";
import type { Employee } from "./employees.types";
import type { EmployeeFormSchema } from "./employees.schema";

// Swap this for your real API base path.
const BASE_PATH = "/employees";

export async function fetchEmployees(params: ListQueryParams): Promise<PaginatedResult<Employee>> {
  const { data } = await api.get(BASE_PATH, { params });
  return data.data as PaginatedResult<Employee>;
}

export async function fetchEmployeeById(id: string): Promise<Employee> {
  const { data } = await api.get(`${BASE_PATH}/${id}`);
  return data.data as Employee;
}

export async function createEmployee(payload: EmployeeFormSchema): Promise<Employee> {
  const { data } = await api.post(BASE_PATH, payload);
  return data.data as Employee;
}

export async function updateEmployee(id: string, payload: EmployeeFormSchema): Promise<Employee> {
  const { data } = await api.put(`${BASE_PATH}/${id}`, payload);
  return data.data as Employee;
}

export async function deleteEmployee(id: string): Promise<void> {
  await api.delete(`${BASE_PATH}/${id}`);
}
