const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createProduct(req, res) {
    try {
        const {nome, descricao, preco, estado} = req.body;

        const userId = req.userId;

        const usuario = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!usuario) {
            return res.status(404).json({
                erro: "Usuário não encontrado."
            });
        }

        const produto = await prisma.product.create({
            data: {
                nome,
                preco: Number(preco),
                descricao,
                estado,
                imagem: req.file ? req.file.filename: null,
                userId
            }
        });

        return res.status(201).json(produto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao criar produto."
        });
    }
}

async function listProducts(req, res) {
    try {
        const produtos = await prisma.product.findMany({
            include: {
                usuario: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    }
                }
            }
        });

        return res.json(produtos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao listar produtos."
        });
    }
}

async function getProductById(req, res) {
    try {
        const id = Number(req.params.id);

        const produto = await prisma.product.findUnique({
            where: { id },
            include: {
                usuario: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    }
                }
            }
        });

        if (!produto) {
            return res.status(404).json({
                erro: "Produto não encontrado."
            });
        }

        return res.json(produto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao buscar produto."
        });
    }
}

async function updateProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const {nome, descricao, preco, estado} = req.body;
        
        const produtoExistente = await prisma.product.findUnique({
            where: { id }
        });

        if (!produtoExistente) {
            return res.status(404).json({
                erro: "Produto não encontrado."
            });
        }

        const produtoAtualizado = await prisma.product.update({
            where: { id },
            data: {
                nome: nome ?? produtoExistente.nome,
                descricao: descricao ?? produtoExistente.descricao,
                preco: preco !== undefined ? Number(preco) : produtoExistente.preco,
                estado: estado ?? produtoExistente.estado
            }
        });

        return res.json(produtoAtualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao atualizar produto."
        });
    }
}


async function deleteProduct(req, res) {
    try {
        const id = Number(req.params.id);

        const produtoExistente = await prisma.product.findUnique({
            where: { id }
        });

        if (!produtoExistente) {
            return res.status(404).json({
                erro: "Produto não encontrado."
            });
        }

        await prisma.product.delete({
            where: { id }
        });

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json ({
            erro: "Erro ao deletar produto."
        });
    }
}

module.exports = {
    createProduct,
    listProducts,
    getProductById,
    updateProduct,
    deleteProduct
};