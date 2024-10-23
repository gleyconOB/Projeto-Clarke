import { NextResponse } from "next/server";
import dbConnect from "@/database/dbConnect";
import { userModel } from "@/models/user.Model";

export async function GET() {
  await dbConnect();
  try {
    const usuarios = await userModel.find();
    return NextResponse.json(
      { usuarios, message: "sucesso ao buscar usuario" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "erro ao buscar usuarios" },
      { status: 500 }
    );
  }
}
