import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dasboard";
import UsersPage from "./Pages/Dashboard/users/UsersPage";
import Applications from "./Pages/Dashboard/applications/Applications";
import NotFound from "./components/NotFound";
import MuiDatagrid from "./components/MuiDatagrid";
import Profile from "./Pages/Profile/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Charts from "./components/Charts";
import HomeDashboard from "./Pages/Home/HomeDashboard";

function App() {
  const { a } = localStorage.getItem("p")
    ? JSON.parse(localStorage.getItem("p"))
    : false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomeDashboard />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoutes isSignedIn={true} />}>
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="users" element={<UsersPage />} />
            <Route path="applications" element={<Applications />} />

            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="/table" element={<MuiDatagrid />} />
        <Route path="/charts" element={<Charts />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
