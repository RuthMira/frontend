import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white text-neutral-900 px-6 py-3 flex justify-between items-center shadow-md border-b border-gray-200">
      <a href="/home" className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center bg-transparent rounded-md p-1 overflow-hidden">
          <img
            src="/logo.svg"
            alt="Grupo Txai"
            className="h-8 w-auto"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              const src = img.getAttribute("src") || "";
              // Tentativas: logo.svg -> logo.png -> logo.jpg -> txai-logo.svg -> txai-logo.png -> txai-logo.jpg
              if (src.endsWith("/logo.svg")) img.src = "/logo.png";
              else if (src.endsWith("/logo.png")) img.src = "/logo.jpg";
              else if (src.endsWith("/logo.jpg")) img.src = "/txai-logo.svg";
              else if (src.endsWith("/txai-logo.svg")) img.src = "/txai-logo.png";
              else if (src.endsWith("/txai-logo.png")) img.src = "/txai-logo.jpg";
              else img.style.display = "none"; // se nada existir, esconde
            }}
          />
        </span>
      </a>

      <div className="flex items-center gap-4">
        <span className="text-sm opacity-90">
          {user ? `${user.nome} (${user.cargo})` : ""}
        </span>
        <button
          onClick={handleLogout}
          className="bg-txai-red hover:opacity-90 px-3 py-1 rounded text-sm text-white"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
