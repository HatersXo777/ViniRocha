/* ==========================================================================
   ILUSTRAÇÕES — grid render, filtro, lightbox
   ========================================================================== */

const illustrations = [
  { id: 1,  src: 'images/space-hamburger-nave.jpg', title: 'Abdução Intergaláctica', cat: 'cor', catLabel: 'Space Hamburger', tall: true,  desc: 'Peça principal da série Space Hamburger: um personagem alienígena abduz o combo perfeito em meio a uma chuva de cor e movimento.' },
  { id: 2,  src: 'images/japan-dragao.jpg', title: 'Amuleto do Dragão', cat: 'linhas', catLabel: 'Japan Collection', tall: false, desc: 'Talismã ilustrado inspirado em iconografia japonesa tradicional, traduzido para uma linguagem gráfica contemporânea.' },
  { id: 3,  src: 'images/japan-mister-cup.jpg', title: 'Mister Cup', cat: 'cor',     catLabel: 'Japan Collection', tall: false, desc: 'Identidade fictícia de embalagem para macarrão instantâneo, com tipografia japonesa e paleta vibrante de pôster.' },
  { id: 4,  src: 'images/space-hamburger-pork-ribs.jpg', title: 'Pork Ribs', cat: 'textura', catLabel: 'Space Hamburger', tall: true,  desc: 'Ilustração de costelinhas suculentas em estilo cartoon expressivo, parte da série gastronômica Space Hamburger.' },
  { id: 5,  src: 'images/japan-robo-noodle.jpg', title: 'Barril Noodle', cat: 'formas',  catLabel: 'Japan Collection', tall: false, desc: 'Robô gigante movido a macarrão instantâneo, em homenagem visual aos mechas clássicos do anime japonês.' },
  { id: 6,  src: 'images/docinhos-ana-logo.jpg', title: 'Identidade Docinhos da Ana', cat: 'linhas',  catLabel: 'Docinhos da Ana', tall: true, lightBg: true,  desc: 'Logotipo desenvolvido em estilo bubble lettering, com personagem mascote para marca de doces artesanais.' },
  { id: 7,  src: 'images/docinhos-ana-sticker.jpg', title: 'Aplicação em Adesivo', cat: 'formas',  catLabel: 'Docinhos da Ana', tall: false, lightBg: true, desc: 'Mockup de aplicação da identidade visual em adesivo, pensado para embalagens e materiais de divulgação.' },
  { id: 8,  src: 'images/docinhos-ana-caixa.jpg', title: 'Aplicação em Embalagem', cat: 'textura', catLabel: 'Docinhos da Ana', tall: false, lightBg: true, desc: 'Identidade visual aplicada em caixa de entrega, reforçando a presença de marca em cada etapa do consumo.' },
];

const grid = document.getElementById('illusGrid');
const filterBtns = document.querySelectorAll('.illus-filter button');

function renderGrid(filter = 'all') {
  grid.innerHTML = '';
  const items = filter === 'all' ? illustrations : illustrations.filter(i => i.cat === filter);

  items.forEach((item, idx) => {
    const el = document.createElement('div');
    el.className = 'illus-item reveal' + (item.tall ? ' span-tall' : '') + (item.lightBg ? ' light-bg' : '');
    el.dataset.id = item.id;
    el.innerHTML = `
      <img src="${item.src}" alt="${item.title} - Ilustração Vini Rocha Art" loading="lazy">
      <div class="plus-icon">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 0V14M0 7H14" stroke="currentColor" stroke-width="1.5"/></svg>
      </div>
      <div class="illus-overlay">
        <div class="illus-info">
          <div class="title">${item.title}</div>
          <div class="cat">${item.catLabel}</div>
        </div>
      </div>
    `;
    el.addEventListener('click', () => openLightbox(item.id));
    grid.appendChild(el);
  });

  // re-observe reveal for new items
  const newReveal = grid.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  newReveal.forEach(el => obs.observe(el));
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGrid(btn.dataset.filter);
  });
});

renderGrid();

/* ---------- Lightbox ---------- */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
const lbTitle = document.getElementById('lightboxTitle');
const lbDesc = document.getElementById('lightboxDesc');
const lbNum = document.getElementById('lightboxNum');
const lbTag = document.getElementById('lightboxTag');
const lbClose = document.getElementById('lightboxClose');
const lbPrev = document.getElementById('lightboxPrev');
const lbNext = document.getElementById('lightboxNext');

let currentIndex = 0;

function openLightbox(id) {
  currentIndex = illustrations.findIndex(i => i.id === id);
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateLightbox() {
  const item = illustrations[currentIndex];
  lbImg.src = item.src;
  lbImg.alt = item.title;
  lbTitle.textContent = item.title;
  lbDesc.textContent = item.desc;
  lbNum.textContent = String(currentIndex + 1).padStart(2, '0') + ' / ' + String(illustrations.length).padStart(2, '0');
  lbTag.textContent = item.catLabel;
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function nextImage() {
  currentIndex = (currentIndex + 1) % illustrations.length;
  updateLightbox();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + illustrations.length) % illustrations.length;
  updateLightbox();
}

lbClose.addEventListener('click', closeLightbox);
lbNext.addEventListener('click', nextImage);
lbPrev.addEventListener('click', prevImage);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});
