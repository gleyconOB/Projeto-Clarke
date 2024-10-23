import mongoose from "mongoose";

const fornecedorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  custoKWh: {
    type: Number,
    required: true,
  },
  KWhmin: {
    type: Number,
    required: true,
  },
  numeroClientes: {
    type: Number,
    default: 0,
  },
  avaliacaoClientes: {
    type: Number,
    default: 0,
  },
});

const fornecedorModel = mongoose.models.fornecedor || mongoose.model("fornecedor", fornecedorSchema);
export { fornecedorModel };
