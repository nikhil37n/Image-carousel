const track = document.querySelector('.carousel__track');
const dotsNav = document.querySelector('.carousel__nav');
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const slides = Array.from(track.children);
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition);

const moveSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-'+ targetSlide.style.left +' )';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const moveDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if(targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if(targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

nextButton.addEventListener('click', e => {
    const currentSlide = document.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    moveSlide(track, currentSlide, nextSlide);
    moveDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
})

prevButton.addEventListener('click', e => {
    const currentSlide = document.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    moveSlide(track, currentSlide, prevSlide);
    moveDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
})

dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if(!targetDot) return;
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveSlide(track, currentSlide, targetSlide);
    moveDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
})