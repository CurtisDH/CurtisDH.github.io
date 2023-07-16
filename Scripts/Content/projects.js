// Display just the thumbnail instead of the whole embed.
// Create an onclick event which will generate the html from the template
// this will be a page all about the project
// the top of the page has the title, the middle is the enlarged embed
// below that we then have a description of the project along with the date
// and we also need to include the github repo if one exists.

class Project {
    constructor(embedUrl, githubUrl, title, video = true) {
        this.embedUrl = embedUrl;
        this.githubUrl = githubUrl;
        this.title = title;
        this.video = video;
    }

    async render() {
        let response = await fetch("../../HTML/Templates/projectWithVideo.html");
        if (this.video == false) {
            response = await fetch("../../HTML/Templates/projectWithImage.html");
        }
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
                repoLinkElement.textContent = "No GitHub Repository";
            }
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

const projects = [
    new Project(
        "https://www.youtube.com/embed/EE9si3eyNik",
        "https://github.com/CurtisDH/LEDVisualiserAudioClient",
        "C# - Led Audio Visualiser 2022"
    ),
    new Project(
        "../images/Sudoku.png",
        "https://github.com/CurtisDH/SudokuSolver",
        "C# - Sudoku Solver 2023",
        false
    ),
    new Project(
        "https://www.youtube.com/embed/pfC0CL8QjNM",
        "",
        "GMTK GameJam - 2020"
    ),
    new Project(
        "https://www.youtube.com/embed/XO7lElw7M-Q",
        "",
        "24hr 2D Game 2020"
    ),
    new Project(
        "https://www.youtube.com/embed/mr-SBXM-570",
        "https://github.com/CurtisDH/Unity-PayPal-Integration",
        "Unity + PayPal 2020"
    ),
    new Project(
        "",
        "https://github.com/CurtisDH/SpigotAutoSort",
        "Java - Spigot Auto Sort 2021"
    ),
    new Project(
        "",
        "https://github.com/CurtisDH/Multi-ThreadedPrimeFinder",
        "C# - MultiThreaded Prime Finder 2021"
    ),
    new Project(
        "",
        "https://github.com/CurtisDH/ITP-2020",
        "Unity GameDevHQ BootCamp 2020"
    ),
];
Promise.all(projects.map((project) => project.render()))
    .then((renderedProjects) => {
        const scrollContainer = document.querySelector(
            ".scroll-container-projects"
        );
        renderedProjects.forEach((project) => {
            scrollContainer.append(project);
        });
    })
    .catch((error) => {
        console.error("Error rendering projects:", error);
    });
