class Project {
  constructor(embedUrl, githubUrl, title, video = true) {
    this.embedUrl = embedUrl;
    this.githubUrl = githubUrl;
    this.title = title;
    this.video = video;
  }

  async render() {
    let response = await fetch("../../HTML/scrollItemTemplate.html");
    if (this.video == false) {
      response = await fetch("../../HTML/scrollItemTemplateImage.html");
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
      // Target and modify the iframe source (src)
      const iframeElement = projectElement.querySelector(
        ".video-container iframe"
      );
      if (iframeElement) {
        iframeElement.src = this.embedUrl;
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
    const scrollContainer = document.querySelector(".scroll-container");
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
    const scrollContainer = document.querySelector(".scroll-container");
    renderedProjects.forEach((project) => {
      scrollContainer.append(project);
    });
  })
  .catch((error) => {
    console.error("Error rendering projects:", error);
  });
