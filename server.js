import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

async function main() {
  // Testa a conexão com o banco antes de subir o servidor
  await prisma.$connect();

  // CREATE
  app.post('/usuarios', async (req, res) => {
    try {
      const { email, age, name } = req.body;
      const user = await prisma.user.create({
        data: { email, age: age.toString(), name },
      });
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  // READ
  app.get('/usuarios', async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  // UPDATE
  app.put('/usuarios/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { email, age, name } = req.body;
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { email, age: age.toString(), name },
      });
      res.status(200).json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE
  app.delete('/usuarios/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.user.delete({ where: { id } });
      res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
