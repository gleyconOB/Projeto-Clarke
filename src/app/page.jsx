"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({ nome: "", KWh: "0" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(""); // Limpa a mensagem de erro ao digitar
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.nome) {
      setErrorMessage("Por favor, escreva seu nome.");
      setTimeout(() => {
        setErrorMessage(""); // Limpa a mensagem após 2 segundos
      }, 1000);
      return; // Para a execução se o nome estiver vazio
    }

    console.log("Dados do formulário:", formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/post-usuarios",
        formData
      );

      router.push(`/fornecedores?kWh=${formData.KWh}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex-col flex w-full h-screen justify-center items-center ">
      <h1 className="text-blue-950 mb-6 text-2xl font-bold">
        Procure seu Fornecedor
      </h1>
      <div className="flex flex-col w-96 bg-gradient-to-r from-white to-green-200 h-3/4 justify-center items-center rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
        <div className="">
          <a href="https://clarke.com.br/">
            <Image
              className="mr-2 flex gap-4 flex-col hover:opacity-80 hover:scale-105 transition-transform duration-300 w-auto h-auto"
              src="/clarke.png"
              alt="clarke"
              width={138}
              height={74}
              priority
            />
          </a>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex gap-4 flex-col text-blue-950"
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="mr-4">
              Seu Nome:
            </label>
            <input
              type="text"
              id="name"
              name="nome"
              onChange={handleChange}
              placeholder="digite seu nome"
              className="px-2 py-1 rounded-lg bg-blue-200 hover:bg-blue-300 border-spacing-1"
            />
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
          </div>

          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="px-3 py-1 rounded-2xl bg-blue-300 text-blue-950 shadow-lg hover:bg-blue-500"
            >
              Ver Fornecedores
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}