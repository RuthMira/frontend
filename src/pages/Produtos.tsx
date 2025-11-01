import { useEffect, useState } from "react";
import { api } from "../api/api";
import ProductForm from "../components/ProductForm";

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

  const carregarProdutos = async () => {
    try {
      const { data } = await api.get("/produtos");
      setProdutos(data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      alert("Erro ao carregar produtos");
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Deseja excluir este produto?")) {
      await api.delete(`/produtos/${id}`);
      carregarProdutos();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Meus Produtos</h1>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setEditing(undefined);
          setShowForm(true);
        }}
      >
        + Novo Produto
      </button>

      {showForm && (
        <ProductForm
          produto={editing}
          onClose={() => {
            setShowForm(false);
            carregarProdutos();
          }}
        />
      )}

      <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">Valor (R$)</th>
            <th className="py-2 px-4 border-b">Quantidade</th>
            <th className="py-2 px-4 border-b">Cadastrado em</th>
            <th className="py-2 px-4 border-b text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{p.id}</td>
              <td className="py-2 px-4 border-b">{p.nome}</td>
              <td className="py-2 px-4 border-b">{p.valor.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{p.quantidade}</td>
              <td className="py-2 px-4 border-b">
                {new Date(p.dataCadastro).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="text-blue-600 hover:underline mr-3"
                  onClick={() => {
                    setEditing(p);
                    setShowForm(true);
                  }}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(p.id)}
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
