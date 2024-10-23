"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

// Componente que busca e exibe a lista de fornecedores
const FornecedoresList = ({ kWh }) => {
  const [fornecedores, setFornecedores] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        if (kWh && kWh > 0) {
          // Verifica se kWh não é vazio ou menor que 0
          const response = await axios.get(
            `http://localhost:3000/api/get-fornecedores?kWh=${kWh}`
          );
          console.log("Dados dos fornecedores:", response.data);

          if (response.data && response.data.fornecedores) {
            setFornecedores(response.data.fornecedores);
          } else {
            setFornecedores([]); // Limpa a lista se não houver fornecedores
          }
        } else {
          setFornecedores([]); // Limpa a lista se kWh estiver vazio ou menor que 0
        }
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
        setError("Erro ao buscar fornecedores.");
      } finally {
        setLoading(false);
      }
    };

    fetchFornecedores();
  }, [kWh]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Carregando fornecedores...</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
      {fornecedores.length > 0 ? (
        fornecedores.map((fornecedor) => (
          <li
            key={fornecedor._id}
            className="py-2 flex flex-col items-start hover:bg-gray-50 transition duration-150"
          >
            <div className="flex items-center">
              <Image
                src={fornecedor.logo}
                alt={fornecedor.nome}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <strong className="text-lg">{fornecedor.nome}</strong>
            </div>
            <p className="mt-2 text-gray-700">
              <strong>Estado:</strong> {fornecedor.estado}
              <br />
              <strong>Custo por kWh:</strong> R${" "}
              {fornecedor.custoKWh.toFixed(2)}
              <br />
              <strong>kwh min:</strong>
              {fornecedor.KWhmin}
              <br />
              <strong>Número de Clientes:</strong>{" "}
              {fornecedor.numeroClientes || 0}
              <br />
              <strong>Avaliação Média:</strong>{" "}
              {fornecedor.avaliacaoClientes
                ? fornecedor.avaliacaoClientes.toFixed(1)
                : "N/A"}
              <br />
            </p>
          </li>
        ))
      ) : (
        <li className="py-4 text-center text-gray-500">
          Nenhum fornecedor encontrado.
        </li>
      )}
    </ul>
  );
};

// Componente principal da página
export default function FornecedoresPage() {
  const [kWh, setKWh] = useState(""); // Inicialmente vazio

  const handleInputChange = (event) => {
    setKWh(event.target.value); // Atualiza o estado com o valor do input
  };

  return (
    <main className="flex flex-col items-center p-6 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Fornecedores Disponíveis
        </h1>
        <input
          type="number"
          value={kWh}
          onChange={handleInputChange}
          className="border rounded p-2 mb-4 w-full"
          placeholder="Digite seu consumo em kWh"
        />
        <p className="text-center mb-4 text-gray-600">
          Seu consumo de kWh: {kWh}
        </p>
        <FornecedoresList kWh={kWh} />
      </div>
    </main>
  );
}
