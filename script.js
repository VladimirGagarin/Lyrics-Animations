document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector(".audio-controls").querySelectorAll("span"),t=document.querySelector(".song-div"),o=e[0],n=e[1],r=e[2],c=e[3],l=e[4],s=new Audio("music.mp3"),d=document.createElement("div");d.classList.add("time-div");let i=!1,a=!1,u=null,y=!0,m=!1;function p(e,t,o){const n=t.clientWidth,r=o.offsetX/n*s.duration;d.textContent=f(r),e?document.body.appendChild(d):document.body.removeChild(d)}function g(e){o.innerHTML=e?'<i class="fas fa-pause"></i>':'<i class="fas fa-play"></i>',o.classList.toggle("playing",e)}function f(e){const t=Math.floor(e/60),o=Math.floor(e%60);return`${t<10?"0"+t:t}:${o<10?"0"+o:o}`}function q(){y&&(document.querySelector(".welcome-message").style.display="none",t.style.display="flex",y=!1);const e="Norwegian"===u?t.querySelector(".norwegian-lyrics"):t.querySelector(".english-lyrics");t.querySelector(".norwegian-lyrics").style.display="Norwegian"===u?"flex":"none",t.querySelector(".english-lyrics").style.display="Norwegian"===u?"none":"flex";e.querySelectorAll("p").forEach((e=>{const t=parseFloat(e.getAttribute("data-start")),o=parseFloat(e.getAttribute("data-end"));s.currentTime>=t&&s.currentTime<=o?e.style.display="block":(e.classList.add("myexit"),e.style.display="none")}))}o.addEventListener("click",(()=>{i=!i,g(i),function(e){e?s.play():s.pause();t.style.display="flex",document.querySelector(".welcome-message").style.display="none",document.querySelector("#total-time").textContent=" / "+f(s.duration),s.addEventListener("timeupdate",(()=>{const e=s.currentTime/s.duration*100;document.querySelector(".progress-bar").style.width=`${e}%`,document.getElementById("current-Time").textContent=`${f(s.currentTime)}`,q();const t=3*s.duration/4;s.currentTime>=t?document.querySelector(".progress-bar").style.backgroundColor="cyan":document.querySelector(".progress-bar").style.backgroundColor="deepskyblue";const o=s.duration-10;s.currentTime>=o&&(console.log("The song is about to finish in 10 seconds!"),document.querySelector(".progress-bar").style.backgroundColor="#FF0000")})),s.addEventListener("ended",(()=>{i=!1,document.querySelector(".progress-bar").style.width="0%",g(i),document.querySelector(".progress-bar").style.backgroundColor="deepskyblue"})),document.querySelector(".logo").classList.toggle("playing",i)}(i),u||(u="Norwegian",q())})),n.addEventListener("click",(()=>{s.paused||(s.pause(),s.currentTime=0),t.style.display="none",document.querySelector(".welcome-message").style.display="flex",g(!1),i=!1})),r.addEventListener("click",(()=>{m=!m,document.querySelector("header").classList.toggle("collapse",m),m?document.querySelector(".container").classList.add("fullscreen"):document.querySelector(".container").classList.remove("fullscreen")})),document.querySelector(".logo").addEventListener("click",(function(){m=!m,document.querySelector("header").classList.toggle("collapse",!m),m?document.querySelector(".container").classList.add("fullscreen"):document.querySelector(".container").classList.remove("fullscreen")})),c.addEventListener("click",(()=>{s.paused||s.pause(),function(){const e=document.createElement("div");e.classList.add("overlay-container");const t=document.createElement("div");t.id="overlay",t.style.display="flex";const o=document.createElement("div");o.id="video-container";const n=document.createElement("iframe");n.src="https://www.youtube.com/embed/GR3qkECLJbw?si=lapBBa69GW1XSVM9",n.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",n.allowFullscreen=!0;const r=document.createElement("button");r.id="close-btn",r.innerText="Close",r.addEventListener("click",(()=>{t.style.display="none",t.remove()})),o.appendChild(n),o.appendChild(r),t.appendChild(o),e.appendChild(t),document.body.appendChild(e)}()})),l.addEventListener("click",(()=>{a=!a,u=a?"English":"Norwegian",l.classList.toggle("playing",a),document.querySelectorAll(".song-div p").forEach((e=>e.style.display="none")),q()})),document.querySelector(".progress-truck").addEventListener("click",(function(e){const t=this.clientWidth,o=e.offsetX,n=s.duration;s.paused||(s.currentTime=o/t*n)})),document.querySelector(".progress-truck").addEventListener("mouseover",(e=>{p(!0,e.target,e)})),document.querySelector(".progress-truck").addEventListener("mouseout",(e=>{p(!1,e.target,e)})),document.querySelector(".progress-truck").addEventListener("mousemove",(e=>{d.style.left=`${e.pageX+10}px`,d.style.top=`${e.pageY+10}px`,p(!0,e.target,e)})),document.querySelector(".image-div").addEventListener("click",(function(){this.style.display="none",setTimeout((()=>{this.style.display="flex"}),30)}))})),document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelector("header").offsetHeight;document.querySelector("main").style.marginTop=e+10+"px"}));
