import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div className="flex gap-4 items-center">
        <span className="font-semibold text-lg">Sistema Txai</span>
        <Link
          to="/produtos"
          className="hover:bg-blue-700 px-3 py-1 rounded transition"
        >
          Produtos
        </Link>
        {(() => {
          const role = String(user?.cargo || "").toLowerCase();
          return role === "admin" || role === "administrador";
        })() && (
          <Link
            to="/usuarios"
            className="hover:bg-blue-700 px-3 py-1 rounded transition"
          >
            Usuários
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm opacity-90">
          {user ? `${user.nome} (${user.cargo})` : ""}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
