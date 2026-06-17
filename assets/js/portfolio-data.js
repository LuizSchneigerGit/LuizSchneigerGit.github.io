/**
 * Arquivo de dados do portfólio de Luiz Henrique
 * Este arquivo contém todos os dados estruturados do portfólio para alimentar o site
 */

const portfolioData = {
  // Informações básicas
  informacoesBasicas: {
    nome: "Luiz Henrique",
    profissao: "Atleta e Professor de Beach Tennis",
    email: "Luiz.schneiger@gmail.com",
    telefone: "(46) 99115-5082",
    instagram: "@LuizSchneigerBT",
    fotoPerfil: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?q=80&w=600&auto=format&fit=crop",
    fotoHero: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?q=80&w=1200&auto=format&fit=crop",
    fotoSobre: "https://images.unsplash.com/photo-1533560904424-a0c61c4aef5d?q=80&w=800&auto=format&fit=crop"
  },
  
  // Resumo inicial
  resumoInicial: {
    titulo: "Resumo Inicial",
    conteudo: "Olá, sou Luiz Henrique, atleta e professor de beach tennis com uma base sólida em tênis. Há 1 ano, iniciei minha trajetória no beach tennis, destacando-me pela evolução rápida e dedicação ao esporte. Este portfólio apresenta minha jornada esportiva, habilidades e objetivos futuros, além de ser um convite para potenciais patrocinadores que desejam apoiar meu crescimento e compartilhar dessa paixão pelo esporte."
  },
  
  // Objetivos do portfólio
  objetivosPortfolio: {
    titulo: "Objetivos do Portfólio",
    itens: [
      "Apresentar minha trajetória esportiva, mostrando meu desenvolvimento no tênis e a transição para o beach tennis.",
      "Atrair patrocinadores, criando um material atrativo que mostre meu potencial como atleta e parceiro comercial.",
      "Fortalecer minha imagem profissional, refletindo seriedade, comprometimento e paixão pelo esporte.",
      "Ampliar oportunidades, facilitando conexões com organizadores de torneios, treinadores e outros atletas."
    ]
  },
  
  // Trajetória no Beach Tennis
  trajetoria: {
    titulo: "Trajetória no Beach Tennis",
    conteudo: "O beach tennis é um esporte dinâmico que combina elementos do tênis, vôlei de praia e badminton. Desde o início de minha jornada, participei de torneios locais e regionais que desafiaram minhas habilidades e contribuíram para minha evolução técnica e mental."
  },
  
  // Atleta e Professor
  atletaProfessor: {
    titulo: "Atleta e Professor",
    paragrafos: [
      "Além de competir, também atuo como professor de beach tennis, compartilhando meus conhecimentos e experiências com alunos de todas as idades. Atualmente, tenho um grupo de 35 alunos fixos, que atendo em três dias da semana no período da noite. Minha abordagem é personalizada, adaptando-me às necessidades de alunos iniciantes, intermediários e avançados.",
      "Minha metodologia foca no desenvolvimento técnico, físico e mental, ajudando os praticantes a melhorar suas habilidades e a se divertir com o esporte. Busco criar um ambiente de aprendizado dinâmico e motivador, onde os alunos possam se desenvolver não apenas como atletas, mas também como pessoas.",
      "A longo prazo, pretendo expandir minha atuação como professor, aumentando o número de alunos e fechando parcerias com diversas áreas do esporte, como academias, clubes e organizações esportivas, para promover o beach tennis e oferecer oportunidades de desenvolvimento para mais pessoas."
    ]
  },
  
  // Participações em Eventos/Torneios
  participacoesTorneios: {
    titulo: "Participações em Eventos/Torneios",
    anos: [
      {
        ano: "2024",
        eventos: [
          "Ranking Regional Categoria C: 10ª posição.",
          "Participações nos Interclubes Regionais e Estadual."
        ],
        imagens: [
          "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop"
        ]
      },
      {
        ano: "2025",
        eventos: [
          "Campeão no Torneio em Realança na Mega Arena (Categoria C).",
          "Campeão no Torneio de Francisco Beltrão FPT 1600 na Arena Beltrão.",
          "Finalista no Grand Slam 2500 Nível Estadual (Categoria C)."
        ],
        imagens: [
          "https://images.unsplash.com/photo-1560012307-9b1b2e7f5b04?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1622279457486-28f993f78ade?q=80&w=800&auto=format&fit=crop"
        ]
      }
    ]
  },
  
  // Cursos e Treinamentos
  cursosTreinamentos: {
    titulo: "Cursos e Treinamentos",
    cursos: [
      {
        nome: "Módulo CBT Verde",
        instituicao: "Treinamentos BT",
        ano: "2024",
        descricao: "Fundamentos básicos do beach tennis, incluindo técnicas de saque, voleio e smash, e estratégias simples."
      },
      {
        nome: "Módulo CBT Amarelo",
        instituicao: "Treinamentos BT",
        ano: "2024",
        descricao: "Técnicas avançadas e estratégias para jogos de dupla, posicionamento e comunicação."
      },
      {
        nome: "Módulo CBT Azul",
        instituicao: "Treinamentos BT",
        ano: "2024",
        descricao: "Treinamento especializado para competições, condicionamento físico e mental, e estratégias avançadas."
      },
      {
        nome: "Curso de Árbitro de Beach Tennis",
        instituicao: "Federação Paranaense de Tênis",
        ano: "2024",
        descricao: "Regras e procedimentos para arbitrar partidas oficiais."
      }
    ]
  },
  
  // Objetivos Futuros
  objetivosFuturos: {
    titulo: "Objetivos Futuros",
    curtoPrazo: {
      titulo: "Metas de Curto Prazo (2025-2026)",
      metas: [
        "Aperfeiçoar habilidades técnicas para competir em alto nível.",
        "Participar dos principais eventos estaduais e consolidar posição no ranking regional."
      ]
    },
    longoPrazo: {
      titulo: "Metas de Longo Prazo (2027-2030)",
      metas: [
        "Ficar entre os quatro primeiros no ranking do Paraná, visando disputar a Copa das Federações.",
        "Expandir parcerias estratégicas com patrocinadores e empresas que compartilhem da minha visão e paixão pelo esporte."
      ]
    }
  },
  
  // Parcerias Estratégicas
  parceriasEstrategicas: {
    titulo: "Parcerias Estratégicas",
    descricao: "Estou aberto a colaborar com patrocinadores e empresas que compartilhem da minha visão e paixão pelo esporte. Essas parcerias são uma via eficaz para atrair mais pessoas e aumentar o engajamento com as marcas e serviços, gerando benefícios mútuos.",
    beneficios: [
      "Divulgação nas redes sociais, com postagens e stories destacando a marca.",
      "Promoção em eventos, com exposição do logotipo em uniformes, materiais esportivos e banners durante competições e treinos.",
      "Menções em entrevistas para mídias esportivas e regionais.",
      "Participação em campanhas publicitárias e eventos promocionais."
    ],
    exemplos: "Exemplos de parcerias incluem empresas de equipamentos esportivos, academias, clubes e mídias locais."
  },
  
  // Estatísticas
  estatisticas: {
    alunosAtivos: 35,
    posicaoRanking: "10ª",
    torneiosVencidos: 3
  },
  
  // Depoimentos
  depoimentos: [
    {
      nome: "Carlos Silva",
      categoria: "Aluno - Categoria C",
      texto: "As aulas com o Luiz transformaram meu jogo. Em poucos meses, evoluí muito tecnicamente e consegui subir de categoria. Recomendo a todos!",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      avaliacao: 5
    },
    {
      nome: "Ana Oliveira",
      categoria: "Aluna - Iniciante",
      texto: "Comecei do zero com o Luiz e em poucas aulas já estava jogando com confiança. A didática dele é excelente, explica tudo com muita paciência.",
      foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      avaliacao: 5
    },
    {
      nome: "Roberto Mendes",
      categoria: "Aluno - Categoria A",
      texto: "Mesmo sendo um jogador avançado, as mentorias do Luiz me ajudaram a aprimorar aspectos técnicos e táticos que fizeram toda diferença nas competições.",
      foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      avaliacao: 5
    }
  ],
  
  // Galeria de fotos
  galeria: [
    {
      titulo: "Torneio Regional 2024",
      url: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop",
      descricao: "Participação no Torneio Regional de Beach Tennis 2024"
    },
    {
      titulo: "Aula em Grupo",
      url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=800&auto=format&fit=crop",
      descricao: "Aula em grupo com alunos iniciantes"
    },
    {
      titulo: "Torneio de Francisco Beltrão",
      url: "https://images.unsplash.com/photo-1560012307-9b1b2e7f5b04?q=80&w=800&auto=format&fit=crop",
      descricao: "Campeão no Torneio de Francisco Beltrão FPT 1600"
    },
    {
      titulo: "Grand Slam 2500",
      url: "https://images.unsplash.com/photo-1622279457486-28f993f78ade?q=80&w=800&auto=format&fit=crop",
      descricao: "Finalista no Grand Slam 2500 Nível Estadual"
    }
  ],
  
  // Serviços oferecidos
  servicos: [
    {
      titulo: "Aulas de Beach Tennis",
      icone: "fas fa-table-tennis",
      descricao: "Aulas para todos os níveis, desde iniciantes até avançados.",
      detalhes: [
        "Aulas para todos os níveis: iniciante ao avançado.",
        "Aulas individuais ou em grupo.",
        "Metodologia personalizada para cada aluno.",
        "Desenvolvimento técnico, tático e físico.",
        "Preparação para competições."
      ]
    },
    {
      titulo: "Arbitragem Profissional",
      icone: "fas fa-flag-checkered",
      descricao: "Serviços de arbitragem para torneios e competições.",
      detalhes: [
        "Arbitragem em torneios e competições.",
        "Organização de chaves e tabelas.",
        "Aplicação das regras oficiais do esporte.",
        "Gestão de conflitos durante partidas.",
        "Consultoria para organização de eventos."
      ]
    },
    {
      titulo: "Mentorias Especializadas",
      icone: "fas fa-lightbulb",
      descricao: "Acompanhamento personalizado para desenvolvimento de atletas.",
      detalhes: [
        "Acompanhamento personalizado para atletas.",
        "Planejamento de carreira esportiva.",
        "Análise técnica e tática de jogos.",
        "Preparação mental para competições.",
        "Desenvolvimento de estratégias de jogo."
      ]
    },
    {
      titulo: "Parcerias Estratégicas",
      icone: "fas fa-bullhorn",
      descricao: "Colaboração com marcas e empresas para promoção mútua.",
      detalhes: [
        "Divulgação nas redes sociais, com postagens e stories destacando a marca.",
        "Promoção em eventos, com exposição do logotipo em uniformes e materiais.",
        "Menções em entrevistas para mídias esportivas e regionais.",
        "Participação em campanhas publicitárias e eventos promocionais.",
        "Parcerias com equipamentos esportivos, academias, clubes e mídias locais."
      ]
    }
  ]
};
