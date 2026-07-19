// form success state
document.querySelectorAll('.form-wrap form').forEach(f=>{
  f.addEventListener('submit',e=>{e.preventDefault();f.closest('.form-wrap').classList.add('is-sent');});
});
// smooth scroll for in-page CTAs
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}});
});
