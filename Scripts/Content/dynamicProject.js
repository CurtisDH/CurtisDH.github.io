document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Get the project ID from the URL query string
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get("id");

        // Fetch the projects from the JSON file
        const response = await fetch("../../Scripts/Content/JSON/projects.json");
        const projects = await response.json();
        console.log(projects);
        // Find the corresponding project in the JSON data
        const project = projects.find(project => project.id === parseInt(projectId));
        console.log(project);


        // Check if the project exists
        if (project) {
            // Populate the project details
            const projectNameElement = document.querySelector(".project-name");
            projectNameElement.textContent = project.name;

            // If the project has a video, display it
            if (project.video) {
                const videoContainer = document.querySelector(".video-container");
                const videoIframe = document.createElement("iframe");
                videoIframe.src = project.embedUrl;
                videoIframe.width = "800";
                videoIframe.height = "600";
                videoIframe.allowFullscreen = true;
                videoContainer.appendChild(videoIframe);
            } else {
                // show the img of the project instead. 
            }
            if (project.description) {
                const descriptionContainer = document.querySelector(".about-project");
                const desc = document.createElement("p");
                desc.textContent = project.description;
                descriptionContainer.appendChild(desc);
            }
            if (project.date) {
                const dateHeader = document.querySelector(".date");
                dateHeader.textContent = project.date;
            }
            if (project.language) {
                const langContainer = document.querySelector(".language-container");
                project.language.forEach(imgUrl => {
                    const langImg = document.createElement("img");
                    langImg.classList.add("language-icon");
                    langImg.src = imgUrl;
                    
                    langContainer.appendChild(langImg);
                })
            }
            if (project.githubUrl) {
                const link = document.querySelector(".git-repo");
                link.href = project.githubUrl;
            }

        } else {

            console.error("Project not found.");
        }
    } catch (error) {
        console.error("Error loading project details:", error);
    }
});
