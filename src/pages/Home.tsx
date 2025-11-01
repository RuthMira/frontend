import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const isAdmin = String(user?.cargo || "").toLowerCase() === "admin" || String(user?.cargo || "").toLowerCase() === "administrador";

  return (
    <div className="min-h-screen bg-txai-white flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-10 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Olá, {user?.nome}</h1>
          <p className="text-gray-600">Bem-vindo(a) — perfil: {user?.cargo}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/produtos"
            className="group rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-xl p-6 shadow-md hover:shadow-lg hover:border-txai-red transition"
          >
            <div className="flex items-center gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-txai-red text-white shadow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 6h15l-1.5 9h-13z" />
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="18" cy="20" r="1" />
                </svg>
              </span>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Produtos</h2>
                <p className="text-gray-600">Gerencie seus produtos</p>
              </div>
            </div>
          </Link>

          {isAdmin && (
            <Link
              to="/usuarios"
              className="group rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-xl p-6 shadow-md hover:shadow-lg hover:border-txai-red transition"
            >
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-txai-red text-white shadow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Usuários</h2>
                  <p className="text-gray-600">Administre contas e permissões</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
