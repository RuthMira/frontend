import { useState, useEffect } from "react";
import { api } from "../api/api";

interface Props {
  produto?: {
    id: number;
    nome: string;
    valor: number;
    quantidade: number;
  };
  onClose: () => void;
}

export default function ProductForm({ produto, onClose }: Props) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState<number>(0);
  const [quantidade, setQuantidade] = useState<number>(1);

  useEffect(() => {
    if (produto) {
      setNome(produto.nome);
      setValor(produto.valor);
      setQuantidade(produto.quantidade);
    } else {
      setNome("");
      setValor(0);
      setQuantidade(1);
    }
  }, [produto]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { nome, valor: Number(valor), quantidade: Number(quantidade) };

    if (produto) {
      // Backend expõe atualização via PUT (não PATCH)
      await api.put(`/produtos/${produto.id}`, payload);
    } else {
      await api.post("/produtos", payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">
          {produto ? "Editar Produto" : "Novo Produto"}
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

          <label className="block mb-2">Valor (R$):</label>
          <input
            type="number"
            className="w-full border p-2 mb-4 rounded"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            required
          />

          <label className="block mb-2">Quantidade:</label>
          <input
            type="number"
            className="w-full border p-2 mb-4 rounded"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            required
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-txai-red text-white hover:opacity-90"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
