import { NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import { userModel } from "@/models/user.Model";

// Método POST
export async function POST(request) {
    await dbConnect();
    try {
      const dadosUsuario = await request.json();
      const novoUsuario = await userModel.create(dadosUsuario);
      return NextResponse.json(
        { message: "Usuario criado com sucesso", user: novoUsuario },
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
  