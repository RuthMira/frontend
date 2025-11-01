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
  // Usar strings permite deixar o campo vazio (sem 0 forçado)
  const [valor, setValor] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");

  useEffect(() => {
    if (produto) {
      setNome(produto.nome);
      setValor(String(produto.valor));
      setQuantidade(String(produto.quantidade));
    } else {
      setNome("");
      setValor("");
      setQuantidade("");
    }
  }, [produto]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Suporta vírgula como separador decimal para valor
    const valorNumero = Number(String(valor).replace(",", "."));
    const quantidadeNumero = Number(quantidade);
    const payload = { nome, valor: valorNumero, quantidade: quantidadeNumero };

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
            inputMode="decimal"
            step="0.01"
            min="0"
            placeholder="0,00"
            className="w-full border p-2 mb-4 rounded"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />

          <label className="block mb-2">Quantidade:</label>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            placeholder="1"
            className="w-full border p-2 mb-4 rounded"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
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
