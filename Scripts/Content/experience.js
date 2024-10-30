class Experience {
    constructor(company, position, duration, descriptions, imageSrc) {
        this.company = company;
        this.position = position;
        this.duration = duration;
        this.descriptions = descriptions;
        this.imageSrc = imageSrc;
    }

    async render() {
        let response = await fetch("../../HTML/Templates/experience.html");
        let template = await response.text();
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = template.trim();
        let element = tempDiv.firstChild;

        const institution = element.querySelector(".company");
        const degree = element.querySelector(".position");
        const duration = element.querySelector(".duration");
        const descriptionContainer = element.querySelector(".desc-container");
        const image = element.querySelector(".company-image-container")

        if (institution) {
            institution.textContent = this.company;
        }

        if (degree) {
            degree.textContent = this.position;
        }

        if (duration) {
            duration.textContent = this.duration;
        }
        
        if (image)
        {
            image.textContent = this.imageSrc;
        }

        if (descriptionContainer && this.descriptions) {
            this.descriptions.forEach((desc) => {
                const listItem = document.createElement("li");
                listItem.textContent = desc;
                descriptionContainer.appendChild(listItem);
            });
        }

        const scrollContainer = document.querySelector(".container-experience");
        if (scrollContainer) {
            scrollContainer.append(element);
        }

        return element;
    }
}

const experience = [
    new Experience(
        "BimBeats",
        "Software Developer",
        "August 2023 - Present",
        [
            "C\# | .NET Framework & .NET 6+",
            "Developed a centralised cloud storage solution deployed to thousands of end users",
            "Created extensive internal unit testing suite for complex programs (e.g. Revit)",
            "Designed and built installers, services, plug-ins and standalone WPF applications",
            "Automated manual time consuming release, deployment and management tasks",
            
        ],
        //TODO "image_src"
    ),
    new Experience(
        "Queensland Police - Capstone",
        "Software Developer",
        "March 2023 - November 2023",
        [
            "Collaborated with Queensland Police on a comprehensive project for the capstone program",
            "Heavily involved in risk assessment, ethical considerations, and project timelines",
            "Contributed to the development process through iterative exchange of ideas until client requirements were satisfied",
            "Worked extensively with Javascript, HTML5, and CSS3"
        ]
    ),
    new Experience(
        "YesVR (Internship)",
        "Software Developer",
        "December 2020 - April 2021",
        [
            "Contributed to the development of immersive VR experiences using Unity and the Unity XR Toolkit",
            "Focused on C# backend development and collaborated with audio designers and web developers",
            "Gained experience with Agile methodologies and worked independently utilizing Asana for project management",
            "Gained experience working with a pre-existing codebase and participating in key client meetings",
        ]
    ),
    new Experience(
        "GameDevHQ (BootCamp)",
        "Software Developer",
        "August 2020 - December 2020",
        [
            "Developed essential skills and knowledge in game development",
            "Learned programming patterns like Singleton's, Object Pooling, Command, and Chain of Responsibility",
            "Integrated REST APIs into game environments to enhance game mechanics",
        ]
    ),
];

Promise.all(experience.map((exp) => exp.render()))
    .then((renderedExperience) => {
        const scrollContainer = document.querySelector(".container-experience");
        renderedExperience.forEach((exp) => {
            scrollContainer.append(exp);
        });
    })
    .catch((error) => {
        console.error("Error rendering work experience:", error);
    });
