document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.getElementById("scrollContainer");
  let isHovered = false;
  let scrollTimeout;
  let swapSide = false;
  const scrollSpeed = 35; // Increase the value to slow down the scroll speed
  const scrollStep = 1; // This is now 1 pixel per scroll
  const scrollWheelStep = 25; // Num pixels per scroll event
  let isDragging = false;
  let startX;
  let scrollLeft;
  let dragEndTimeout;
  let startTime = null;

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

  function autoScroll(timestamp) {
    if (!isHovered && !isDragging) {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;

      if (elapsed > scrollSpeed) {
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
        startTime = timestamp;
      }
    }
    requestAnimationFrame(autoScroll);
  }

  // Start the initial auto-scroll
  requestAnimationFrame(autoScroll);

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

  // handle scroll wheel event
  scrollContainer.addEventListener(
    "wheel",
    function (e) {
      // prevent the default behavior
      e.preventDefault();
      // scroll the container
      this.scrollLeft += Math.sign(e.deltaY) * scrollWheelStep;

      // Pause auto-scrolling when scrolling with the wheel
      clearTimeout(scrollTimeout);
      isHovered = true;
      scrollTimeout = setTimeout(() => {
        isHovered = false;
        autoScroll();
      }, 3000);
    },
    { passive: false }
  ); // added this to ensure the preventDefault() works as expected

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
