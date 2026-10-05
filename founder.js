(function(){var s=document.getElementById("founder");if(!s)return;
function show(){s.classList.add("in")}
if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){show();io.disconnect()}})},{threshold:.25});io.observe(s)}else{show()}})();
