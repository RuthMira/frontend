import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(nome, senha);
      navigate("/produtos");
    } catch (err) {
      alert("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-80"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="text"
          placeholder="Usuário"
          className="w-full border p-2 mb-4 rounded"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full border p-2 mb-4 rounded"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
