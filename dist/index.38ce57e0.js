gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);const origScale=.4,clickedScale=1,dur=.4;gsap.set(".sebi",{scale:.4}),ScrollTrigger.defaults({toggleActions:"restart pause resume pause",markers:!0});const work=document.querySelectorAll(".about_pic");work.forEach(((e,t)=>{const o=e.querySelector(".sebi"),r=gsap.quickSetter(o,"scaleX"),c=gsap.quickSetter(o,"scaleY");let a=!1;const s={scale:.4};function l(){a&&i()}function i(){a?gsap.to(o,{scale:s.scale,duration:.4,overwrite:"auto",onComplete:()=>a=!a}):gsap.to(o,{scale:1,duration:.4,overwrite:"auto",onComplete:()=>a=!a})}gsap.timeline({scrollTrigger:{trigger:e,scrub:.4,start:"top bottom-=30%",end:"90% center",onLeave:l,onLeaveBack:l},onUpdate:()=>{a||(r(s.scale),c(s.scale))}}).to(s,{scale:.6}),e.addEventListener("click",i)}));
//# sourceMappingURL=index.38ce57e0.js.map