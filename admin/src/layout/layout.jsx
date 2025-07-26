import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/navbar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <Box component="main" sx={{ flexGrow: 1, mt: '5px', p: 3, width: '100%' }}>
        <Outlet />
      </Box>
    </>
  );
};

export default AdminLayout;
