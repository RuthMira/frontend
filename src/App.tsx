import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { ReactElement } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Produtos from "./pages/Produtos";
import Usuarios from "./pages/Usuarios";
import Home from "./pages/Home";

function PrivateRoute({ children }: { children: ReactElement }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/" />;
}

function AdminRoute({ children }: { children: ReactElement }) {
  const { token, user } = useAuth();
  if (!token) return <Navigate to="/" />;
  const role = String(user?.cargo || "").toLowerCase();
  const allowed = role === "admin" || role === "administrador";
  return allowed ? children : <Navigate to="/produtos" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/produtos"
            element={
              <PrivateRoute>
                <Produtos />
              </PrivateRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <AdminRoute>
                <Usuarios />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
