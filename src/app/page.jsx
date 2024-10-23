"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({ nome: "", KWh: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a página
    console.log("Dados do formulário:", formData);

    try {
     
      
      
      const response = await axios.post("/api/post-usuarios", formData);
      console.log("url funcionando:");

      router.push(`/fornecedores?kWh=${formData.KWh}`);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
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
            <label htmlFor="name" className="mr-4 ">
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
          </div>
          <div className="flex flex-col">
            <label htmlFor="KWh" className="mr-4">
              Seu Consumo de kWh:
            </label>
            <input
              type="number"
              id="KWh"
              name="KWh"
              onChange={handleChange}
              placeholder="consumo de kWh > 0"
              className="px-2 py-1 rounded-lg bg-blue-200 hover:bg-blue-300"
            />
          </div>

          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="px-3 py-1 rounded-2xl bg-blue-300 text-blue-950 shadow-lg hover:bg-blue-500 "
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
