const scrollContainer = document.getElementById("scrollContainer");
let isHovered = false;
let scrollTimeout;
let swapSide = false;
const scrollSpeed = 1;
const scrollStep = 1;

// Auto-scroll across all elements
function autoScroll() {
  if (!isHovered) {
    if (!swapSide) {
      // Scroll to the right
      scrollContainer.scrollLeft += scrollStep;
      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth - scrollContainer.offsetWidth
      ) {
        // Reached the end, change direction
        swapSide = true;
      }
    } else {
      // Scroll to the left
      scrollContainer.scrollLeft -= scrollStep;
      if (scrollContainer.scrollLeft <= 0) {
        // Reached the beginning, change direction
        swapSide = false;
      }
    }
  }
  scrollTimeout = setTimeout(autoScroll, scrollSpeed); // Adjust the timeout duration for smoothness
}

scrollContainer.addEventListener("mouseenter", () => {
  isHovered = true;
});

scrollContainer.addEventListener("mouseleave", () => {
  isHovered = false;
});

// Start the initial auto-scroll
autoScroll();
