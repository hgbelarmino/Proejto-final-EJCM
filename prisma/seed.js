const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const id = require("zod/v4/locales/id.cjs");

const prisma = new PrismaClient();

async function main() {
    const senhaCriptografada = await bcrypt.hash("123456", 10);

    const usuario = await prisma.user.upsert({
        where: {
            email: "adm@elektro.com"
        },
        update: {},
        create: {
            nome: "Administrador Elektro",
            email: "adm@elektro.com",
            senha: senhaCriptografada
        }
    });

    console.log("Usuário do Seeder criado:");
    console.log({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
    });
}

main()
  .catch((error) => {
    console.error("Erro no Seeder:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
