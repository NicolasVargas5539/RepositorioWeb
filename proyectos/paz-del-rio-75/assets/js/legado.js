const LegadoSlides = document.querySelectorAll('.legado-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.querySelectorAll('.indicator');
const imgs = document.querySelectorAll('.rows');

let currentIndex = 0;
let interval;

function updateSlideVisibility() {
    LegadoSlides.forEach((LegadoSlides, index) => {
        if (index === currentIndex) {
            LegadoSlides.style.display = "block";
        } else {
            LegadoSlides.style.display = "none";
        }
    });

    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
    imgs.forEach((imgs, index) => {
        if (index === currentIndex) {
            imgs.classList.add('rows-active');
        } else {
            imgs.classList.remove('rows-active');
        }
    });
}

function goToNextSlide() {
    currentIndex = (currentIndex + 1) % LegadoSlides.length;
    updateSlideVisibility();
}

function startInterval() {
    interval = setInterval(goToNextSlide, 4000); // Cambio de slide cada 4 segundos
}

function stopInterval() {
    clearInterval(interval);
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + LegadoSlides.length) % LegadoSlides.length;
    updateSlideVisibility();
    stopInterval();
    startInterval();
});

nextBtn.addEventListener('click', () => {
    goToNextSlide();
    stopInterval();
    startInterval();
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index;
        updateSlideVisibility();
        stopInterval();
        startInterval();
    });
});



startInterval();
updateSlideVisibility();
