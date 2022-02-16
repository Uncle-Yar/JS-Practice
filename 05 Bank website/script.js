"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

//1 Modal window
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Scroll button "learn more"
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
btnScrollTo.addEventListener("click", function (e) {
  ////SCROLL
  // //1.scroll old way
  // const coord1 = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: coord1.left + window.pageYOffset,
  //   top: coord1.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  //2.scroll new way
  section1.scrollIntoView({ behavior: "smooth" });
});

// Scroll Navigation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    if (id === "#") return;
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabs : operations
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  // console.log(clicked);
  if (!clicked) return;
  //remove active classes
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach(
    (tab = tab.classList.remove("operations__content--active"))
  );
  //add class to current tab
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(".operations__content--active");
});

// nav link fading
const nav = document.querySelector(".nav");
///separate function
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");

    siblings.forEach((el) => {
      if (el != link) {
        el.style.opacity = this;
        // console.log(this);
      }
    });
  }
};
///add event listener with passing arguments in functon
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// sticky navigation InterceptionObserverApi
const header = document.querySelector(".header");
/// get adaptive height for responive
const navHeight = nav.getBoundingClientRect().height;
//// 2 callback function for IntObs
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
//1
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
// 3
headerObserver.observe(header);

// Sections fade in : Oberver
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.14,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

//Image loading
///select images with attr "data-src"
const imgTargets = document.querySelectorAll("img[data-src]");
//callback f() for Observer
const loadImg = function (entries, observer) {
  //select single entry
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //change html src attr
  entry.target.src = entry.target.dataset.src;
  //add event listener on load
  entry.target.addEventListener("load", function (e) {
    entry.target.classList.remove("lazy-img");
  });
  //remove observer
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.01,
});
imgTargets.forEach((img) => imgObserver.observe(img));

//Slider at the bottom of page
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let curSlide = 0;
let maxSlide = slides.length;

// document.querySelector(".slider").style.overflow = "visible";

const goToSLide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};
goToSLide(0);

//f next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSLide(curSlide);
  activateDot(curSlide);
};
//f prev slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSLide(curSlide);
  activateDot(curSlide);
};
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

// arrow keys
document.addEventListener("keydown", function (e) {
  //1 method
  if (e.key === "ArrowLeft") prevSlide();
  //2 method
  e.key === "ArrowRight" && nextSlide();
});
//dots slide
//f create dots
const dotContainer = document.querySelector(".dots");
const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    // const slide = e.target.dataset.slide;
    //another way with destructuring ^
    const { slide } = e.target.dataset;
    goToSLide(slide);
    activateDot(sldie);
  }
});
//active dot highlight
const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"`)
    .classList.add("dots__dot--active");
};
activateDot(0);
// slides.forEach((slide, i) => {
//   slide.style.transform = `translateX(${i * 100}%)`;
// });
// let curSlide = 0;
// let maxSlide = slides.length;
// btnRight.addEventListener("click", function (e) {
//   if (curSlide === maxSlide - 1) {
//     curSlide = 0;
//   } else {
//     curSlide++;
//   }

//   slides.forEach((slide, i) => {
//     slide.style.transform = `translateX(${(i - curSlide) * 100}%)`;
//   });
// });
//200 not finished
//////////////////////////////////////////
//test

//
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = 'We use cookies <button class="btn btn--close-cookie">K</button>'
// document.querySelector('header').append(message);
// document.querySelector('.btn--close-cookie').addEventListener('click', ()=>message.remove());
// //message.style.height = parseFloat(getComputedStyle(message).height) + 40 +'px';

// //  Event test
// const h1Alert = function(e){
//   alert('hi');
//   e.target.removeEventListener('mouseover', h1Alert);
// }
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseover', h1Alert);

// //3.event bubbling test
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;;
// const link = document.querySelector('.nav__link');
// const container = document.querySelector('.nav__links');
// const nav = document.querySelector('.nav');

// link.addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Link',e.target,e.currentTarget);
//   // e.stopPropagation();
// });
// container.addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Container',e.target,e.currentTarget);
// });
// nav.addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAv',e.target,e.currentTarget);
// });
