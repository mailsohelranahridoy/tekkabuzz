import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import PostDetail from "@/pages/PostDetail";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminPosts from "@/pages/admin/AdminPosts";
import AdminPostCreate from "@/pages/admin/AdminPostCreate";
import AdminPostEdit from "@/pages/admin/AdminPostEdit";
import AdminSeedData from "@/pages/admin/AdminSeedData";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/posts" element={<AdminPosts />} />
        <Route path="/admin/posts/create" element={<AdminPostCreate />} />
        <Route path="/admin/posts/edit/:id" element={<AdminPostEdit />} />
        <Route path="/admin/seed" element={<AdminSeedData />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
