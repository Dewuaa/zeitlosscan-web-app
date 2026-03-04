import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CommandPalette } from "./components/CommandPalette";
import Home from "./pages/Home";
import MangaDetail from "./pages/MangaDetail";
import BrowseSeries from "./pages/BrowseSeries";
import Reader from "./pages/Reader";
import BottomNav from "./components/BottomNav";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import SeriesManager from "./pages/admin/SeriesManager";
import ChapterUpload from "./pages/admin/ChapterUpload";
import "./App.css";

function AppLayout() {
  const location = useLocation();
  const isReaderRoute = location.pathname.startsWith("/read/");
  const isAdminRoute = location.pathname.startsWith("/admin");
  const hideBottomSpacer =
    location.pathname.startsWith("/read/") ||
    location.pathname.startsWith("/manga/");

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="series" element={<SeriesManager />} />
          <Route path="upload" element={<ChapterUpload />} />
        </Route>
      </Routes>
    );
  }

  return (
    <div className={hideBottomSpacer ? "" : "pb-20 md:pb-0"}>
      {!isReaderRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<BrowseSeries />} />
        <Route path="/manga/:slug" element={<MangaDetail />} />
        <Route path="/read/:chapterId" element={<Reader />} />
      </Routes>
      {!isReaderRoute && <Footer />}
      <BottomNav />
      <CommandPalette />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
