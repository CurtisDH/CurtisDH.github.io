document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.getElementById("scrollContainer");
  let isHovered = false;
  let scrollTimeout;
  let swapSide = false;
  const scrollSpeed = 1;
  const scrollStep = 1;
  let isDragging = false;
  let startX;
  let scrollLeft;
  let dragEndTimeout;

  // Get all video overlays
  const videoOverlays = document.querySelectorAll(".video-overlay");

  // Get all iframes
  const videoIframes = document.querySelectorAll("iframe");

  // Add click event listener to each video overlay
  videoOverlays.forEach(function (overlay) {
    overlay.addEventListener("click", function () {
      // Hide the overlay when it's clicked
      this.style.display = "none";
    });
  });

  // Add mouseleave event listener to each iframe
  videoIframes.forEach(function (iframe, index) {
    iframe.addEventListener("mouseleave", function () {
      // Show the overlay when mouse leaves the iframe
      videoOverlays[index].style.display = "block";
    });
  });

  function autoScroll() {
    if (!isHovered && !isDragging) {
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
    scrollTimeout = setTimeout(autoScroll, scrollSpeed);
  }

  function handleMouseDown(e) {
    isDragging = true;
    startX = e.clientX;
    scrollLeft = scrollContainer.scrollLeft;
    scrollContainer.style.userSelect = "none";
    clearTimeout(scrollTimeout); // Clear the autoScroll timeout
  }

  scrollContainer.addEventListener("mousedown", handleMouseDown);

  scrollContainer.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.clientX;
    const scrollAmount = startX - x;
    scrollContainer.scrollLeft = scrollLeft + scrollAmount;
  });

  window.addEventListener("mouseup", function () {
    clearTimeout(dragEndTimeout);
    isDragging = false; // Setting isDragging to false immediately
    scrollContainer.style.userSelect = "auto";
    dragEndTimeout = setTimeout(() => {
      autoScroll(); // Restart autoScroll after user interaction
    }, 3000);
  });

  window.addEventListener("mouseout", function (e) {
    if (!e.relatedTarget && !e.toElement) {
      // Checks if mouse left the page
      clearTimeout(dragEndTimeout);
      isDragging = false; // Setting isDragging to false immediately
      dragEndTimeout = setTimeout(() => {
        autoScroll(); // Restart autoScroll after user interaction
      }, 3000);
    }
  });

  scrollContainer.addEventListener("mouseover", function () {
    isHovered = true;
    clearTimeout(scrollTimeout); // Clear the autoScroll timeout
  });

  scrollContainer.addEventListener("mouseleave", function () {
    isHovered = false;
    clearTimeout(dragEndTimeout);
    isDragging = false; // Setting isDragging to false immediately
    dragEndTimeout = setTimeout(() => {
      autoScroll(); // Restart autoScroll after user interaction
    }, 3000);
  });

  // Start the initial auto-scroll
  autoScroll();
});
