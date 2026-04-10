const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 SUA CHAVE AQUI (com aspas!)
const API_KEY = "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";

// banco simples
let usuarios = [];

// cadastro
app.post("/register", (req, res) => {
  const { email, senha } = req.body;

  usuarios.push({
    email,
    senha,
    criadoEm: Date.now(),
    plano: "gratis"
  });

  res.json({ msg: "Conta criada com sucesso!" });
});

// login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  const user = usuarios.find(u => u.email === email && u.senha === senha);

  if (!user) return res.json({ erro: "Usuário não encontrado" });

  res.json(user);
});

// verificar acesso
app.post("/check", (req, res) => {
  const { email } = req.body;

  const user = usuarios.find(u => u.email === email);

  if (!user) return res.json({ erro: "Usuário não existe" });

  let dias = (Date.now() - user.criadoEm) / (1000 * 60 * 60 * 24);

  if (user.plano === "gratis" && dias > 2) {
    return res.json({ bloqueado: true });
  }

  res.json({ bloqueado: false });
});

// CHAT IA
app.post("/chat", async (req, res) => {
  const { mensagem } = req.body;

  try {
    const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: mensagem }]
      })
    });

    const data = await resposta.json();

    if (data.error) {
      return res.json({ erro: data.error.message });
    }

    res.json({
      resposta: data.choices[0].message.content
    });

  } catch (err) {
    res.json({ erro: err.message });
  }
});

// porta correta pro Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando");
});
