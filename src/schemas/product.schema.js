const { z } = require("zod");

const productSchema = z.object({
    nome: z
    .string()
    .min(2, "O nome do produto deve ter pelo menos 2 caracteres."),

    descricao: z
    .string()
    .min(10, "A descrição do produto deve ter pelo menos 10 caracteres."),

    preco: z.coerce
    .number()
    .positive("O preço não pode ser menor que zero."),

    estado: z
    .string()
    .min(3, "O estado do produto é obrigatório.")
});

module.exports = productSchema;