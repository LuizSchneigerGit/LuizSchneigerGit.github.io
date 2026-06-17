/**
 * Arquivo de configuração de horários de aula de Beach Tennis
 * Gerado/editado pelo painel admin (admin.html).
 * Cada aula tem "vagas" (0 a 4): 0 = turma cheia; 1 ou 2 = poucas vagas (destaque).
 */

const horariosData = {
  "configGrid": {
    "diasSemana": [
      "Segunda",
      "Terça"
    ],
    "horarios": [
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00"
    ],
    "categorias": {
      "experimental": {
        "nome": "Experimental",
        "cor": "#4CAF50",
        "descricao": "Aula experimental para novos alunos"
      },
      "iniciante": {
        "nome": "Iniciante",
        "cor": "#FFC107",
        "descricao": "Para alunos que estão começando no esporte"
      },
      "categoriaE": {
        "nome": "Categoria E",
        "cor": "#2196F3",
        "descricao": "Para alunos de nível básico"
      },
      "categoriaD": {
        "nome": "Categoria D",
        "cor": "#03A9F4",
        "descricao": "Para alunos de nível intermediário-básico"
      },
      "categoriaC": {
        "nome": "Categoria C",
        "cor": "#00BCD4",
        "descricao": "Para alunos de nível intermediário"
      },
      "categoriaB": {
        "nome": "Categoria B",
        "cor": "#FF9800",
        "descricao": "Para alunos de nível intermediário-avançado"
      },
      "categoriaA": {
        "nome": "Categoria A",
        "cor": "#FF5722",
        "descricao": "Para alunos de nível avançado"
      },
      "profissional": {
        "nome": "Profissional",
        "cor": "#F44336",
        "descricao": "Para atletas profissionais"
      }
    }
  },
  "horarios": [
    {
      "dia": "Segunda",
      "aulas": [
        { "horario": "16:00", "categoria": "experimental", "disponivel": true, "vagas": 4, "observacao": "Horário disponível" },
        { "horario": "18:00", "categoria": "categoriaD", "disponivel": true, "vagas": 2, "observacao": "Categoria E/D" },
        { "horario": "20:00", "categoria": "categoriaE", "disponivel": true, "vagas": 2, "observacao": "Treino de casal nível E/D" },
        { "horario": "17:00", "categoria": "categoriaE", "disponivel": false, "vagas": 0, "observacao": "" },
        { "horario": "19:00", "categoria": "categoriaD", "disponivel": false, "vagas": 0, "observacao": "" },
        { "horario": "21:00", "categoria": "experimental", "disponivel": true, "vagas": 4, "observacao": "Horário livre" }
      ]
    },
    {
      "dia": "Terça",
      "aulas": [
        { "horario": "16:00", "categoria": "experimental", "disponivel": true, "vagas": 4, "observacao": "Horário livre" },
        { "horario": "17:00", "categoria": "experimental", "disponivel": true, "vagas": 4, "observacao": "Horário livre" },
        { "horario": "18:00", "categoria": "experimental", "disponivel": true, "vagas": 2, "observacao": "Categoria E" },
        { "horario": "19:00", "categoria": "categoriaE", "disponivel": true, "vagas": 1, "observacao": "Categoria E/D" },
        { "horario": "20:00", "categoria": "experimental", "disponivel": true, "vagas": 4, "observacao": "Horário livre" },
        { "horario": "21:00", "categoria": "experimental", "disponivel": true, "vagas": 4, "observacao": "Horário livre" }
      ]
    }
  ],
  "contato": {
    "whatsapp": "5546991155082",
    "mensagemPadrao": "Olá, gostaria de agendar uma aula de Beach Tennis!",
    "instrucoes": "Clique no horário desejado para agendar sua aula."
  },
  "vagasMaximo": 4,
  "focosAprendizado": [
    "Sou novo no esporte",
    "Queima de calorias",
    "Sair do sedentarismo",
    "Aprimoramento de técnica"
  ],
  "dicasTitulo": "Dicas para o nosso treino",
  "dicas": [
    {
      "titulo": "Horário",
      "icone": "fas fa-clock",
      "texto": "Nossas aulas têm duração de 50 a 55 minutos. Pedimos que tente chegar 10 minutos antes do horário agendado; esse tempinho é fundamental para você se organizar, trocar o calçado e já entrar no clima, garantindo que possamos iniciar nossa aula pontualmente."
    },
    {
      "titulo": "Equipamento",
      "icone": "fas fa-table-tennis-paddle-ball",
      "texto": "Está começando agora ou esqueceu a raquete? Sem problemas! Nós disponibilizamos raquetes para empréstimo durante a aula."
    },
    {
      "titulo": "Vestuário",
      "icone": "fas fa-shirt",
      "texto": "O ideal é vir com roupas leves e bem confortáveis para facilitar o movimento na areia. Em dias de frio, você pode usar sapatilhas de neoprene ou botinhas próprias para areia — elas mantêm o pé aquecido sem atrapalhar o jogo."
    },
    {
      "titulo": "Ambiente",
      "icone": "fas fa-umbrella-beach",
      "texto": "Nossa estrutura conta com quadras totalmente cobertas, ou seja, nosso treino está garantido, independente do clima lá fora."
    }
  ],
  "endereco": {
    "titulo": "Endereço das aulas",
    "texto": "Arena Sun7 Sports — Estrada Municipal Pioneiro Francisco Simionato, Área Rural, Pato Branco - PR, 85513-899",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Arena%20Sun7%20Sports%2C%20Estrada%20Municipal%20Pioneiro%20Francisco%20Simionato%2C%20Pato%20Branco%20-%20PR%2C%2085513-899"
  }
};
