class Experience {
  constructor(companyName, role, dateStart, dateEnd, description) {
    this.companyName = companyName;
    this.role = role;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.description = description;
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
