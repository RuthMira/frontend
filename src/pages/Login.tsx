import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setCarregando(true);
    try {
      await login(nome, senha);
      navigate("/produtos");
    } catch (err) {
      setErro("Usuário ou senha inválidos");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      {/* Decoração de fundo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/70 border border-white/30 shadow-2xl rounded-2xl p-8">
          {/* Cabeçalho */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Bem-vindo(a)</h1>
            <p className="mt-2 text-sm text-gray-600">Faça login para continuar</p>
          </div>

          {/* Alerta de erro */}
          {erro && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Usuário */}
            <div>
              <label htmlFor="usuario" className="mb-1.5 block text-sm font-medium text-gray-700">
                Usuário
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {/* Ícone usuário */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="usuario"
                  type="text"
                  placeholder="Seu usuário"
                  className="w-full rounded-xl border border-gray-200 bg-white/60 pl-11 pr-3 py-2.5 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="senha" className="mb-1.5 block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {/* Ícone cadeado */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>

                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Sua senha"
                  className="w-full rounded-xl border border-gray-200 bg-white/60 pl-11 pr-10 py-2.5 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setMostrarSenha((v) => !v)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 active:scale-95 transition"
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {mostrarSenha ? (
                    // Ícone olho cortado
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.06-2.94 3.19-5.26 5.88-6.63" />
                      <path d="M1 1l22 22" />
                      <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5 3.5 3.5 0 0 0 15.5 12c0-.67-.2-1.3-.53-1.82" />
                    </svg>
                  ) : (
                    // Ícone olho
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Opções */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700 select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Lembrar-me
              </label>
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={carregando}
              className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-white shadow-lg shadow-blue-600/20 transition hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {carregando ? (
                <>
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle className="opacity-25" cx="12" cy="12" r="10" />
                    <path className="opacity-75" d="M4 12a8 8 0 018-8" />
                  </svg>
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                </>
              )}
            </button>
          </form>
        </div>

        {/* Rodapé simples */}
        <p className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} — Ruth Mira
        </p>
      </div>
    </div>
  );
}

