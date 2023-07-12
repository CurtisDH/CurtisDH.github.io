document.addEventListener("DOMContentLoaded", (event) => {
  let interactionLayers = document.querySelectorAll(".video-container");

  interactionLayers.forEach((layer) => {
    layer.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Interaction layer clicked!");
    });
  });
});
