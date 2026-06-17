/**
 * Script para carregar dinamicamente os dados do portfólio na página
 */

(function () {
  function go() {
  if (typeof portfolioData === 'undefined') return;
  // Carregar informações básicas
  document.querySelector('.home__title').textContent = `Olá, sou ${portfolioData.informacoesBasicas.nome}`;
  document.querySelector('.home__subtitle').textContent = portfolioData.informacoesBasicas.profissao;
  document.querySelector('.home__description').textContent = portfolioData.resumoInicial.conteudo;
  
  // Atualizar links de redes sociais
  document.querySelectorAll('.home__social-icon')[0].href = `https://instagram.com/${portfolioData.informacoesBasicas.instagram.substring(1)}`;
  document.querySelectorAll('.home__social-icon')[1].href = `mailto:${portfolioData.informacoesBasicas.email}`;
  document.querySelectorAll('.home__social-icon')[2].href = `https://wa.me/${portfolioData.informacoesBasicas.telefone.replace(/[^0-9]/g, '')}`;
  
  // Atualizar imagens
  document.querySelector('.home__blob-img').setAttribute('href', portfolioData.informacoesBasicas.fotoHero);
  document.querySelector('.about__img img').src = portfolioData.informacoesBasicas.fotoSobre;
  
  // Atualizar estatísticas
  document.querySelectorAll('.about__info-title')[0].textContent = `${portfolioData.estatisticas.alunosAtivos}+`;
  document.querySelectorAll('.about__info-title')[1].textContent = portfolioData.estatisticas.posicaoRanking;
  document.querySelectorAll('.about__info-title')[2].textContent = `0${portfolioData.estatisticas.torneiosVencidos}+`;
  
  // Atualizar seção Sobre
  document.querySelector('.about__description').innerHTML = portfolioData.atletaProfessor.paragrafos.map(p => `<p>${p}</p>`).join('');
  
  // Atualizar qualificações
  const educationContent = document.querySelector('#education');
  function conteudoCurso(curso) {
    return `
      <h3 class="qualification__title">${curso.nome}</h3>
      <span class="qualification__subtitle">${curso.instituicao}</span>
      <div class="qualification__calendar">
        <i class="fas fa-calendar-alt"></i>
        ${curso.ano}
      </div>
      ${curso.imagem ? `<img class="qualification__img" src="${curso.imagem}" alt="Certificado ${curso.nome}" loading="lazy">` : ''}
      ${curso.descricao ? `<p class="qualification__desc">${curso.descricao}</p>` : ''}
    `;
  }
  let educationHTML = '';
  portfolioData.cursosTreinamentos.cursos.forEach((curso, index) => {
    const isEven = index % 2 === 0;
    const marcador = `
      <div>
        <span class="qualification__rounder"></span>
        <span class="qualification__line"></span>
      </div>`;
    educationHTML += `
      <div class="qualification__data">
        ${isEven ? `<div class="qualification__col">${conteudoCurso(curso)}</div>${marcador}`
                 : `<div></div>${marcador}<div class="qualification__col">${conteudoCurso(curso)}</div>`}
      </div>
    `;
  });
  educationContent.innerHTML = educationHTML;
  
  // Atualizar experiência
  const workContent = document.querySelector('#work');
  let workHTML = '';
  portfolioData.participacoesTorneios.anos.forEach(ano => {
    ano.eventos.forEach((evento, index) => {
      const isEven = index % 2 === 0;
      workHTML += `
        <div class="qualification__data">
          ${isEven ? `
            <div>
              <h3 class="qualification__title">${evento}</h3>
              <span class="qualification__subtitle">${ano.ano}</span>
              <div class="qualification__calendar">
                <i class="fas fa-calendar-alt"></i>
                ${ano.ano}
              </div>
            </div>
            <div>
              <span class="qualification__rounder"></span>
              <span class="qualification__line"></span>
            </div>
          ` : `
            <div></div>
            <div>
              <span class="qualification__rounder"></span>
              <span class="qualification__line"></span>
            </div>
            <div>
              <h3 class="qualification__title">${evento}</h3>
              <span class="qualification__subtitle">${ano.ano}</span>
              <div class="qualification__calendar">
                <i class="fas fa-calendar-alt"></i>
                ${ano.ano}
              </div>
            </div>
          `}
        </div>
      `;
    });
  });
  workContent.innerHTML = workHTML;
  
  // Atualizar serviços
  const servicosContainer = document.querySelector('.services__container');
  servicosContainer.innerHTML = '';
  portfolioData.servicos.forEach(servico => {
    const servicoHTML = `
      <div class="services__content">
        <div>
          <i class="${servico.icone} services__icon"></i>
          <h3 class="services__title">${servico.titulo.replace(' ', '<br>')}</h3>
        </div>
        
        <span class="button button--flex button--small button--link services__button">
          Ver mais
          <i class="fas fa-arrow-right button__icon"></i>
        </span>
        
        <div class="services__modal">
          <div class="services__modal-content">
            <h4 class="services__modal-title">${servico.titulo.replace(' ', '<br>')}</h4>
            <i class="fas fa-times services__modal-close"></i>
            
            <ul class="services__modal-services grid">
              ${servico.detalhes.map(detalhe => `
                <li class="services__modal-service">
                  <i class="fas fa-check-circle services__modal-icon"></i>
                  <p>${detalhe}</p>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
    servicosContainer.innerHTML += servicoHTML;
  });
  
  // Atualizar objetivos
  const objetivosSlides = document.querySelectorAll('#objetivos .swiper-slide');
  if (objetivosSlides.length >= 2) {
    // Curto prazo
    const curtoPrazoHTML = `
      <div class="portfolio__data">
        <h3 class="portfolio__title">${portfolioData.objetivosFuturos.curtoPrazo.titulo}</h3>
        <div class="portfolio__description">
          <ul style="list-style-type: disc; padding-left: 20px; text-align: left;">
            ${portfolioData.objetivosFuturos.curtoPrazo.metas.map(meta => `<li>${meta}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
    objetivosSlides[0].innerHTML = curtoPrazoHTML;
    
    // Longo prazo
    const longoPrazoHTML = `
      <div class="portfolio__data">
        <h3 class="portfolio__title">${portfolioData.objetivosFuturos.longoPrazo.titulo}</h3>
        <div class="portfolio__description">
          <ul style="list-style-type: disc; padding-left: 20px; text-align: left;">
            ${portfolioData.objetivosFuturos.longoPrazo.metas.map(meta => `<li>${meta}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
    objetivosSlides[1].innerHTML = longoPrazoHTML;
  }
  
  // Atualizar portfólio
  const portfolioSlides = document.querySelectorAll('#portfolio .swiper-slide');
  portfolioData.galeria.forEach((item, index) => {
    if (index < portfolioSlides.length) {
      const slide = portfolioSlides[index];
      slide.querySelector('img').src = item.url;
      slide.querySelector('img').alt = item.titulo;
      slide.querySelector('.portfolio__title').textContent = item.titulo;
      slide.querySelector('.portfolio__description').textContent = item.descricao;
    }
  });
  
  // Atualizar depoimentos
  const testimonialSlides = document.querySelectorAll('.testimonial__content');
  portfolioData.depoimentos.forEach((depoimento, index) => {
    if (index < testimonialSlides.length) {
      const slide = testimonialSlides[index];
      slide.querySelector('.testimonial__img').src = depoimento.foto;
      slide.querySelector('.testimonial__img').alt = 'Foto de ' + depoimento.nome;
      slide.querySelector('.testimonial__name').textContent = depoimento.nome;
      slide.querySelector('.testimonial__client').textContent = depoimento.categoria;
      slide.querySelector('.testimonial__description').textContent = depoimento.texto;
    }
  });
  
  // ---- Certificados (galeria + lightbox) ----
  const certGrid = document.getElementById('certificados-grid');
  if (certGrid && Array.isArray(portfolioData.certificados)) {
    certGrid.innerHTML = '';
    portfolioData.certificados.forEach(function (cert) {
      const card = document.createElement('a');
      card.className = 'certificado';
      card.href = cert.url;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'Ampliar certificado: ' + cert.titulo);
      const img = document.createElement('img');
      img.src = cert.url;
      img.alt = 'Certificado: ' + cert.titulo;
      img.loading = 'lazy';
      const cap = document.createElement('span');
      cap.className = 'certificado__cap';
      cap.textContent = cert.titulo;
      card.appendChild(img);
      card.appendChild(cap);
      card.addEventListener('click', function (e) { e.preventDefault(); abrirLightbox(cert.url, cert.titulo); });
      certGrid.appendChild(card);
    });
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  function abrirLightbox(url, titulo) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = url;
    lightboxImg.alt = 'Certificado: ' + titulo;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  }
  function fecharLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  }
  if (lightboxClose) lightboxClose.addEventListener('click', fecharLightbox);
  if (lightbox) lightbox.addEventListener('click', function (e) { if (e.target === lightbox) fecharLightbox(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharLightbox(); });

  // Miniaturas dos cursos (Formação) também ampliam no lightbox
  const eduEl = document.getElementById('education');
  if (eduEl) {
    eduEl.addEventListener('click', function (e) {
      const t = e.target.closest && e.target.closest('.qualification__img');
      if (t) abrirLightbox(t.getAttribute('src'), t.getAttribute('alt') || 'Certificado');
    });
  }

  // Atualizar contato
  document.querySelector('.contact__subtitle').textContent = portfolioData.informacoesBasicas.telefone;
  document.querySelectorAll('.contact__subtitle')[1].textContent = portfolioData.informacoesBasicas.email;
  document.querySelectorAll('.contact__subtitle')[2].textContent = portfolioData.informacoesBasicas.instagram;
  
  // Reinicializar os modais de serviços após atualizar o conteúdo
  const modalViews = document.querySelectorAll('.services__modal');
  const modalBtns = document.querySelectorAll('.services__button');
  const modalCloses = document.querySelectorAll('.services__modal-close');
  
  let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal');
  }
  
  modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
      modal(i);
    });
  });
  
  modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
      modalViews.forEach((modalView) => {
        modalView.classList.remove('active-modal');
      });
    });
  });
  }

  // Roda imediatamente se o DOM já estiver pronto (carregamento dinâmico),
  // ou aguarda o DOMContentLoaded caso contrário.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();
})();
