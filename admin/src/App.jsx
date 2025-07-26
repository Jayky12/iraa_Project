import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/layout";
import Post from './pages/admin/post';
import  './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<AdminLayout />}>
        <Route path="/pages/admin/post" element={<Post/>} />
        {/* <Route path="/pages/admin/post/create" element={<PostCreate/>} />
        <Route path="/pages/admin/post/:id" element={<PostEdit/>} /> */}
          {/* เพิ่ม route หน้าอื่นๆ ได้ที่นี่ */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
