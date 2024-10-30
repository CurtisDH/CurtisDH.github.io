class Education {
    constructor(institution, degree, duration, descriptions, gpa) {
        this.institution = institution;
        this.degree = degree;
        this.duration = duration;
        this.descriptions = descriptions;
        this.gpa = gpa;
    }

    async render() {
        let response = await fetch("../../HTML/Templates/education.html");
        let template = await response.text();
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = template.trim();
        let element = tempDiv.firstChild;

        const institution = element.querySelector(".institution");
        const degree = element.querySelector(".degree");
        const duration = element.querySelector(".duration");
        const descriptionContainer = element.querySelector(".desc-container");
        const gpa = element.querySelector(".gpa");

        if (institution) {
            institution.textContent = this.institution;
        }

        if (degree) {
            degree.textContent = this.degree;
        }

        if (duration) {
            duration.textContent = this.duration;
        }

        if (descriptionContainer && this.descriptions) {
            this.descriptions.forEach((desc) => {
                const listItem = document.createElement("li");
                listItem.textContent = desc;
                descriptionContainer.appendChild(listItem);
            });
        }

        if (gpa) {
            gpa.textContent = this.gpa;
        }

        const scrollContainer = document.querySelector(".container-education");
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
        [
            "Majored in Computer Science",
            "Achieved GPA of 7.0 in  the following:",
            "Discrete Mathematics",
            "Algorithms & Time Complexity",
            "High Performance Parallel Computing",
            "Cloud Computing (with an AWS focus)",
            "and Systems Programming (Focus on low level programming)",
        ],
        "Overall GPA 6.125"
    ),
    new Education(
        "TAFE Queensland",
        "Diploma of Computer Systems Networking and Telecommunications",
        "January 2021 - December 2021",
        [
            "Emphasised a great understanding of theoretical and physical computer networking infrastructure",
            "Worked heavily with virtual machines and Linux",
            "Worked heavily with CISCO switches, routers, and wireless access points",
            "Great understanding of network protocols and associated security implementations",
        ],
        "Diploma Awarded"
    ),
    new Education(
        "TAFE Queensland",
        "Certificate III in Game and Interactive Media Design",
        "January 2016 - December 2018",
        [
            "Completed while undertaking high school education",
            "Covered the following topics:",
            "Web Design",
            "3D Modelling",
            "3D Animation",
            "Media Editing",
            "Sound Design",
            "Photography"
        ],
        "Certificate Awarded"
    ),
    new Education(
        "Cannon Hill Anglican College",
        "Certificate III in Business",
        "January 2016 - December 2018",
        [
            "Completed while undertaking high school education",
            "Leadership, innovation and creative thinking",
            "Customer service and teamwork",
            "Inclusivity and effective communication",
            "WHS and sustainability",
            "Business documentation"
        ],
        "Certificate Awarded"
    ),
    new Education(
        "Cannon Hill Anglican College",
        "Queensland Certificate of Education",
        "January 2014 - December 2018",
        [
            "Grade 12 high school education resulting in QCE being awarded",
            "Undertook Certificate III in Business & Certificate III in Game and Interactive Media Design"],
        "Certificates Awarded"
    ),

];

Promise.all(education.map((edu) => edu.render()))
    .then((renderedEducation) => {
        const scrollContainer = document.querySelector(".container-education");
        renderedEducation.forEach((edu) => {
            scrollContainer.append(edu);
        });
    })
    .catch((error) => {
        console.error("Error rendering education:", error);
    });
