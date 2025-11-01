import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";
import UserForm from "../components/UserForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Usuario {
  id: number;
  nome: string;
  cargo: string;
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editingUser, setEditingUser] = useState<Usuario | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const carregarUsuarios = useCallback(async () => {
    try {
      const { data } = await api.get("/usuarios");
      setUsuarios(data);
    } catch (error: any) {
      if (error.response?.status === 403) {
        alert("Acesso negado! Apenas administradores podem acessar esta área.");
        logout();
      }
    }
  }, [logout]);

  useEffect(() => {
    carregarUsuarios();
  }, [carregarUsuarios]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      await api.delete(`/usuarios/${id}`);
      carregarUsuarios();
    }
  };

  return (
    <div className="min-h-screen bg-txai-white flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-10 flex-1">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/home")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white/80 px-3 py-1.5 text-gray-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-txai-red/30"
                aria-label="Voltar"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Voltar
              </button>
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 flex items-center gap-2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-txai-red">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Gerenciamento de Usuários
              </h1>
            </div>
            <button
              type="button"
              className="group inline-flex items-center gap-2 rounded-lg border border-txai-red text-txai-red bg-transparent px-4 py-2 hover:bg-txai-red hover:text-white transition shadow-sm focus:outline-none focus:ring-2 focus:ring-txai-red/30"
              onClick={() => {
                setEditingUser(undefined);
                setShowForm(true);
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition group-hover:stroke-white">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Novo Usuário
            </button>
          </div>

          {showForm && (
            <UserForm
              usuario={editingUser}
              onClose={() => {
                setShowForm(false);
                carregarUsuarios();
              }}
            />
          )}

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white/90 backdrop-blur-sm shadow">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">ID</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">Nome</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">Cargo</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="py-2.5 px-4 border-t">{u.id}</td>
                    <td className="py-2.5 px-4 border-t">{u.nome}</td>
                    <td className="py-2.5 px-4 border-t">{u.cargo}</td>
                    <td className="py-2.5 px-4 border-t text-center">
                      <button
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-600 hover:text-txai-black mr-2"
                        onClick={() => {
                          setEditingUser(u);
                          setShowForm(true);
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-600 hover:text-txai-red"
                        onClick={() => handleDelete(u.id)}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
      <Footer />
    </div>
  );
}
