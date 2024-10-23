import mongoose from "mongoose";

// Defina o esquema do usuário
const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  KWh: {
    type: Number,
    required: true,
  },
});

// Modelo do usuário
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// Exporte o modelo como uma exportação nomeada, se necessário
export { userModel };
