import { NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import { fornecedorModel } from "@/models/fornecedor.Model";

export async function GET(request) {
  // Tenta conectar ao banco de dados
  try {
    await dbConnect();
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao conectar ao banco de dados." },
      { status: 500 }
    );
  }

  // Captura o parâmetro kWh da URL
  const kWh = request.nextUrl.searchParams.get("kWh");

  // Verifica se o kWh é válido
  if (!kWh || isNaN(kWh)) {
    return NextResponse.json(
      { message: "Por favor, forneça um valor válido de kWh." },
      { status: 400 }
    );
  }

  try {
    // Busca fornecedores com kWhmin <= kWh fornecido
    const fornecedores = await fornecedorModel.find({ KWhmin: { $lte: kWh } });

    if (fornecedores.length === 0) {
      return NextResponse.json(
        { message: "Nenhum fornecedor encontrado." },
        { status: 404 }
      );
    }

    // Responde com os fornecedores encontrados e uma mensagem de sucesso
    return NextResponse.json(
      { fornecedores, message: "Sucesso ao buscar os fornecedores." },
      { status: 200 }
    );
  } catch (error) {
    // Responde com a mensagem de erro em caso de falha
    return NextResponse.json(
      { message: "Erro ao buscar fornecedor." },
      { status: 500 }
    );
  }
}
