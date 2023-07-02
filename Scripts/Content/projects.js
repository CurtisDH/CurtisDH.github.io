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
    console.log(template);
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

let AudioVisualiser = new Project(
  "https://www.youtube.com/embed/EE9si3eyNik",
  "https://github.com/CurtisDH/LEDVisualiserAudioClient",
  "C# - Led Audio Visualiser 2022"
);
AudioVisualiser.render().then((AudioVisualiser) => {
  document.querySelector(".scroll-container").append(AudioVisualiser);
});

let Sudoku = new Project(
  "../images/Sudoku.png",
  "https://github.com/CurtisDH/SudokuSolver",
  "C# - Sudoku Solver 2023",
  false
);
Sudoku.render().then((Sudoku) => {
  document.querySelector(".scroll-container").append(Sudoku);
});

let GMTK = new Project(
  "https://www.youtube.com/embed/pfC0CL8QjNM",
  "",
  "GMTK GameJam - 2020"
);
GMTK.render().then((GMTK) => {
  document.querySelector(".scroll-container").append(GMTK);
});

let OtherGameJam = new Project(
  "https://www.youtube.com/embed/XO7lElw7M-Q",
  "",
  "24hr 2D Game 2020"
);
OtherGameJam.render().then((OtherGameJam) => {
  document.querySelector(".scroll-container").append(OtherGameJam);
});

let UnityIntegration = new Project(
  "https://www.youtube.com/embed/mr-SBXM-570",
  "https://github.com/CurtisDH/Unity-PayPal-Integration",
  "Unity + PayPal 2020"
);
UnityIntegration.render().then((UnityIntegration) => {
  document.querySelector(".scroll-container").append(UnityIntegration);
});
