const productSchema = require("../schemas/product.schema");

module.exports = function validateProduct(req, res, next) {
  const resultado = productSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      erro: "Dados inválidos.",
      detalhes: resultado.error.issues.map((erro) => ({
        campo: erro.path.join("."),
        mensagem: erro.message
      }))
    });
  }

  req.body = resultado.data;

  return next();
};