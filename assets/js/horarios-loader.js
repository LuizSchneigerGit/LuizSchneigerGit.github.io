/**
 * Script para carregar dinamicamente os dados de horários na página.
 * Gera DUAS visões a partir dos mesmos dados:
 *  - Tabela (matriz dias × horários) — exibida em telas largas
 *  - Cartões por dia — exibidos em telas pequenas (melhor no celular)
 * O CSS (schedule.css) decide qual exibir conforme a largura.
 */

(function () {
  function go() {
  const container = document.querySelector('.horarios__container');
  if (!container || typeof horariosData === 'undefined') return;

  const grid = horariosData.configGrid;
  const contato = horariosData.contato;

  function linkWhatsApp(dia, horario) {
    return 'https://wa.me/' + contato.whatsapp +
      '?text=' + encodeURIComponent(contato.mensagemPadrao + ' ' + dia + ' às ' + horario);
  }

  function buscarAula(dia, horario) {
    const diaDados = horariosData.horarios.find(d => d.dia === dia);
    if (!diaDados) return null;
    return diaDados.aulas.find(a => a.horario === horario) || null;
  }

  container.innerHTML = '';

  // ---- Título + subtítulo ----
  const titulo = document.createElement('h2');
  titulo.className = 'section__title';
  titulo.textContent = 'Horários de Aula';
  container.appendChild(titulo);

  const subtitulo = document.createElement('span');
  subtitulo.className = 'section__subtitle';
  subtitulo.textContent = contato.instrucoes;
  container.appendChild(subtitulo);

  // ---- Legenda de categorias ----
  const legenda = document.createElement('div');
  legenda.className = 'horarios__legenda';
  Object.values(grid.categorias).forEach(categoria => {
    const item = document.createElement('div');
    item.className = 'horarios__legenda-item';
    const cor = document.createElement('span');
    cor.className = 'horarios__legenda-cor';
    cor.style.backgroundColor = categoria.cor;
    const nome = document.createElement('span');
    nome.className = 'horarios__legenda-nome';
    nome.textContent = categoria.nome;
    item.appendChild(cor);
    item.appendChild(nome);
    legenda.appendChild(item);
  });
  container.appendChild(legenda);

  // ============================================================
  // VISÃO TABELA (desktop)
  // ============================================================
  const tabelaWrap = document.createElement('div');
  tabelaWrap.className = 'horarios__tabela-wrap';

  const tabela = document.createElement('div');
  tabela.className = 'horarios__tabela';
  tabela.style.setProperty('--cols', grid.diasSemana.length);

  // Cabeçalho
  const cabecalho = document.createElement('div');
  cabecalho.className = 'horarios__cabecalho';
  cabecalho.appendChild(criarCelula('horarios__celula horarios__celula-cabecalho', ''));
  grid.diasSemana.forEach(dia => {
    cabecalho.appendChild(criarCelula('horarios__celula horarios__celula-cabecalho', dia));
  });
  tabela.appendChild(cabecalho);

  // Linhas por horário
  grid.horarios.forEach(horario => {
    const linha = document.createElement('div');
    linha.className = 'horarios__linha';
    linha.appendChild(criarCelula('horarios__celula horarios__celula-horario', horario));

    grid.diasSemana.forEach(dia => {
      const celula = document.createElement('div');
      celula.className = 'horarios__celula';
      const aula = buscarAula(dia, horario);
      if (aula) {
        const categoria = grid.categorias[aula.categoria];
        if (categoria) {
          celula.style.backgroundColor = categoria.cor;
          celula.classList.add('horarios__celula-aula');
          if (aula.disponivel) {
            celula.classList.add('horarios__celula-disponivel');
            const link = document.createElement('a');
            link.href = linkWhatsApp(dia, horario);
            link.target = '_blank';
            link.rel = 'noopener';
            link.className = 'horarios__link';
            link.appendChild(infoAula(categoria.nome, aula.observacao, true));
            celula.appendChild(link);
          } else {
            celula.classList.add('horarios__celula-indisponivel');
            celula.appendChild(infoAula(categoria.nome, aula.observacao, false));
          }
        }
      }
      linha.appendChild(celula);
    });
    tabela.appendChild(linha);
  });

  tabelaWrap.appendChild(tabela);
  container.appendChild(tabelaWrap);

  // ============================================================
  // VISÃO CARTÕES (mobile)
  // ============================================================
  const cards = document.createElement('div');
  cards.className = 'horarios__cards';

  horariosData.horarios.forEach(diaDados => {
    if (!diaDados.aulas || diaDados.aulas.length === 0) return;

    const card = document.createElement('div');
    card.className = 'horarios__card';

    const head = document.createElement('h3');
    head.className = 'horarios__card-dia';
    head.textContent = diaDados.dia;
    card.appendChild(head);

    // Ordena as aulas pelo horário
    const aulas = diaDados.aulas.slice().sort((a, b) => a.horario.localeCompare(b.horario));
    aulas.forEach(aula => {
      const categoria = grid.categorias[aula.categoria];
      if (!categoria) return;

      const linha = document.createElement(aula.disponivel ? 'a' : 'div');
      linha.className = 'horarios__card-aula' + (aula.disponivel ? ' is-disponivel' : ' is-indisponivel');
      if (aula.disponivel) {
        linha.href = linkWhatsApp(diaDados.dia, aula.horario);
        linha.target = '_blank';
        linha.rel = 'noopener';
      }
      linha.style.borderLeftColor = categoria.cor;

      const hora = document.createElement('span');
      hora.className = 'horarios__card-hora';
      hora.textContent = aula.horario;

      const meio = document.createElement('div');
      meio.className = 'horarios__card-meio';
      const cat = document.createElement('span');
      cat.className = 'horarios__card-cat';
      cat.textContent = categoria.nome;
      cat.style.color = categoria.cor;
      meio.appendChild(cat);
      if (aula.observacao) {
        const obs = document.createElement('span');
        obs.className = 'horarios__card-obs';
        obs.textContent = aula.observacao;
        meio.appendChild(obs);
      }

      const acao = document.createElement('span');
      acao.className = 'horarios__card-acao';
      acao.innerHTML = aula.disponivel
        ? '<i class="fab fa-whatsapp"></i> Agendar'
        : '<i class="fas fa-lock"></i> Indisponível';

      linha.appendChild(hora);
      linha.appendChild(meio);
      linha.appendChild(acao);
      card.appendChild(linha);
    });

    cards.appendChild(card);
  });

  container.appendChild(cards);

  // ============================================================
  // Informações adicionais
  // ============================================================
  if (horariosData.informacoesAdicionais && horariosData.informacoesAdicionais.length > 0) {
    const infoContainer = document.createElement('div');
    infoContainer.className = 'horarios__info-adicionais';
    const infoTitulo = document.createElement('h3');
    infoTitulo.textContent = 'Informações Adicionais';
    infoContainer.appendChild(infoTitulo);
    const infoLista = document.createElement('ul');
    horariosData.informacoesAdicionais.forEach(info => {
      const li = document.createElement('li');
      li.textContent = info;
      infoLista.appendChild(li);
    });
    infoContainer.appendChild(infoLista);
    container.appendChild(infoContainer);
  }

  // ---- Helpers ----
  function criarCelula(className, texto) {
    const c = document.createElement('div');
    c.className = className;
    c.textContent = texto;
    return c;
  }

  function infoAula(nomeCategoria, observacao, disponivel) {
    const info = document.createElement('div');
    info.className = 'horarios__info';
    info.innerHTML =
      '<span class="horarios__categoria">' + nomeCategoria + '</span>' +
      (observacao ? '<span class="horarios__obs">' + observacao + '</span>' : '') +
      (disponivel ? '<span class="horarios__whatsapp"><i class="fab fa-whatsapp"></i> Agendar</span>' : '');
    return info;
  }
  }

  // Roda imediatamente se o DOM já estiver pronto (carregamento dinâmico),
  // ou aguarda o DOMContentLoaded caso contrário.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();
})();
