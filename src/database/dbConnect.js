import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) return; // Se já estiver conectado, retorna
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        
      });
      console.log("Conexão com o MongoDB estabelecida com sucesso!");
    } catch (error) {
      console.error("Erro ao conectar ao MongoDB:", error);
    }
  };
  
  export default dbConnect;