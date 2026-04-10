const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 COLOQUE SUA CHAVE DA OPENAI AQUI
const API_KEY = "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";

// 🧠 "Banco de dados" simples
let usuarios = [];

// 📌 CADASTRO
app.post("/register", (req, res) => {
  const { email, senha } = req.body;

  const novoUsuario = {
    email,
    senha,
    criadoEm: Date.now(),
    plano: "gratis"
  };

  usuarios.push(novoUsuario);
  res.json({ msg: "Conta criada com sucesso!" });
});

// 🔐 LOGIN
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  const user = usuarios.find(u => u.email === email && u.senha === senha);

  if (!user) {
    return res.json({ erro: "Usuário não encontrado" });
  }

  res.json(user);
});

// ⏳ VERIFICAR ACESSO (2 dias grátis)
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

// 🤖 CHAT IA
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
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: mensagem }]
      })
    });

    const data = await resposta.json();

    res.json({
      resposta: data.choices[0].message.content
    });
    
    try {
  // código da IA aqui
} catch (err) {
  res.json({ erro: err.message });
    }
} ) ;

app.listen ( 3000 , ( ) = > {​
  console . log ( "Servidor rodando na porta 3000" ) ;
} ) ;
