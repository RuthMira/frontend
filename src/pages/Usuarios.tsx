import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";
import UserForm from "../components/UserForm";

interface Usuario {
  id: number;
  nome: string;
  cargo: string;
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { logout } = useAuth();

  const carregarUsuarios = async () => {
    try {
      const { data } = await api.get("/usuarios");
      setUsuarios(data);
    } catch (error: any) {
      if (error.response?.status === 403) {
        alert("Acesso negado! Apenas administradores podem acessar esta área.");
        logout();
      }
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      await api.delete(`/usuarios/${id}`);
      carregarUsuarios();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Usuários</h1>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setEditingUser(null);
          setShowForm(true);
        }}
      >
        + Novo Usuário
      </button>

      {showForm && (
        <UserForm
          usuario={editingUser}
          onClose={() => {
            setShowForm(false);
            carregarUsuarios();
          }}
        />
      )}

      <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">Cargo</th>
            <th className="py-2 px-4 border-b text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{u.id}</td>
              <td className="py-2 px-4 border-b">{u.nome}</td>
              <td className="py-2 px-4 border-b">{u.cargo}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="text-blue-600 hover:underline mr-3"
                  onClick={() => {
                    setEditingUser(u);
                    setShowForm(true);
                  }}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(u.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
