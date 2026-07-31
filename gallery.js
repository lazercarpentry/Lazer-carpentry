
const items = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');
let current = 0;

function openLightbox(index){
  current = index;
  lightboxImg.src = items[current].dataset.full;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

function moveLightbox(direction){
  current = (current + direction + items.length) % items.length;
  lightboxImg.src = items[current].dataset.full;
}

items.forEach((item, index) => item.addEventListener('click', () => openLightbox(index)));
if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
if(prevBtn) prevBtn.addEventListener('click', () => moveLightbox(-1));
if(nextBtn) nextBtn.addEventListener('click', () => moveLightbox(1));

document.addEventListener('keydown', (event) => {
  if(!lightbox.classList.contains('open')) return;
  if(event.key === 'Escape') closeLightbox();
  if(event.key === 'ArrowLeft') moveLightbox(-1);
  if(event.key === 'ArrowRight') moveLightbox(1);
});

if(lightbox){
  lightbox.addEventListener('click', (event) => {
    if(event.target === lightbox) closeLightbox();
  });
}
