import { Typography } from "@mui/material";
import PageHeader from "../../components/ui/PageHeader";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of your application." />
      <Typography color="text.secondary">
        Wire up your widgets/cards here — this page is just a placeholder route.
      </Typography>
    </div>
  );
}
