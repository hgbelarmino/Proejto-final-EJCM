const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function createUser(req, res) {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await prisma.user.findUnique({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(409).json({
        erro: "Já existe um usuário com esse e-mail."
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await prisma.user.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada
      },
      select: {
        id: true,
        nome: true,
        email: true,
        createdAt: true
      }
    });

    return res.status(201).json(usuario);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao criar usuário."
    });
  }
}

async function listUsers(req, res) {
  try {
    const usuarios = await prisma.user.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        createdAt: true
      }
    });

    return res.json(usuarios);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao listar usuários."
    });
  }
}

async function getUserById(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        erro: "ID inválido."
      });
    }

    const usuario = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        createdAt: true
      }
    });

    if (!usuario) {
      return res.status(404).json({
        erro: "Usuário não encontrado."
      });
    }

    return res.json(usuario);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao buscar usuário."
    });
  }
}

async function updateUser(req, res) {
  try {
    const id = Number(req.params.id);
    const { nome, email, senha } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({
        erro: "ID inválido."
      });
    }

    const usuarioExistente = await prisma.user.findUnique({
      where: { id }
    });

    if (!usuarioExistente) {
      return res.status(404).json({
        erro: "Usuário não encontrado."
      });
    }

    if (email && email !== usuarioExistente.email) {
      const emailEmUso = await prisma.user.findUnique({
        where: { email }
      });

      if (emailEmUso) {
          return res.status(409).json({
            erro: "Esse e-mail já está em uso."
          });
        }
    }

    const dadosAtualizados = {};

    if (nome !== undefined) {
      dadosAtualizados.nome = nome;
    }

    if (email !== undefined) {
      dadosAtualizados.email = email;
    }

    if (senha !== undefined) {
      dadosAtualizados.senha = await bcrypt.hash(senha, 10);
    }

    const usuarioAtualizado = await prisma.user.update({
      where: { id },
      data: dadosAtualizados,
      select: {
        id: true,
        nome: true,
        email: true,
        createdAt: true
      }
    });

    return res.json(usuarioAtualizado);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao atualizar usuário."
    });
  }
}

async function deleteUser(req, res) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        erro: "ID inválido."
      });
    }

    const usuarioExistente = await prisma.user.findUnique({
      where: { id }
    });

    if (!usuarioExistente) {
      return res.status(404).json({
        erro: "Usuário não encontrado."
      });
    }

    await prisma.user.delete({
      where: { id }
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao deletar usuário."
    });
  }
}

module.exports = {
  createUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser
};