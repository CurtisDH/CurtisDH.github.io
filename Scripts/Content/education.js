class Education {
  constructor(institution, degree, duration, description, gpa) {
    this.institution = institution;
    this.degree = degree;
    this.duration = duration;
    this.gpa = gpa;
    this.description = description;
  }
  // TODO add image support
  async render() {
    let response = await fetch("../../HTML/Templates/education.html");

    let template = await response.text();
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = template.trim();
    let element = tempDiv.firstChild;

    // Target and modify the title
    const institution = element.querySelector(".institution");
    const degree = element.querySelector(".degree");
    const duration = element.querySelector(".duration");
    const gpa = element.querySelector(".gpa");
    const description = element.querySelector(".desc");

    if (institution) {
      institution.textContent = this.institution;
    }

    if (degree) {
      degree.textContent = this.degree;
    }

    if (duration) {
      duration.textContent = this.duration;
    }

    if (gpa) {
      gpa.textContent = this.gpa;
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

const education = [
  new Education(
    "Queensland University of Technology",
    "Bachelor of Information Technology - Computer Science",
    "March 2022 - November 2023",
    "Majoring in Computer Science, achieved GPA of 7.0 in Discrete Mathematics, Algorithms & Time Complexity, currently undertaking: High Performance Parallel Computing, Cloud Computing (with an AWS focus), and Systems Programming (Focus on low level programming)",
    "Overall GPA 6.0"
  ),
  new Education(
    "TAFE Queensland",
    "Diploma of Computer Systems Networking and Telecommunications",
    "January 2021 - December 2021",
    "Emphasised a great understand of theoretical and physical computer networking infrastructure. Worked heavily with virtual machines and Linux. Worked heavily with CISCO switches, routers, and wireless access points. Great understanding of network protocols and security implementations",
    "Diploma Awarded"
  ),
  new Education(
    "TAFE Queensland",
    "Certificate III in Game and Interactive Media Design",
    "January 2016 - December 2018",
    "Completed this Certificate while undertaking High school. The course was focused on design, 3D modelling, media editing (Photoshop, Premier pro, Illustrator etc.) Created a great understanding of how users interact with designed environments & software",
    "Certificate Awarded"
  ),
  new Education(
    "Cannon Hill Anglican College",
    "Queensland Certificate of Education & Certificate III in Business",
    "January 2014 - December 2018",
    "Grade 12 Highschool education. Also undertook a Certificate III in Business along side a second certificate from TAFE. Queensland Certificate of Education was awarded upon graduation alongside a Certificate III in Business & Certificate III in Game and Interactive Media Design.",
    "Certificates Awarded"
  ),
];
Promise.all(education.map((education) => education.render()))
  .then((renderedEducation) => {
    const scrollContainer = document.querySelector(
      ".scroll-container-education"
    );
    renderedEducation.forEach((project) => {
      scrollContainer.append(project);
    });
  })
  .catch((error) => {
    console.error("Error rendering projects:", error);
  });
