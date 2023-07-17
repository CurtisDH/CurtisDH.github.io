// Display just the thumbnail instead of the whole embed.
// Create an onclick event which will generate the html from the template
// this will be a page all about the project
// the top of the page has the title, the middle is the enlarged embed
// below that we then have a description of the project along with the date
// and we also need to include the github repo if one exists.

class Project {
    constructor(embedUrl, githubUrl, title, video = true, uniqueId) {
        this.embedUrl = embedUrl;
        this.githubUrl = githubUrl;
        this.title = title;
        this.video = video;
        this.uniqueId = uniqueId;
    }

    async render() {
        let response = await fetch("../../HTML/Templates/projectTemplate.html");
        let template = await response.text();
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = template.trim();
        let projectElement = tempDiv.firstChild;

        // Target and modify the title
        const titleElement = projectElement.querySelector(".heading-container h3");
        if (titleElement) {
            titleElement.textContent = this.title;
        }

        if (this.video) {
            const iframeElement = projectElement.querySelector(
                ".video-container img"
            );
            if (iframeElement && this.embedUrl !== "") {
                let vidId = this.embedUrl.split("embed");
                let imgSrc = "https://img.youtube.com/vi" + vidId[1] + "/hqdefault.jpg";
                console.log(imgSrc);
                const imgElement = projectElement.querySelector(".video-container img");
                imgElement.src = imgSrc;//this.embedUrl;


            }
        } else {
            const imageElement = projectElement.querySelector(".video-container img");
            if (imageElement) {
                imageElement.src = this.embedUrl;
                // Modify the width and height attributes
                imageElement.width = 200;
                imageElement.height = 400;
            }
        }

        // Target and modify the repository link
        const repoLinkElement = projectElement.querySelector(".repo-link");
        if (repoLinkElement) {
            repoLinkElement.href = this.githubUrl;
            if (this.githubUrl == "") {
                // set to default
                repoLinkElement.href = "https://github.com/CurtisDH";

                // Target and modify the "GitHub Repository" text
                // let newText = "No" + repoLinkElement.textContent;
                // repoLinkElement.textContent = newText;
            }
        }

        const readMoreLink = projectElement.querySelector(".read-more");
        if (readMoreLink) {
            console.log("HERE!! ID:" + this.uniqueId);
            readMoreLink.href = `../../HTML/Templates/projectContentPage.html?id=${this.uniqueId}`;
        }

        // Get the scroll-container element
        const scrollContainer = document.querySelector(
            ".scroll-container-projects"
        );
        if (scrollContainer) {
            scrollContainer.append(projectElement);
        }

        return projectElement;
    }
}

// Function to fetch projects from JSON
async function fetchProjects() {
    const response = await fetch("../../Scripts/Content/JSON/projects.json");
    const jsonData = await response.text();

    try {
        const projects = JSON.parse(jsonData);
        // Proceed with rendering the projects
        return projects;
    } catch (error) {
        console.error("Error parsing JSON data:", error);
    }

}

// Function to render projects
async function renderProjects() {
    const projects = await fetchProjects();
    const renderedProjects = await Promise.all(
        projects.map(
            (project) =>
                new Project(
                    project.embedUrl,
                    project.githubUrl,
                    project.name,
                    project.video,
                    project.id
                ).render()
        )
    );

    const scrollContainer = document.querySelector('.scroll-container-projects');
    renderedProjects.forEach((project) => {
        scrollContainer.append(project);
    });
}

// Call the renderProjects function to load and render the projects
renderProjects();
