const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// teste
app.get("/", (req, res) => {
  res.send("AjudaPro online 🔥");
});

// IA simulada
app.post("/chat", async (req, res) => {
  const { mensagem } = req.body;

  if (!mensagem) {
    return res.json({ resposta: "Digite alguma pergunta." });
  }

  const texto = mensagem.toLowerCase();

  let resposta = "";

  // FREE FIRE
  if (texto.includes("free fire") || texto.includes("capa") || texto.includes("sensibilidade")) {
    resposta = "Para dar capa no Free Fire, use sensibilidade geral entre 90 e 100, DPI alto e puxe a mira rapidamente para cima. Treine no modo treino para melhorar.";
  }

  // DINHEIRO
  else if (texto.includes("dinheiro") || texto.includes("ganhar dinheiro")) {
    resposta = "Você pode ganhar dinheiro online vendendo produtos, editando vídeos, criando conteúdo ou usando apps como TikTok e Kwai. O importante é consistência.";
  }

  // FUTSAL
  else if (texto.includes("futsal") || texto.includes("driblar") || texto.includes("futebol")) {
    resposta = "Para driblar melhor no futsal, treine controle de bola, movimentos rápidos e jogue sem medo. A confiança faz muita diferença.";
  }

  // MOTIVAÇÃO
  else if (texto.includes("medo") || texto.includes("confiança")) {
    resposta = "O medo é normal, mas você só melhora enfrentando. Comece simples e vá evoluindo. Confiança vem com treino.";
  }

  // RESPOSTA GERAL (INTELIGENTE)
  else {
    resposta = "Boa pergunta! Sobre isso, o melhor é estudar, praticar e nunca desistir. Se quiser, pergunte algo mais específico que posso te ajudar melhor.";
  }

  res.json({ resposta });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando 🔥");
});
