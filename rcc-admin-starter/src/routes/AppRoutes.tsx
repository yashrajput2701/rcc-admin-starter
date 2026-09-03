import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/ui/AppLayout";
import DashboardPage from "../features/dashboard/DashboardPage";
import EmployeeListPage from "../features/employees/EmployeeListPage";
import EmployeeFormPage from "../features/employees/EmployeeFormPage";

/**
 * Add a new feature? Add its routes here, nested under <AppLayout>.
 * Example:
 *   <Route path="manufacturers" element={<ManufacturerListPage />} />
 *   <Route path="manufacturers/:id" element={<ManufacturerFormPage />} />
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/employees" element={<EmployeeListPage />} />
        <Route path="/employees/new" element={<EmployeeFormPage />} />
        <Route path="/employees/:id" element={<EmployeeFormPage />} />
      </Route>
    </Routes>
  );
}
