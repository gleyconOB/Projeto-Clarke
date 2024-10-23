import { NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import { fornecedorModel } from "@/models/fornecedor.Model";

export async function PATCH(request) {
  await dbConnect();
  try {
    const { id, numeroClientes, avaliacaoClientes } = await request.json(); //atualiza os dados especificados
    const FornecedorAtulizado = await fornecedorModel.findByIdAndUpdate(
      id,
      { numeroClientes, avaliacaoClientes },
      { new: true }
    );
    return NextResponse.json(
      {
        message: "Fornecedor atualizado com sucesso",
        fornecedor: FornecedorAtulizado,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao atualizar dado do fornecedor" },
      { status: 500 }
    );
  }
}
