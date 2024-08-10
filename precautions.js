// Get the slider elements
const sliderWrapper = document.querySelector('.slider-wrapper');
const sliderItems = document.querySelectorAll('.slider-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const paginationDots = document.querySelectorAll('.dot');

// Set the initial slide index
let currentIndex = 0;

// Function to update the slider
function updateSlider() {
  // Calculate the translateX value
  const translateX = -currentIndex * (sliderWrapper.offsetWidth /sliderItems.length);

  // Update the slider wrapper's translateX value with animation
  sliderWrapper.style.transform = `translateX(${translateX}px)`;
  sliderWrapper.classList.add('animating');

  // Remove the animating class after the animation is complete
  setTimeout(() => {
    sliderWrapper.classList.remove('animating');
  }, 1000);

  paginationDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
    dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
  });
}

// Add event listeners to the prev/next buttons
prevBtn.addEventListener('click', () => {
  currentIndex = Math.max(0, currentIndex - 1);
  updateSlider();
});

nextBtn.addEventListener('click', () => {
  currentIndex = Math.min(sliderItems.length - 1, currentIndex + 1);
  updateSlider();
});

// Add event listeners to the pagination dots
paginationDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateSlider();
  });
});

// Initialize the slider
updateSlider();


