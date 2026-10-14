(function(){
  document.documentElement.classList.add('js');
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=matchMedia('(pointer:fine)').matches;
  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};

  // nav
  var nav=$('#nav'),burger=$('#burger'),menu=$('#menu');
  burger.addEventListener('click',function(){var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
  menu.addEventListener('click',function(e){if(e.target.closest('a')){nav.classList.remove('open');burger.setAttribute('aria-expanded','false')}});

  // counters
  function count(el){if(reduce||el.dataset.done)return;el.dataset.done=1;var end=+el.dataset.count,from=+(el.dataset.from||0),suf=el.dataset.suffix||'',t0=performance.now(),d=1700;
    (function f(t){var p=Math.min((t-t0)/d,1),e=1-Math.pow(1-p,4);el.textContent=Math.round(from+(end-from)*e)+suf;if(p<1)requestAnimationFrame(f)})(t0)}

  // reveal
  var rvs=$$('.rv');
  function show(el){if(el.classList.contains('in'))return;el.classList.add('in');$$('[data-count]',el).forEach(count)}
  window.__reveal=show;
  rvs.forEach(function(el){if(el.getBoundingClientRect().top<innerHeight*.95)show(el)});
  if('IntersectionObserver' in window&&!reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target,i=[].indexOf.call(el.parentNode.children,el);el.style.transitionDelay=Math.min(i,6)*80+'ms';show(el);io.unobserve(el)})},{rootMargin:'0px 0px -6% 0px'});
    rvs.forEach(function(el){if(!el.classList.contains('in'))io.observe(el)});
  } else rvs.forEach(show);

  // scroll effects
  var prog=$('#progress'),top=$('#totop'),hbg=$('.phero-bg');
  var pars=$$('[data-par]'),gbgs=$$('.give-bg');
  var tick=false;
  function onScroll(){var y=scrollY,H=document.documentElement.scrollHeight-innerHeight;
    prog.style.transform='scaleX('+(H>0?y/H:0)+')';
    nav.classList.toggle('scrolled',y>40);top.classList.toggle('show',y>innerHeight*.8);
    if(!reduce){
      if(hbg&&y<innerHeight*1.2)hbg.style.translate='0 '+(y*.35)+'px';
      gbgs.forEach(function(b){var r=b.parentNode.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)b.style.setProperty('--py',((r.top+r.height/2-innerHeight/2)*-.18)+'px')});
      pars.forEach(function(img){var b=img.parentNode.getBoundingClientRect();if(b.bottom<0||b.top>innerHeight)return;var c=(b.top+b.height/2-innerHeight/2)/innerHeight;img.style.setProperty('--py',(-c*(+img.dataset.par))-(b.height*.09)+'px')});
    }
    tick=false}
  addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();

  // magnetic buttons + spotlight cards
  if(fine&&!reduce){
    $$('.mag').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.16)+'px,'+((e.clientY-r.top-r.height/2)*.26)+'px)'});b.addEventListener('pointerleave',function(){b.style.transform=''})});
    $$('[data-tilt]').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(1000px) rotateX('+(-y*5)+'deg) rotateY('+(x*6)+'deg) translateY(-6px)'});c.addEventListener('pointerleave',function(){c.style.transform=''})});
  }

  // lightbox
  var lb=$('#lb');
  if(lb){var li=$('#lbImg'),lc=$('#lbCap');
    $$('.g').forEach(function(g){g.addEventListener('click',function(){var im=$('img',g);li.src=im.src;li.alt=im.alt;lc.textContent=g.dataset.cap||'';lb.classList.add('open');$('#lbClose').focus()})});
    var close=function(){lb.classList.remove('open')};
    $('#lbClose').addEventListener('click',close);lb.addEventListener('click',function(e){if(e.target===lb)close()});addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  }

  // snow in page hero
  var cv=$('.phero canvas');
  if(cv&&!reduce){var cx=cv.getContext('2d'),fl=[],W,Hh,dpr=Math.min(devicePixelRatio||1,2),run=true;
    var size=function(){W=cv.offsetWidth;Hh=cv.offsetHeight;cv.width=W*dpr;cv.height=Hh*dpr;cx.setTransform(dpr,0,0,dpr,0,0);var n=Math.round(W*Hh/8000);fl=[];for(var i=0;i<n;i++)fl.push({x:Math.random()*W,y:Math.random()*Hh,r:Math.random()*2.2+.4,s:Math.random()*.8+.3,d:Math.random()*6.28,o:Math.random()*.6+.25})};
    var draw=function(){if(!run)return;cx.clearRect(0,0,W,Hh);cx.fillStyle='#ffffff';for(var i=0;i<fl.length;i++){var f=fl[i];f.d+=.01;f.y+=f.s*(1+f.r*.4);f.x+=Math.sin(f.d)*.5+.35;if(f.y>Hh+5){f.y=-5;f.x=Math.random()*W}if(f.x>W+5)f.x=-5;cx.globalAlpha=f.o;cx.beginPath();cx.arc(f.x,f.y,f.r,0,6.283);cx.fill()}requestAnimationFrame(draw)};
    size();addEventListener('resize',size);draw();
    new IntersectionObserver(function(e){var was=run;run=e[0].isIntersecting;if(run&&!was)draw()}).observe(cv);
  }
})();
