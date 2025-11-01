import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import Footer from "../components/Footer";

interface Produto {
  id: number;
  nome: string;
  valor: number;
  quantidade: number;
  dataCadastro: string;
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editing, setEditing] = useState<Produto | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const carregarProdutos = useCallback(async () => {
    try {
      const { data } = await api.get("/produtos");
      setProdutos(data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      alert("Erro ao carregar produtos");
    }
  }, []);

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Deseja excluir este produto?")) {
      await api.delete(`/produtos/${id}`);
      carregarProdutos();
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
                  <path d="M6 6h15l-1.5 9h-13z" />
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="18" cy="20" r="1" />
                </svg>
                Meus Produtos
              </h1>
            </div>
            <button
              type="button"
              className="group inline-flex items-center gap-2 rounded-lg border border-txai-red text-txai-red bg-transparent px-4 py-2 hover:bg-txai-red hover:text-white transition shadow-sm focus:outline-none focus:ring-2 focus:ring-txai-red/30"
              onClick={() => {
                setEditing(undefined);
                setShowForm(true);
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition group-hover:stroke-white">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Novo Produto
            </button>
          </div>

          {showForm && (
            <ProductForm
              produto={editing}
              onClose={() => {
                setShowForm(false);
                carregarProdutos();
              }}
            />
          )}

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white/90 backdrop-blur-sm shadow">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">ID</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">Nome</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">Valor (R$)</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">Quantidade</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">Cadastrado em</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="py-2.5 px-4 border-t">{p.id}</td>
                    <td className="py-2.5 px-4 border-t">{p.nome}</td>
                    <td className="py-2.5 px-4 border-t">{p.valor.toFixed(2)}</td>
                    <td className="py-2.5 px-4 border-t">{p.quantidade}</td>
                    <td className="py-2.5 px-4 border-t">{new Date(p.dataCadastro).toLocaleDateString()}</td>
                    <td className="py-2.5 px-4 border-t text-center">
                      <button
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-600 hover:text-txai-black mr-2"
                        title="Editar"
                        aria-label="Editar"
                        onClick={() => {
                          setEditing(p);
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
                        title="Excluir"
                        aria-label="Excluir"
                        onClick={() => handleDelete(p.id)}
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
