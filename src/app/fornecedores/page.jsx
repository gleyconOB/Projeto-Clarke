"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function FornecedoresPage({ searchParams }) {
  const kWh = searchParams.kWh || 0; // Obtém o parâmetro kWh da URL

  const [fornecedores, setFornecedores] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFornecedores = async () => {
      setLoading(true);
      setError(null);

      if (kWh && !isNaN(kWh) && Number(kWh) > 0) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/get-fornecedores?kWh=${kWh}`
          );

          if (response.data && response.data.fornecedores) {
            setFornecedores(response.data.fornecedores);
          } else {
            setError("Nenhum fornecedor encontrado.");
          }
        } catch (error) {
          console.error("Erro ao buscar fornecedores:", error);
          setError("Erro ao buscar fornecedores. Tente novamente mais tarde.");
        }
      } else {
        setError("Por favor, forneça um valor de kWh válido.");
      }

      setLoading(false);
    };

    fetchFornecedores();
  }, [kWh]);

  return (
    <main className="flex flex-col items-center bg-gray-100 p-6 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-gray-700">Carregando fornecedores...</p>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
          <h1 className="text-2xl font-semibold text-center mb-4">
            Fornecedores Disponíveis
          </h1>
          <p className="text-center mb-4 text-gray-600">
            Seu consumo de kWh: {Number(kWh)}
          </p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <strong className="text-lg">{fornecedor.nome}</strong>
                  </div>
                  <p className="mt-2 text-gray-700">
                    <strong>Estado:</strong> {fornecedor.estado}
                    <br />
                    <strong>Custo por kWh:</strong> R${" "}
                    {fornecedor.custoKWh.toFixed(2)}
                    <br />
                    <strong>Número de Clientes:</strong>{" "}
                    {fornecedor.numeroClientes || 0}
                    <br />
                    <strong>Avaliação Média:</strong>{" "}
                    {fornecedor.avaliacaoClientes
                      ? fornecedor.avaliacaoClientes.toFixed(1)
                      : "N/A"}
                  </p>
                </li>
              ))
            ) : (
              <li className="py-4 text-center text-gray-500">
                Nenhum fornecedor encontrado.
              </li>
            )}
          </ul>
        </div>
      )}
    </main>
  );
}
