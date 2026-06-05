/* =========================================
   LOADING SCREEN
========================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.display = "none";
    }, 1000);

});

/* =========================================
   MOBILE MENU
========================================= */

let hamburger = document.querySelector(".hamburger");
let sidebar = document.querySelector(".sidebar");
let closebar = document.querySelector(".close");
let navItem = document.querySelectorAll(".sidebar a");
hamburger.addEventListener("click", () => {
    sidebar.classList.add("active");
});
closebar.addEventListener("click", () => {
    sidebar.classList.remove("active");
});
navItem.forEach((link) => {
    link.addEventListener("click", () => {

        sidebar.classList.remove("active");
    });
});

/* =========================================
   DARK / LIGHT MODE
========================================= */

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const icon = themeToggle.querySelector("i");

    if(document.body.classList.contains("light-mode")){

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem("theme", "light");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("theme", "dark");
    }

});

/* Restore Theme */

if(localStorage.getItem("theme") === "light"){

    document.body.classList.add("light-mode");

    const icon = themeToggle.querySelector("i");

    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");

}

/* =========================================
   TYPING EFFECT
========================================= */

const words = [
    "Web Developer",
    "Cybersecurity Enthusiast",
    "Forex Trader",
    "Photographer",
    "Social Reformer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing");

function typeEffect(){

    const currentWord = words[wordIndex];

    if(isDeleting){

        typingElement.textContent =
        currentWord.substring(0, charIndex--);

    } else {

        typingElement.textContent =
        currentWord.substring(0, charIndex++);

    }

    let speed = 100;

    if(isDeleting){
        speed = 50;
    }

    if(!isDeleting && charIndex === currentWord.length + 1){

        isDeleting = true;

        speed = 1500;
    }

    if(isDeleting && charIndex === 0){

        isDeleting = false;

        wordIndex++;

        if(wordIndex >= words.length){
            wordIndex = 0;
        }
    }

    setTimeout(typeEffect, speed);

}

if(typingElement){
    typeEffect();
}

/* =========================================
   ANIMATED SKILL BARS
========================================= */

const progressBars =
document.querySelectorAll(".progress-bar");

function animateSkills(){

    progressBars.forEach(bar => {

        const width = bar.getAttribute("data-width");

        bar.style.width = width;

    });

}

const skillsSection =
document.getElementById("skills");

window.addEventListener("scroll", () => {

    const sectionTop =
    skillsSection.offsetTop - 400;

    if(window.scrollY > sectionTop){

        animateSkills();
    }

});

/* =========================================
   COUNTER ANIMATION
========================================= */

const counters =
document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters(){

    counters.forEach(counter => {

        const target =
        +counter.getAttribute("data-target");

        let count = 0;

        const increment =
        target / 150;

        const updateCounter = () => {

            if(count < target){

                count += increment;

                counter.textContent =
                Math.ceil(count);

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                target;
            }
        };

        updateCounter();

    });

}

window.addEventListener("scroll", () => {

    const statsSection =
    document.querySelector(".stats");

    if(!statsSection) return;

    const trigger =
    statsSection.offsetTop - 500;

    if(window.scrollY > trigger &&
       !counterStarted){

        counterStarted = true;

        startCounters();
    }

});

/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
document.querySelectorAll(
".about-card, .skill-card, .project-card, .timeline-item, .service-card, .testimonial-card, .stat-card"
);

function revealOnScroll(){

    revealElements.forEach(el => {

        const windowHeight =
        window.innerHeight;

        const elementTop =
        el.getBoundingClientRect().top;

        if(elementTop < windowHeight - 100){

            el.style.opacity = "1";
            el.style.transform =
            "translateY(0)";
        }

    });

}

revealElements.forEach(el => {

    el.style.opacity = "0";
    el.style.transform =
    "translateY(40px)";

    el.style.transition =
    "all 0.8s ease";
});

window.addEventListener(
"scroll",
revealOnScroll
);

revealOnScroll();

/* =========================================
   BACK TO TOP BUTTON
========================================= */

const backToTop =
document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){

        backToTop.style.display =
        "block";

    } else {

        backToTop.style.display =
        "none";
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});

/* =========================================
   NAVBAR ACTIVE LINK
========================================= */

const sections =
document.querySelectorAll("section");

const navItems =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
        section.offsetTop - 200;

        const sectionHeight =
        section.clientHeight;

        if(window.scrollY >= sectionTop){

            current =
            section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if(
            link.getAttribute("href") ===
            `#${current}`
        ){

            link.classList.add("active");
        }

    });

});

/* =========================================
   CONTACT FORM DEMO
========================================= */

emailjs.init("Cm7JNYPNChPogK_3Z");

const form =
document.getElementById("contact-form");

form.addEventListener(
"submit",
function(e){

e.preventDefault();
const button = document.querySelector(".submit-btn");
button.innerText = "Sending...";
button.disabled = true;

emailjs.sendForm(
"service_1synnkz",
"template_2o7pkgn",
this
)

.then(()=>{

alert("Message Sent Successfully");

form.reset();

button.innerText = "Send Message";
button.disabled = false;


})

.catch((error)=>{

console.log(error);

alert("Failed To Send Message");

button.innerText = "Send Message";
button.disabled = false;


});

});

/* =========================================
   CHART.JS SAMPLE
   (FOR FUTURE DASHBOARD)
========================================= */

const chartCanvas =
document.getElementById("portfolioChart");

if(chartCanvas){

    new Chart(chartCanvas, {

        type: "line",

        data: {

            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun"
            ],

            datasets: [{

                label:
                "Growth",

                data: [
                    10,
                    25,
                    40,
                    55,
                    70,
                    90
                ],

                borderWidth: 3,

                tension: 0.4
            }]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false
        }
    });

}

/* =========================================
   AUTO COPYRIGHT YEAR
========================================= */

const yearElement =
document.getElementById("year");

if(yearElement){

    yearElement.textContent =
    new Date().getFullYear();

}