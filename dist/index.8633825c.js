gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const origScale = 0.4;
const clickedScale = 1;
const dur = 0.4;
gsap.set(".sebi", {
    scale: origScale
});
ScrollTrigger.defaults({
    toggleActions: "restart pause resume pause",
    markers: true
});
const work = document.querySelectorAll(".about_pic");
work.forEach((item, index)=>{
    const sebi = item.querySelector(".sebi");
    const setScaleX = gsap.quickSetter(sebi, "scaleX");
    const setScaleY = gsap.quickSetter(sebi, "scaleY");
    let isClicked = false;
    const proxy = {
        scale: origScale
    };
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: item,
            scrub: dur,
            start: "top bottom-=30%",
            end: "90% center",
            onLeave: handleScrollLeave,
            onLeaveBack: handleScrollLeave
        },
        onUpdate: ()=>{
            if (!isClicked) {
                setScaleX(proxy.scale);
                setScaleY(proxy.scale);
            }
        }
    });
    tl.to(proxy, {
        scale: 0.6
    });
    function handleScrollLeave() {
        if (isClicked) clickFunc();
    }
    function clickFunc() {
        if (!isClicked) gsap.to(sebi, {
            scale: clickedScale,
            duration: dur,
            overwrite: "auto",
            onComplete: ()=>isClicked = !isClicked
        });
        else gsap.to(sebi, {
            scale: proxy.scale,
            duration: dur,
            overwrite: "auto",
            onComplete: ()=>isClicked = !isClicked
        });
    }
    item.addEventListener("click", clickFunc);
});

//# sourceMappingURL=index.8633825c.js.map
