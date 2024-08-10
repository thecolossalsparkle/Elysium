document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    let index = 0;
    const itemCount = carouselItems.length;

    function updateCarousel() {
        const offset = -index * 100; // Adjust for one video at a time
        carousel.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener('click', () => {
        index = (index > 0) ? index - 1 : itemCount - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        index = (index < itemCount - 1) ? index + 1 : 0;
        updateCarousel();
    });

    // Optional: Auto-slide
    setInterval(() => {
        nextButton.click();
    }, 5000); // Adjust the interval as needed
});