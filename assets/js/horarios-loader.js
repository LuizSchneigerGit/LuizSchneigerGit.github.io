/**
 * Carrega os horários, vagas (máx. 4, com destaque para poucas vagas),
 * alerta de aula experimental, dicas/endereço, modal de agendamento
 * (nível + foco) e formulário de dúvidas — tudo via WhatsApp.
 */
(function () {
  function go() {
    if (typeof horariosData === 'undefined') return;
    const grid = horariosData.configGrid;
    const contato = horariosData.contato;
    const container = document.querySelector('.horarios__container');
    if (!container) return;

    function waUrl(texto) {
      return 'https://wa.me/' + contato.whatsapp + '?text=' + encodeURIComponent(texto);
    }
    function buscarAula(dia, horario) {
      const d = horariosData.horarios.find(x => x.dia === dia);
      return d ? (d.aulas.find(a => a.horario === horario) || null) : null;
    }
    function bookable(aula) { return aula && aula.disponivel && (aula.vagas === undefined || aula.vagas > 0); }
    function vagasInfo(aula) {
      const v = aula.vagas === undefined ? 4 : aula.vagas;
      if (!aula.disponivel || v <= 0) return { txt: 'Turma cheia', cls: 'is-cheia' };
      if (v === 1) return { txt: 'Última vaga!', cls: 'is-urgente' };
      if (v === 2) return { txt: 'Restam 2 vagas', cls: 'is-poucas' };
      return { txt: v + ' vagas', cls: 'is-ok' };
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

    // ---- Alerta de aula experimental ----
    const temExperimental = horariosData.horarios.some(d =>
      d.aulas.some(a => a.categoria === 'experimental' && bookable(a)));
    if (temExperimental) {
      const alerta = document.createElement('div');
      alerta.className = 'horarios__alerta';
      alerta.innerHTML =
        '<span class="horarios__alerta-ic"><i class="fas fa-star"></i></span>' +
        '<span><strong>Aula experimental disponível!</strong> Venha conhecer o Beach Tennis — agende a sua e experimente sem compromisso.</span>';
      container.appendChild(alerta);
    }

    // ---- Legenda ----
    const legenda = document.createElement('div');
    legenda.className = 'horarios__legenda';
    Object.values(grid.categorias).forEach(cat => {
      const item = document.createElement('div');
      item.className = 'horarios__legenda-item';
      const cor = document.createElement('span');
      cor.className = 'horarios__legenda-cor';
      cor.style.backgroundColor = cat.cor;
      const nome = document.createElement('span');
      nome.className = 'horarios__legenda-nome';
      nome.textContent = cat.nome;
      item.appendChild(cor); item.appendChild(nome);
      legenda.appendChild(item);
    });
    container.appendChild(legenda);

    // Cria o conteúdo interno de uma aula (categoria, vagas, obs, ação)
    function conteudoAula(aula, categoria, contexto) {
      const info = document.createElement('div');
      info.className = 'horarios__info';
      const vi = vagasInfo(aula);
      const acao = bookable(aula)
        ? '<span class="horarios__whatsapp"><i class="fab fa-whatsapp"></i> Agendar</span>'
        : '';
      info.innerHTML =
        '<span class="horarios__categoria">' + categoria.nome + '</span>' +
        '<span class="horarios__vagas ' + vi.cls + '">' + vi.txt + '</span>' +
        (aula.observacao ? '<span class="horarios__obs">' + aula.observacao + '</span>' : '') +
        acao;
      return info;
    }

    // ============ TABELA (desktop) ============
    const tabelaWrap = document.createElement('div');
    tabelaWrap.className = 'horarios__tabela-wrap';
    const tabela = document.createElement('div');
    tabela.className = 'horarios__tabela';
    tabela.style.setProperty('--cols', grid.diasSemana.length);

    const cab = document.createElement('div');
    cab.className = 'horarios__cabecalho';
    cab.appendChild(celula('horarios__celula horarios__celula-cabecalho', ''));
    grid.diasSemana.forEach(d => cab.appendChild(celula('horarios__celula horarios__celula-cabecalho', d)));
    tabela.appendChild(cab);

    grid.horarios.forEach(horario => {
      const linha = document.createElement('div');
      linha.className = 'horarios__linha';
      linha.appendChild(celula('horarios__celula horarios__celula-horario', horario));
      grid.diasSemana.forEach(dia => {
        const cel = document.createElement('div');
        cel.className = 'horarios__celula';
        const aula = buscarAula(dia, horario);
        if (aula) {
          const categoria = grid.categorias[aula.categoria];
          if (categoria) {
            cel.style.backgroundColor = categoria.cor;
            cel.classList.add('horarios__celula-aula');
            if (bookable(aula)) {
              cel.classList.add('horarios__celula-disponivel');
              if (aula.vagas <= 2) cel.classList.add('horarios__celula-poucas');
              const btn = document.createElement('a');
              btn.href = '#';
              btn.className = 'horarios__link';
              btn.appendChild(conteudoAula(aula, categoria));
              btn.addEventListener('click', function (e) { e.preventDefault(); abrirAgendamento(dia, horario, aula.categoria); });
              cel.appendChild(btn);
            } else {
              cel.classList.add('horarios__celula-indisponivel');
              cel.appendChild(conteudoAula(aula, categoria));
            }
          }
        }
        linha.appendChild(cel);
      });
      tabela.appendChild(linha);
    });
    tabelaWrap.appendChild(tabela);
    container.appendChild(tabelaWrap);

    // ============ CARTÕES (mobile) ============
    const cards = document.createElement('div');
    cards.className = 'horarios__cards';
    horariosData.horarios.forEach(diaDados => {
      if (!diaDados.aulas || !diaDados.aulas.length) return;
      const card = document.createElement('div');
      card.className = 'horarios__card';
      const head = document.createElement('h3');
      head.className = 'horarios__card-dia';
      head.textContent = diaDados.dia;
      card.appendChild(head);

      diaDados.aulas.slice().sort((a, b) => a.horario.localeCompare(b.horario)).forEach(aula => {
        const categoria = grid.categorias[aula.categoria];
        if (!categoria) return;
        const livre = bookable(aula);
        const linha = document.createElement(livre ? 'a' : 'div');
        linha.className = 'horarios__card-aula' + (livre ? ' is-disponivel' : ' is-indisponivel');
        if (aula.vagas <= 2 && livre) linha.classList.add('is-poucas');
        linha.style.borderLeftColor = categoria.cor;
        if (livre) { linha.href = '#'; linha.addEventListener('click', function (e) { e.preventDefault(); abrirAgendamento(diaDados.dia, aula.horario, aula.categoria); }); }

        const hora = document.createElement('span');
        hora.className = 'horarios__card-hora';
        hora.textContent = aula.horario;

        const meio = document.createElement('div');
        meio.className = 'horarios__card-meio';
        const vi = vagasInfo(aula);
        meio.innerHTML =
          '<span class="horarios__card-cat" style="color:' + categoria.cor + '">' + categoria.nome + '</span>' +
          '<span class="horarios__vagas ' + vi.cls + '">' + vi.txt + '</span>' +
          (aula.observacao ? '<span class="horarios__card-obs">' + aula.observacao + '</span>' : '');

        const acao = document.createElement('span');
        acao.className = 'horarios__card-acao';
        acao.innerHTML = livre ? '<i class="fab fa-whatsapp"></i> Agendar' : '<i class="fas fa-lock"></i> Cheia';

        linha.appendChild(hora); linha.appendChild(meio); linha.appendChild(acao);
        card.appendChild(linha);
      });
      cards.appendChild(card);
    });
    container.appendChild(cards);

    // ============ DICAS + ENDEREÇO ============
    if (Array.isArray(horariosData.dicas) && horariosData.dicas.length) {
      const box = document.createElement('div');
      box.className = 'horarios__dicas';
      const h3 = document.createElement('h3');
      h3.textContent = horariosData.dicasTitulo || 'Dicas para o nosso treino';
      box.appendChild(h3);
      horariosData.dicas.forEach(d => {
        const item = document.createElement('div');
        item.className = 'horarios__dica';
        item.innerHTML =
          '<span class="horarios__dica-ic"><i class="' + (d.icone || 'fas fa-circle-info') + '"></i></span>' +
          '<p><strong>' + d.titulo + ':</strong> ' + d.texto + '</p>';
        box.appendChild(item);
      });
      if (horariosData.endereco) {
        const end = document.createElement('div');
        end.className = 'horarios__endereco';
        end.innerHTML =
          '<span class="horarios__dica-ic"><i class="fas fa-location-dot"></i></span>' +
          '<p><strong>' + (horariosData.endereco.titulo || 'Endereço') + ':</strong> ' + horariosData.endereco.texto +
          (horariosData.endereco.mapsUrl ? ' <a class="horarios__maps" href="' + horariosData.endereco.mapsUrl + '" target="_blank" rel="noopener"><i class="fas fa-map-location-dot"></i> Abrir no Maps</a>' : '') +
          '</p>';
        box.appendChild(end);
      }
      container.appendChild(box);
    }

    // ============ MODAL DE AGENDAMENTO ============
    const modal = document.getElementById('agendamento-modal');
    const agTitulo = document.getElementById('ag-titulo');
    const agNivel = document.getElementById('ag-nivel');
    const agFocos = document.getElementById('ag-focos');
    let agAtual = null;

    if (agNivel) {
      agNivel.innerHTML = '';
      Object.keys(grid.categorias).forEach(chave => {
        const o = document.createElement('option');
        o.value = chave; o.textContent = grid.categorias[chave].nome;
        agNivel.appendChild(o);
      });
    }
    if (agFocos) {
      agFocos.innerHTML = '';
      (horariosData.focosAprendizado || []).forEach(f => {
        const lab = document.createElement('label');
        lab.className = 'ag__check';
        lab.innerHTML = '<input type="checkbox" value="' + f + '"><span>' + f + '</span>';
        agFocos.appendChild(lab);
      });
    }

    function abrirAgendamento(dia, horario, categoriaChave) {
      agAtual = { dia: dia, horario: horario };
      if (agTitulo) agTitulo.textContent = dia + ' às ' + horario;
      if (agNivel && categoriaChave) agNivel.value = categoriaChave;
      if (agFocos) agFocos.querySelectorAll('input').forEach(i => { i.checked = false; });
      const nome = document.getElementById('ag-nome'); if (nome) nome.value = '';
      const info = document.getElementById('ag-info'); if (info) info.value = '';
      if (modal) { modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); }
    }
    function fecharAgendamento() {
      if (modal) { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); }
    }
    const agClose = document.getElementById('ag-close');
    if (agClose) agClose.addEventListener('click', fecharAgendamento);
    if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) fecharAgendamento(); });

    const agEnviar = document.getElementById('ag-enviar');
    if (agEnviar) agEnviar.addEventListener('click', function () {
      if (!agAtual) return;
      const nome = (document.getElementById('ag-nome') || {}).value || '';
      const nivelNome = agNivel ? (grid.categorias[agNivel.value] ? grid.categorias[agNivel.value].nome : agNivel.value) : '';
      const focos = agFocos ? Array.prototype.slice.call(agFocos.querySelectorAll('input:checked')).map(i => i.value) : [];
      const info = (document.getElementById('ag-info') || {}).value || '';
      let msg = (contato.mensagemPadrao || 'Olá! Quero agendar uma aula de Beach Tennis.') + '\n\n';
      msg += '*Dia/horário:* ' + agAtual.dia + ' às ' + agAtual.horario + '\n';
      msg += '*Nível:* ' + nivelNome + '\n';
      if (focos.length) msg += '*Foco:* ' + focos.join(', ') + '\n';
      if (nome.trim()) msg += '*Nome:* ' + nome.trim() + '\n';
      if (info.trim()) msg += '*Mais informações:* ' + info.trim() + '\n';
      window.open(waUrl(msg), '_blank', 'noopener');
      fecharAgendamento();
    });

    // ============ DÚVIDAS ============
    const dvEnviar = document.getElementById('duvida-enviar');
    if (dvEnviar) dvEnviar.addEventListener('click', function () {
      const t = (document.getElementById('duvida-texto') || {}).value || '';
      if (!t.trim()) { alert('Escreva sua dúvida primeiro.'); return; }
      window.open(waUrl('Olá! Tenho uma dúvida sobre as aulas de Beach Tennis:\n\n' + t.trim()), '_blank', 'noopener');
    });

    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharAgendamento(); });

    function celula(cls, txt) {
      const c = document.createElement('div');
      c.className = cls; c.textContent = txt;
      return c;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();
})();
