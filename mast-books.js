/* Animated book covers on both sides of the header logo. Decorative only. */
(function(){
var mast=document.querySelector('.mast');if(!mast)return;
var TOTAL=26,pad=function(n){return(n<10?'0':'')+n},src=function(n){return'images/mini/m-'+pad(n)+'.webp'};
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
/* slots: [distance from logo %, top %, width px, tilt deg, parallax depth, bob seconds] */
var SLOTS=[[5,12,58,-8,10,5.2],[9,56,64,6,14,6.1],[30,34,50,10,7,5.6],[44,5,44,-12,5,6.8],[48,62,48,8,9,5.9],[70,34,40,-6,4,7.2]];
var pool=[];for(var i=1;i<=TOTAL;i++)pool.push(i);
for(var j=pool.length-1;j>0;j--){var k=Math.floor(Math.random()*(j+1)),t=pool[j];pool[j]=pool[k];pool[k]=t}
var shown=[],cards=[],pi=0;
function side(cls){
  var s=document.createElement('div');s.className='mb-side '+cls;s.setAttribute('aria-hidden','true');
  SLOTS.forEach(function(d,i){
    var n=pool[pi++%TOTAL];shown.push(n);
    var c=document.createElement('div');c.className='mb-c';
    c.style.cssText='--n:'+d[0]+'%;--t:'+d[1]+'%;--s:'+d[2]+';--r:'+d[3]+';--p:'+d[4]+';--i:'+i;
    var b=document.createElement('div');b.className='mb-b';b.style.cssText='--bd:'+d[5]+'s;--bl:-'+(i*0.9).toFixed(1)+'s';
    var f=document.createElement('div');f.className='mb-f';
    var im=new Image();im.alt='';im.decoding='async';im.src=src(n);im.dataset.n=n;
    f.appendChild(im);b.appendChild(f);c.appendChild(b);s.appendChild(c);cards.push({c:c,f:f,im:im});
    f.setAttribute('role','button');f.tabIndex=-1;
    f.addEventListener('click',function(){
      var path='images/book-'+pad(+im.dataset.n)+'.webp';
      if(window.D&&window.openBook){for(var x=0;x<D.length;x++){if(D[x][3]===path){window.openBook(x);return}}}
    });
  });
  if(!reduce){for(var q=0;q<4;q++){var sp=document.createElement('i');sp.className='mb-s';
    sp.style.cssText='--sx:'+(8+Math.random()*80).toFixed(0)+'%;--sy:'+(6+Math.random()*84).toFixed(0)+'%;--z:'+(8+Math.random()*8).toFixed(0)+'px;--td:'+(2.4+Math.random()*2.6).toFixed(1)+'s;--tl:-'+(Math.random()*4).toFixed(1)+'s';
    s.appendChild(sp)}}
  mast.appendChild(s);
}
side('mb-left');side('mb-right');
if(reduce)return;
/* swap a random cover with a 3D flip (and sometimes a wiggle) */
var last=-1,visible=true;
function swap(){
  if(!visible||document.hidden)return;
  var i;do{i=Math.floor(Math.random()*cards.length)}while(i===last);last=i;
  var card=cards[i],n;do{n=1+Math.floor(Math.random()*TOTAL)}while(shown.indexOf(n)>-1);
  var pre=new Image();pre.onload=function(){
    card.f.classList.add('flip');
    setTimeout(function(){
      shown[shown.indexOf(+card.im.dataset.n)]=n;card.im.src=src(n);card.im.dataset.n=n;
      card.f.classList.remove('flip');
      if(Math.random()<.5){card.c.classList.add('wig');setTimeout(function(){card.c.classList.remove('wig')},950)}
    },380);
  };pre.src=src(n);
}
setInterval(swap,1700);
/* idle wiggle on its own so the shelves always feel alive */
setInterval(function(){if(!visible||document.hidden)return;var c=cards[Math.floor(Math.random()*cards.length)].c;c.classList.add('wig');setTimeout(function(){c.classList.remove('wig')},950)},2600);
if('IntersectionObserver'in window){new IntersectionObserver(function(e){visible=e[0].isIntersecting}).observe(mast)}
/* gentle parallax: books drift with the pointer */
if(matchMedia('(pointer:fine)').matches){var raf=0;
  window.addEventListener('mousemove',function(e){if(raf||!visible)return;raf=requestAnimationFrame(function(){raf=0;
    mast.style.setProperty('--mx',((e.clientX/innerWidth-.5)*2).toFixed(3));mast.style.setProperty('--my',((e.clientY/innerHeight-.5)*2).toFixed(3))})},{passive:true});
}
})();
