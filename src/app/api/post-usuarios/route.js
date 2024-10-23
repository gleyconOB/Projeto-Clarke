import { NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import { userModel } from "@/models/user.Model";

// Método POST
export async function POST(request) {
  await dbConnect();
  try {
    const dadosUsuario = await request.json(); // Coletar dados do usuário
    const novoUsuario = await userModel.create(dadosUsuario); // Criar novo usuário
    return NextResponse.json(
      { message: "Usuário criado com sucesso", user: novoUsuario },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao criar novo usuario:", error);
    return NextResponse.json(
      { message: "Erro ao criar novo usuario" },
      { status: 500 }
    );
  }
}