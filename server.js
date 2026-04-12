const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// memória simples (por usuário)
let memoria = {};

// teste
app.get("/", (req, res) => {
  res.send("AjudaPro online 🔥");
});

// função aleatória
function escolher(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

app.post("/chat", async (req, res) => {
  const { mensagem, usuario } = req.body;

  if (!mensagem) {
    return res.json({ resposta: "Fala comigo! O que você quer saber?" });
  }

  const userId = usuario || "anonimo";

  if (!memoria[userId]) {
    memoria[userId] = [];
  }

  // salvar mensagem do usuário
  memoria[userId].push({ tipo: "user", texto: mensagem });

  const texto = mensagem.toLowerCase();
  let resposta = "";

  // usar histórico (última mensagem)
  const historico = memoria[userId].slice(-3).map(m => m.texto).join(" ");

  // 📚 EBOOK
  if (texto.includes("ebook")) {
    resposta = escolher([
      "Sim, ebook pode dar dinheiro! Você pode vender online e divulgar nas redes.",
      "Se você criar um ebook bom, pode ganhar dinheiro sim.",
      "O segredo é escolher um tema que as pessoas procuram."
    ]);
  }

  // 💰 DINHEIRO
  else if (texto.includes("dinheiro") || texto.includes("ganhar")) {
    resposta = escolher([
      "Você pode ganhar dinheiro com internet, vendas ou conteúdo.",
      "Escolha uma área e seja consistente.",
      "Existem várias formas de ganhar dinheiro online."
    ]);
  }

  // 🧠 MEMÓRIA USADA
  else if (historico.includes("ebook") && texto.includes("como")) {
    resposta = "Como você falou de ebook antes, você pode começar escrevendo um tema que conhece e depois vender online.";
  }

  // 🤖 GERAL COM MEMÓRIA
  else {
    resposta = escolher([
      `Sobre "${mensagem}", posso te ajudar melhor se você explicar mais.`,
      `Você perguntou "${mensagem}". Isso depende, mas posso te ajudar.`,
      `Interessante isso. Me fala mais detalhes.`,
      `Com base no que você falou antes, tente continuar praticando e aprendendo.`
    ]);
  }

  // salvar resposta da IA
  memoria[userId].push({ tipo: "bot", texto: resposta });

  res.json({ resposta });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando com memória 🔥");
});
