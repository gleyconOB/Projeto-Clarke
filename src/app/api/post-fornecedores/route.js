import { NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import { fornecedorModel } from "@/models/fornecedor.Model";

export async function POST(request) {
  await dbConnect();
  try {
    const dadosFornecedores = await request.json();
    const novoFornecedor = await fornecedorModel.create(dadosFornecedores);
    return NextResponse.json(
      { message: "fornecedor criado com sucesso", fornecedor: novoFornecedor },
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
