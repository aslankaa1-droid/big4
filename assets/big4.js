/* BIG4 — общий скрипт: переключатель тем + scroll-reveal. */
(function(){
  var root=document.documentElement;
  var btns=document.querySelectorAll('.switch button');
  var saved=localStorage.getItem('big4-theme');
  if(saved){
    root.setAttribute('data-theme',saved);
    btns.forEach(function(b){b.classList.toggle('on',b.dataset.t===saved);});
  }
  btns.forEach(function(b){
    b.addEventListener('click',function(){
      root.setAttribute('data-theme',b.dataset.t);
      localStorage.setItem('big4-theme',b.dataset.t);
      btns.forEach(function(x){x.classList.toggle('on',x===b);});
    });
  });
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12});
  document.querySelectorAll('.reveal:not(.in)').forEach(function(el){io.observe(el);});
})();
