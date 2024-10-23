import { NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import { fornecedorModel } from "@/models/fornecedor.Model";

export async function GET(request) {
  await dbConnect(); // Conecta ao banco de dados

  const kWh = request.nextUrl.searchParams.get("kWh"); // Captura o parâmetro kWh da URL

  try {
    const fornecedores = await fornecedorModel.find({ KWhmin: { $lte: kWh } }); // Busca fornecedores com kWhmin menor ou igual ao kWh fornecido
    console.log(fornecedores);
    return NextResponse.json(
      { fornecedores, message: "sucesso ao buscar os fornecedores" }, // Responde com os fornecedores encontrados e uma mensagem de sucesso
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "erro ao buscar fornecedor" }, // Responde com a mensagem de erro em caso de falha
      { status: 500 }
    );
  }
}
