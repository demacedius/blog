import gsap from "gsap";
let isExpanded = false;
let mm = gsap.matchMedia();

document.querySelector('.burger')?.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-link');

    if (!isExpanded) {
        navLinks.classList.add('expanded');
        aniamtedMenuIn();
    } else {
        animatedMenuOut();
        setTimeout(() => navLinks.classList.remove('expanded'), 500);
    }

    isExpanded = !isExpanded;
});


function aniamtedMenuIn() { 
    mm.add("(max-width: 860px)", () => {
        gsap.fromTo(".nav-link", { opacity: 0, y: -80 }, { opacity: 1, y: 0, transform: "scale(1)", duration: 0.5, ease: "power4.in" });
    })
}

function animatedMenuOut() {
    mm.add("(max-width: 860px)", () => {
        
        gsap.fromTo(".nav-link", { opacity: 1, y: 0 ,}, { opacity: 0, y: -80, duration: 0.5, ease: "power4.Out" });
    })
}


import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = document.querySelectorAll(".card");
const header = document.querySelector(".header");
const animation = gsap.timeline();
let cardHeight;
let cardWidth;

function initCard() {
    animation.clear();
    cardHeight = cards[0].offsetHeight;
    cardWidth = cards[0].offsetWidth;
    cards.forEach((card, index) => {
        if (index > 0) {
            gsap.set(card, { y: index * cardHeight + 300, x: index * -cardWidth - 400});
            
            animation.to(card, { y: 0 , x: 0, duration: index * 0.5, ease: "power4.inOut" }, 0);
        }
    })
}

initCard();

ScrollTrigger.create({
    trigger: ".wrapper",
    start: "top top",
    pinType: "fixed",
    pin: ".wrapper",
    end: () => `+=${(cards.length * cardHeight) + (header.offsetHeight)}`,
    scrub: true,
    animation: animation,
    markers: false,
    invalidateOnRefresh: true
})

ScrollTrigger.addEventListener("refreshInit", initCard);




