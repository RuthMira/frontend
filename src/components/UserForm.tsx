import { useState, useEffect } from "react";
import { api } from "../api/api";

interface Props {
  usuario?: { id: number; nome: string; cargo: string };
  onClose: () => void;
}

export default function UserForm({ usuario, onClose }: Props) {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("user");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setCargo(usuario.cargo);
    } else {
      setNome("");
      setCargo("user");
    }
  }, [usuario]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = { nome, cargo };
    if (senha) payload.senha = senha;

    if (usuario) {
      // Backend expõe atualização via PUT (não PATCH)
      await api.put(`/usuarios/${usuario.id}`, payload);
    } else {
      await api.post("/usuarios", payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">
          {usuario ? "Editar Usuário" : "Novo Usuário"}
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Nome:</label>
          <input
            type="text"
            className="w-full border p-2 mb-4 rounded"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label className="block mb-2">Cargo:</label>
          <select
            className="w-full border p-2 mb-4 rounded"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          >
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>

          <label className="block mb-2">
            {usuario ? "Nova senha (opcional):" : "Senha:"}
          </label>
          <input
            type="password"
            className="w-full border p-2 mb-4 rounded"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder={usuario ? "Deixe em branco para manter" : ""}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
