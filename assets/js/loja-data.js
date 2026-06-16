/**
 * Dados da Loja — Beach Tennis
 * Edite este arquivo (ou use o painel admin) para atualizar os produtos.
 *
 * Cada produto: { id, nome, categoria, preco, descricao, imagem, destaque }
 *  - id: identificador único (sem espaços)
 *  - categoria: chave de uma das categorias abaixo
 *  - preco: número (em R$). Use 0 para "sob consulta".
 *  - destaque: true para marcar como "Mais procurado"
 */

const lojaData = {
  // Configuração de contato (pedido enviado por WhatsApp)
  contato: {
    whatsapp: "5546991155082",
    saudacao: "Olá! Gostaria de fazer um pedido na loja:"
  },

  // Categorias da loja
  categorias: [
    { chave: "aulas", nome: "Aulas e Pacotes", icone: "fas fa-table-tennis-paddle-ball" },
    { chave: "equipamentos", nome: "Equipamentos", icone: "fas fa-baseball" },
    { chave: "vestuario", nome: "Vestuário", icone: "fas fa-shirt" },
    { chave: "servicos", nome: "Serviços", icone: "fas fa-handshake" }
  ],

  // Produtos (exemplos — edite à vontade)
  produtos: [
    // ---- Aulas e pacotes ----
    {
      id: "aula-experimental",
      nome: "Aula Experimental",
      categoria: "aulas",
      preco: 0,
      descricao: "Primeira aula para conhecer o esporte e a metodologia. Condições especiais para novos alunos.",
      imagem: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=600&auto=format&fit=crop",
      destaque: true
    },
    {
      id: "pacote-mensal-grupo",
      nome: "Pacote Mensal em Grupo",
      categoria: "aulas",
      preco: 240,
      descricao: "Aulas em grupo (até 4 alunos), 1x por semana durante o mês. Desenvolvimento técnico e tático.",
      imagem: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop",
      destaque: false
    },
    {
      id: "aula-individual",
      nome: "Aula Individual (Personal)",
      categoria: "aulas",
      preco: 120,
      descricao: "Aula particular de 1 hora, totalmente personalizada para o seu nível e objetivos.",
      imagem: "https://images.unsplash.com/photo-1591491653056-4313e9c5a83b?q=80&w=600&auto=format&fit=crop",
      destaque: false
    },
    {
      id: "mentoria-competicao",
      nome: "Mentoria para Competição",
      categoria: "aulas",
      preco: 350,
      descricao: "Acompanhamento focado em atletas que vão competir: análise de jogo, tática e preparação mental.",
      imagem: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=600&auto=format&fit=crop",
      destaque: false
    },

    // ---- Equipamentos ----
    {
      id: "raquete-pro",
      nome: "Raquete Beach Tennis Pro",
      categoria: "equipamentos",
      preco: 480,
      descricao: "Raquete profissional de fibra de carbono, leve e equilibrada. Ideal para jogadores intermediários e avançados.",
      imagem: "https://images.unsplash.com/photo-1617083277624-c4b2b1c3b3a4?q=80&w=600&auto=format&fit=crop",
      destaque: true
    },
    {
      id: "kit-bolas",
      nome: "Kit com 3 Bolas Oficiais",
      categoria: "equipamentos",
      preco: 60,
      descricao: "Bolas oficiais de beach tennis (pressão reduzida), aprovadas para treinos e competições.",
      imagem: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=600&auto=format&fit=crop",
      destaque: false
    },
    {
      id: "overgrip",
      nome: "Overgrip (par)",
      categoria: "equipamentos",
      preco: 25,
      descricao: "Par de overgrips antiderrapantes para melhor aderência e conforto na empunhadura.",
      imagem: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=600&auto=format&fit=crop",
      destaque: false
    },

    // ---- Vestuário ----
    {
      id: "camiseta-dryfit",
      nome: "Camiseta Dry-Fit",
      categoria: "vestuario",
      preco: 89,
      descricao: "Camiseta esportiva com tecido respirável e proteção UV. Disponível em vários tamanhos.",
      imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop",
      destaque: false
    },
    {
      id: "viseira",
      nome: "Viseira Esportiva",
      categoria: "vestuario",
      preco: 49,
      descricao: "Viseira leve com ajuste regulável, perfeita para os dias de sol na areia.",
      imagem: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=600&auto=format&fit=crop",
      destaque: false
    },

    // ---- Serviços ----
    {
      id: "arbitragem",
      nome: "Arbitragem de Torneio",
      categoria: "servicos",
      preco: 0,
      descricao: "Serviço de arbitragem profissional para torneios e competições. Valor sob consulta conforme o evento.",
      imagem: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=600&auto=format&fit=crop",
      destaque: false
    },
    {
      id: "organizacao-evento",
      nome: "Organização de Evento",
      categoria: "servicos",
      preco: 0,
      descricao: "Planejamento e organização de torneios: chaves, tabelas e gestão. Valor sob consulta.",
      imagem: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=600&auto=format&fit=crop",
      destaque: false
    }
  ]
};
