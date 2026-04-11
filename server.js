const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 COLOCA SUA CHAVE AQUI (COM ASPAS)
const API_KEY = "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";

// teste inicial (pra evitar erro status 1)
app.get("/", (req, res) => {
  res.send("AjudaPro online 🔥");
});

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

// chat IA
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

// porta render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando");
});
