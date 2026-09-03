import { NavLink, Outlet } from "react-router-dom";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

const DRAWER_WIDTH = 240;

const NAV_ITEMS = [
  { label: "Dashboard", to: "/", icon: <DashboardOutlinedIcon /> },
  { label: "Employees", to: "/employees", icon: <PeopleAltOutlinedIcon /> },
];

/**
 * Shared shell for every authenticated page. Add new feature routes to
 * NAV_ITEMS + AppRoutes.tsx — nothing here needs to change per-feature.
 */
export default function AppLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{ width: DRAWER_WIDTH, flexShrink: 0, "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" } }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            RCC Admin
          </Typography>
        </Toolbar>
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItemButton
              key={item.to}
              component={NavLink}
              to={item.to}
              end={item.to === "/"}
              sx={{ "&.active": { bgcolor: "action.selected" } }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
