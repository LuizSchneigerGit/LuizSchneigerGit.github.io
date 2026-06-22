/**
 * Arquivo de dados do portfólio de Luiz Henrique Schneiger
 * Este arquivo contém todos os dados estruturados do portfólio para alimentar o site.
 * Edite aqui (ou pelo painel admin) para atualizar o conteúdo.
 */

const portfolioData = {
  // Informações básicas
  informacoesBasicas: {
    nome: "Luiz Henrique Schneiger",
    profissao: "Atleta e Professor de Beach Tennis",
    email: "Luiz.schneiger@gmail.com",
    telefone: "(46) 99115-5082",
    instagram: "@LuizSchneigerBT",
    patrocinador: "Ama Sport",
    fotoPerfil: "assets/img/profile.jpg",
    fotoHero: "assets/img/hero.jpg",
    fotoSobre: "assets/img/about.jpg"
  },

  // Resumo inicial (texto de abertura do hero)
  resumoInicial: {
    titulo: "Resumo Inicial",
    conteudo: "Sou Luiz Henrique Schneiger, atleta e professor de Beach Tennis na região de Pato Branco (PR). Há dois anos e meio dedico-me ao Beach Tennis, somando essa caminhada a uma base sólida construída no tênis, o que acelerou minha evolução técnica e competitiva. Atuo nas duas frentes que mais me movem: a competição de alto rendimento e o ensino, levando o esporte a alunos de todos os níveis. Tenho orgulho de contar com o apoio da Ama Sport, minha patrocinadora oficial, parceira que caminha comigo dentro e fora das quadras."
  },

  // Objetivos do portfólio
  objetivosPortfolio: {
    titulo: "Objetivos do Portfólio",
    itens: [
      "Apresentar minha trajetória esportiva e minha evolução no Beach Tennis.",
      "Atrair e fortalecer parcerias com marcas que compartilham minha paixão pelo esporte.",
      "Reforçar minha imagem profissional como atleta, professor e árbitro.",
      "Ampliar conexões com organizadores de torneios, treinadores e outros atletas."
    ]
  },

  // Trajetória no Beach Tennis
  trajetoria: {
    titulo: "Trajetória no Beach Tennis",
    conteudo: "Há dois anos e meio no Beach Tennis, trouxe do tênis uma base sólida que acelerou minha evolução. Participo de torneios regionais e estaduais que desafiam minhas habilidades e contribuem para meu desenvolvimento técnico e mental, sempre com o apoio da minha patrocinadora oficial, a Ama Sport."
  },

  // Atleta e Professor (seção "Sobre Mim")
  atletaProfessor: {
    titulo: "Atleta e Professor",
    paragrafos: [
      "Minha trajetória no Beach Tennis começou há dois anos e meio, sustentada pela vivência que trago do tênis. Essa transição acelerou meu desenvolvimento e me deu repertório técnico e tático para competir e, ao mesmo tempo, ensinar. Hoje divido minha rotina entre o treino de alto rendimento e a sala de aula, sempre com o respaldo da minha patrocinadora oficial, a Ama Sport.",
      "Como professor, atendo às segundas e terças-feiras, das 16h às 21h, com uma metodologia personalizada que acompanha o aluno do iniciante ao avançado. O trabalho é estruturado em quatro pilares: técnica, tática, preparo físico e aspecto mental. A proposta é fazer com que cada pessoa evolua no próprio ritmo, com fundamentos sólidos e leitura de jogo, mantendo o prazer de praticar o esporte.",
      "Competir e ensinar se retroalimentam: o que aprendo nos torneios chega direto às aulas, e a didática me torna um atleta mais consciente. É esse conjunto — experiência de quadra somada ao método de ensino — que ofereço a alunos, parceiros e patrocinadores."
    ]
  },

  // Participações em Eventos/Torneios (linha do tempo "Experiência")
  participacoesTorneios: {
    titulo: "Participações em Eventos/Torneios",
    anos: [
      {
        ano: "2024",
        eventos: [
          "10º lugar no Ranking Regional (Categoria C).",
          "Participações nos Interclubes Regionais e no Estadual."
        ],
        imagens: []
      },
      {
        ano: "2025",
        eventos: [
          "14º lugar no Estadual (Categoria masculina C).",
          "Participação na final estadual."
        ],
        imagens: []
      },
      {
        ano: "2026",
        eventos: [
          "Título do FPT 2000 (Categoria B)."
        ],
        imagens: []
      }
    ]
  },

  // Cursos e Treinamentos (linha do tempo "Formação")
  cursosTreinamentos: {
    titulo: "Cursos e Treinamentos",
    cursos: [
      {
        nome: "Módulo CBT Verde",
        instituicao: "Treinamentos BT",
        ano: "2024",
        descricao: "Fundamentos básicos do Beach Tennis, incluindo técnicas de saque, voleio e smash, e estratégias simples."
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
      },
      {
        nome: "Curso Nacional de Arbitragem Auxiliar",
        instituicao: "Federação Paranaense de Tênis",
        ano: "Maio/2025",
        descricao: "Formação em arbitragem auxiliar realizada pela FPT em maio de 2025, voltada ao apoio na condução de partidas oficiais e à aplicação correta das regras em quadra."
      },
      {
        nome: "Curso de Arbitragem Geral Estadual",
        instituicao: "Confederação Brasileira de Tênis",
        ano: "Maio/2026",
        descricao: "Capacitação em arbitragem geral realizada pela CBT em maio de 2026, ampliando minha atuação na arbitragem de competições no âmbito estadual."
      },
      {
        nome: "Curso de Preparação Física Integrada ao Beach Tennis",
        instituicao: "Federação Paranaense de Tênis",
        ano: "Set/2026",
        descricao: "Formação pela FPT, prevista para setembro de 2026, focada em integrar o preparo físico à demanda específica do Beach Tennis, beneficiando tanto meu rendimento quanto o trabalho com os alunos."
      }
    ]
  },

  // Objetivos Futuros (carrossel "Objetivos")
  objetivosFuturos: {
    titulo: "Objetivos Futuros",
    curtoPrazo: {
      titulo: "Metas de Curto Prazo (2026-2027)",
      metas: [
        "Consolidar minha presença na Categoria B após o título conquistado no FPT 2000, buscando regularidade de resultados nos torneios regionais e estaduais.",
        "Evoluir como professor e como árbitro, aplicando na prática as formações recentes em arbitragem e preparação física.",
        "Fortalecer a parceria com a Ama Sport e atrair novas marcas alinhadas à minha trajetória."
      ]
    },
    longoPrazo: {
      titulo: "Metas de Longo Prazo (2028-2031)",
      metas: [
        "Lutar por um título estadual e disputar as primeiras posições na Categoria B, com a aspiração de avançar de nível.",
        "Estruturar e ampliar meu trabalho como professor e mentor, buscando consolidar uma metodologia de referência na região de Pato Branco.",
        "Construir parcerias estratégicas duradouras com patrocinadores, ampliando minha presença no cenário do Beach Tennis."
      ]
    }
  },

  // Parcerias Estratégicas (conteúdo de apoio)
  parceriasEstrategicas: {
    titulo: "Parcerias Estratégicas",
    descricao: "Tenho orgulho de contar com a Ama Sport como minha patrocinadora oficial e estou aberto a novas colaborações com marcas que compartilhem minha paixão pelo esporte. Essas parcerias geram exposição e valor mútuo dentro e fora das quadras.",
    beneficios: [
      "Divulgação nas redes sociais, com postagens e stories destacando a marca.",
      "Exposição do logotipo em uniformes, materiais esportivos e banners durante competições e treinos.",
      "Menções em entrevistas para mídias esportivas e regionais.",
      "Participação em campanhas publicitárias e eventos promocionais."
    ],
    exemplos: "Patrocinadora oficial atual: Ama Sport."
  },

  // Estatísticas (3 contadores da seção "Sobre") — valor + rótulo
  estatisticas: [
    { valor: "2,5", rotulo: "Anos no<br>Beach Tennis" },
    { valor: "14º", rotulo: "Ranking<br>Estadual (Cat. C)" },
    { valor: "FPT 2000", rotulo: "Título<br>(Cat. B)" }
  ],

  // Galeria de fotos (carrossel "Portfólio — Conquistas recentes")
  galeria: [
    {
      titulo: "Título FPT 2000 — Categoria B",
      url: "assets/img/portfolio1.jpg",
      descricao: "Campeão do FPT 2000 na Categoria B (2026)."
    },
    {
      titulo: "Final do Estadual — Categoria C",
      url: "assets/img/portfolio2.jpg",
      descricao: "14º lugar e participação na final estadual (Categoria masculina C, 2025)."
    },
    {
      titulo: "Ranking Regional e Interclubes",
      url: "assets/img/portfolio3.jpg",
      descricao: "10º no Ranking Regional (Categoria C) e participações nos Interclubes (2024)."
    },
    {
      titulo: "Aulas e treinos",
      url: "assets/img/about.jpg",
      descricao: "Treinos e aulas de Beach Tennis na região de Pato Branco."
    }
  ],

  // Serviços oferecidos (4 cards)
  servicos: [
    {
      titulo: "Aulas",
      icone: "fas fa-table-tennis-paddle-ball",
      descricao: "Aulas de Beach Tennis para todos os níveis, do iniciante ao avançado, às segundas e terças-feiras, das 16h às 21h, com metodologia personalizada.",
      detalhes: [
        "Atendimento do iniciante ao avançado, respeitando o ritmo de cada aluno.",
        "Metodologia personalizada construída sobre quatro pilares: técnica, tática, preparo físico e aspecto mental.",
        "Aulas às segundas e terças-feiras, das 16h às 21h.",
        "Construção de fundamentos sólidos e leitura de jogo.",
        "Preparação orientada para a evolução competitiva."
      ]
    },
    {
      titulo: "Mentoria",
      icone: "fas fa-lightbulb",
      descricao: "Acompanhamento individualizado para atletas que querem evoluir de forma estruturada, com foco em desempenho e tomada de decisão em quadra.",
      detalhes: [
        "Plano de evolução personalizado para o atleta.",
        "Análise técnica e tática do jogo.",
        "Trabalho de preparo físico aplicado ao Beach Tennis.",
        "Preparação mental para competições.",
        "Definição de estratégias para torneios e categorias."
      ]
    },
    {
      titulo: "Arbitragem",
      icone: "fas fa-flag-checkered",
      descricao: "Atuação em arbitragem de Beach Tennis com formação pela FPT e pela CBT, garantindo a aplicação correta das regras em treinos e competições.",
      detalhes: [
        "Aplicação das regras oficiais em partidas e torneios.",
        "Formação em arbitragem auxiliar e geral pela FPT (Federação Paranaense de Tênis) e pela CBT (Confederação Brasileira de Tênis).",
        "Apoio na organização de chaves e no andamento dos jogos.",
        "Gestão de situações e conflitos durante as partidas.",
        "Suporte técnico para organizadores de eventos."
      ]
    },
    {
      titulo: "Parcerias Estratégicas",
      icone: "fas fa-handshake",
      descricao: "Colaboração com marcas que compartilham a paixão pelo esporte, gerando exposição e valor mútuo dentro e fora das quadras. Tenho orgulho de já contar com a Ama Sport como minha patrocinadora oficial.",
      detalhes: [
        "Exposição de marca em uniformes e materiais durante treinos e competições.",
        "Divulgação nas redes sociais, com postagens e stories.",
        "Menções em entrevistas para mídias esportivas e regionais.",
        "Participação em ações e campanhas promocionais.",
        "Vínculo próximo e duradouro, no modelo da parceria com a Ama Sport."
      ]
    }
  ]
};
