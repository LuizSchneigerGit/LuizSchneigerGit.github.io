/**
 * Regras de negócio da precificação de arbitragem (eventos estaduais).
 * Edite os valores aqui para atualizar a calculadora.
 */
const arbitragemData = {
  // Diária do Árbitro Geral por faixa de inscritos.
  // Regra: usa a primeira faixa em que (inscritos <= ate). A última (ate: null)
  // é o teto "acima de 501".
  faixasArbitroGeral: [
    { ate: 150,  valor: 300, label: "Estadual até 150 inscritos" },
    { ate: 250,  valor: 350, label: "Estadual 151 a 250 inscritos" },
    { ate: 300,  valor: 375, label: "Estadual 251 a 300 inscritos" },
    { ate: 400,  valor: 400, label: "Estadual 301 a 400 inscritos" },
    { ate: 500,  valor: 450, label: "Estadual 401 a 500 inscritos" },
    { ate: null, valor: 475, label: "Estadual acima de 501 inscritos" }
  ],

  // Diária do Árbitro Auxiliar (fixa, independente de inscritos)
  valorArbitroAuxiliar: 280,

  // Deslocamento: custo = (km * valorKm) + pedágios
  valorKm: 0.85,

  // Refeição (variável opcional / futura) — R$ por refeição
  valorRefeicao: 50,

  // Dados padrão do recibo
  arbitro: {
    nome: "Luiz Henrique",
    pix: ""
  }
};
