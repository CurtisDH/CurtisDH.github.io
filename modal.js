// Get the modal
var modal = document.getElementById("myModal");

// Get the iframe inside the modal
var modalIframe = document.getElementById("modal-video");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
  modalIframe.src = "";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalIframe.src = "";
  }
};

// Get all iframes
var iframes = document.querySelectorAll(".video-container iframe");

for (var i = 0; i < iframes.length; i++) {
  // Create overlay div
  var overlay = document.createElement("div");
  overlay.classList.add("overlay");
  // Store the iframe src in the data-src attribute of the overlay
  overlay.dataset.src = iframes[i].src;
  // Reset the iframe src
  iframes[i].src = "";
  // Insert the overlay div before the iframe
  iframes[i].parentNode.insertBefore(overlay, iframes[i]);

  // When the user clicks on the overlay, open the modal
  overlay.addEventListener("click", function () {
    // Open the modal
    modal.style.display = "block";
    // Set the source of the modal iframe to the data-src of the clicked overlay
    modalIframe.src = this.dataset.src;
  });
}
