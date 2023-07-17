// project.js
document.addEventListener("DOMContentLoaded", function() {
    // Get the project ID from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("id");

    // Find the corresponding project in the JSON data
    const project = projects.find(project => project.id === projectId);

    // Populate the project details
    const projectNameElement = document.getElementById("project-name");
    projectNameElement.textContent = project.name;

    // If the project has a video, display it
    if (project.video) {
        const videoContainer = document.getElementById("video-container");
        const videoIframe = document.createElement("iframe");
        videoIframe.src = project.imageUrl;
        videoIframe.allowFullscreen = true;
        videoContainer.appendChild(videoIframe);
    }
});
