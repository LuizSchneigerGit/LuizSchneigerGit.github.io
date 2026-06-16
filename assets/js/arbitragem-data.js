/**
 * Regras de negócio da precificação de arbitragem (eventos estaduais).
 * Baseado na TABELA ARBITRAGEM FPT 2026 (válida a partir de janeiro/2026).
 * Edite os valores aqui para atualizar a calculadora.
 */
const arbitragemData = {
  // Diária do Árbitro Geral por faixa de inscritos (eventos estaduais).
  // Usa a primeira faixa em que (inscritos <= ate). A última (ate: null) é "acima de 501".
  faixasArbitroGeral: [
    { ate: 150,  valor: 300, label: "Estadual até 150 inscritos" },
    { ate: 250,  valor: 350, label: "Estadual 151 a 250 inscritos" },
    { ate: 300,  valor: 375, label: "Estadual 251 a 300 inscritos" },
    { ate: 400,  valor: 400, label: "Estadual 301 a 400 inscritos" },
    { ate: 500,  valor: 450, label: "Estadual 401 a 500 inscritos" },
    { ate: null, valor: 475, label: "Estadual acima de 501 inscritos" }
  ],

  // Diária do Árbitro Auxiliar (fixa para estaduais)
  valorArbitroAuxiliar: 280,

  // Regra: 1 auxiliar a cada N quadras (mínimo 1 — AG não trabalha sem auxiliar)
  quadrasPorAuxiliar: 4,

  // Deslocamento: custo = (km * valorKm) + pedágios
  valorKm: 0.85,

  // Alimentação (sugestão FPT: R$ 50/refeição). Padrão: 2 refeições por dia.
  valorRefeicaoSugerido: 50,
  refeicoesPorDiaPadrao: 2,

  // Dados fixos do recibo
  arbitro: {
    nome: "Luiz Henrique",
    pix: "083.263.949-47"
  }
};
