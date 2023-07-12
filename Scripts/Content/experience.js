class Experience {
  constructor(company, position, duration, description) {
    this.company = company;
    this.position = position;
    this.duration = duration;
    this.description = description;
  }
  // TODO add image support
  async render() {
    let response = await fetch("../../HTML/Templates/experience.html");

    let template = await response.text();
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = template.trim();
    let element = tempDiv.firstChild;

    // Target and modify the title
    const institution = element.querySelector(".company");
    const degree = element.querySelector(".position");
    const duration = element.querySelector(".duration");
    const description = element.querySelector(".desc");

    if (institution) {
      institution.textContent = this.company;
    }

    if (degree) {
      degree.textContent = this.position;
    }

    if (duration) {
      duration.textContent = this.duration;
    }

    if (description) {
      description.textContent = this.description;
    }

    // Get the scroll-container element
    const scrollContainer = document.querySelector(".scroll-container");
    if (scrollContainer) {
      scrollContainer.append(element);
    }

    return element;
  }
}

const experience = [
  new Experience(
    "Queensland Police - Capstone",
    "Software Developer",
    "March 2023 - November 2023",
    "In conjunction with QUT, the capstone program serves as a multifaceted venture that not only provides valuable work experience but also enables the accumulation of credit points towards my bachelor's degree in computer science. This unique opportunity involves an array of pivotal processes, including but not limited to crafting a comprehensive project report outline encompassing critical aspects such as risk assessment, ethical considerations, and project timelines. Collaboratively liaising with Queensland Police, we have engaged in a meticulous and iterative exchange of ideas, persisting until reaching a mutually agreeable solution. Subsequently, this diligent groundwork has set the stage for the subsequent stages of the development process.",
    "Overall GPA 6.0"
  ),
  new Experience(
    "YesVR (Internship)",
    "Software Developer ",
    "December 2020 - April 2021",
    "At YesVR, I contributed to the development of immersive VR experiences using Unity and the Unity XR Toolkit. I focused on C# backend development and collaborated with audio designers and web developers. I gained experience with Agile methodologies and worked independently by utilising Asana for project management. Here I also gained significant experience working with a pre-existing code-base, and participating in key client meetings discussing what aspects of the software needed to be adjusted to fit the clients needs"
  ),
  new Experience(
    "GameDevHQ (BootCamp)",
    "Software Developer",
    "August 2020 - December 2020",
    "This BootCamp was focused on Unity & C#, throughout this BootCamp I gained essential skills and knowledge in game development. The boot camp covered program debugging, performance profiling, and optimising software issues. I also learned important programming patterns like Singleton's, Object Pooling, Command, and Chain of Responsibility. These patterns helped me design scalable code structures for robust game systems. During the BootCamp I integrated REST APIs into game environments to interact with external data sources and enhance game mechanics. This experience taught me how to leverage REST APIs for more realistic and functional game experiences. "
  ),
];
Promise.all(experience.map((experience) => experience.render()))
  .then((renderedExperience) => {
    const scrollContainer = document.querySelector(
      ".scroll-container-experience"
    );
    renderedExperience.forEach((project) => {
      scrollContainer.append(project);
    });
  })
  .catch((error) => {
    console.error("Error rendering projects:", error);
  });
