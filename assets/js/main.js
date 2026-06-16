/**
 * Main JavaScript file for the site
 * Robusto: cada bloco verifica a existência dos elementos antes de usar,
 * para funcionar em qualquer página (index linktree, portfólio, horários, loja).
 */

/*==================== MENU SHOW / HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
}
if (navClose && navMenu) {
  navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');
navLink.forEach(n => n.addEventListener('click', () => {
  if (navMenu) navMenu.classList.remove('show-menu');
}));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
  let itemClass = this.parentNode.className;
  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = 'skills__content skills__close';
  }
  if (itemClass === 'skills__content skills__close') {
    this.parentNode.className = 'skills__content skills__open';
  }
}
skillsHeader.forEach(el => el.addEventListener('click', toggleSkills));

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);
    if (!target) return;
    tabContents.forEach(tabContent => tabContent.classList.remove('qualification__active'));
    target.classList.add('qualification__active');
    tabs.forEach(t => t.classList.remove('qualification__active'));
    tab.classList.add('qualification__active');
  });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function (modalClick) {
  if (modalViews[modalClick]) modalViews[modalClick].classList.add('active-modal');
};
modalBtns.forEach((modalBtn, i) => modalBtn.addEventListener('click', () => modal(i)));
modalCloses.forEach(modalClose => modalClose.addEventListener('click', () => {
  modalViews.forEach(modalView => modalView.classList.remove('active-modal'));
}));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');
    const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
    if (!link) return;
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById('header');
  if (!nav) return;
  if (window.scrollY >= 80) nav.classList.add('scroll-header');
  else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUpEl = document.getElementById('scroll-up');
  if (!scrollUpEl) return;
  if (window.scrollY >= 560) scrollUpEl.classList.add('show-scroll');
  else scrollUpEl.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*==================== DARK / LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'fa-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Aplica o tema salvo mesmo em páginas sem botão de tema (ex: index, loja)
if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
}

if (themeButton) {
  const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
  const getCurrentIcon = () => themeButton.classList.contains('fa-moon') ? 'fa-moon' : 'fa-sun';

  if (selectedTheme) {
    themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove']('fa-moon');
    themeButton.classList[selectedIcon === 'fa-sun' ? 'add' : 'remove']('fa-sun');
  }

  themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle('fa-moon');
    themeButton.classList.toggle('fa-sun');
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
  });
}
