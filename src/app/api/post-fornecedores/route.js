import { NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import { fornecedorModel } from "@/models/fornecedor.Model";

// Método POST
export async function POST(request) {
  await dbConnect();
  try {
    const dadosFornecedores = await request.json(); // Coletar dados do fornecedor
    const novoFornecedor = await fornecedorModel.create(dadosFornecedores); // Criar novo fornecedor
    return NextResponse.json(
      { message: "Fornecedor criado com sucesso", fornecedor: novoFornecedor },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao criar novo fornecedor:", error);
    return NextResponse.json(
      { message: "Erro ao criar novo fornecedor" },
      { status: 500 }
    );
  }
}
