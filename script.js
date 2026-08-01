const menu=document.querySelector('.menu');
const nav=document.querySelector('.nav nav');
if(menu&&nav){menu.addEventListener('click',()=>nav.classList.toggle('open'));}
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));

const header=document.querySelector('.nav');
const progress=document.querySelector('.scroll-progress');

function updateChrome(){
  const y=window.scrollY||document.documentElement.scrollTop;
  if(header) header.classList.toggle('scrolled',y>18);
  if(progress){
    const doc=document.documentElement;
    const max=doc.scrollHeight-doc.clientHeight;
    const pct=max>0?(y/max)*100:0;
    progress.style.width=pct+'%';
  }
}
updateChrome();
window.addEventListener('scroll',updateChrome,{passive:true});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const filterButtons=document.querySelectorAll('.project-filter button');
const projectCards=document.querySelectorAll('.project-card');
filterButtons.forEach(button=>{
  button.addEventListener('click',()=>{
    const filter=button.dataset.filter;
    filterButtons.forEach(b=>b.classList.remove('active'));
    button.classList.add('active');
    projectCards.forEach(card=>{
      const categories=(card.dataset.category||'').split(' ');
      const show=filter==='all'||categories.includes(filter);
      card.classList.toggle('is-hidden',!show);
    });
  });
});

projectCards.forEach(card=>{
  card.addEventListener('pointermove',event=>{
    const rect=card.getBoundingClientRect();
    card.style.setProperty('--mx',`${event.clientX-rect.left}px`);
    card.style.setProperty('--my',`${event.clientY-rect.top}px`);
  });
});

document.querySelectorAll('.faq-list details').forEach(detail=>{
  detail.addEventListener('toggle',()=>{
    if(!detail.open) return;
    document.querySelectorAll('.faq-list details').forEach(other=>{
      if(other!==detail) other.open=false;
    });
  });
});
