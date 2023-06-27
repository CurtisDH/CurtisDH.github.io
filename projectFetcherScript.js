const username = "CurtisDH"; 
const container = document.getElementById("scrollContainer");

fetch(`https://api.github.com/users/${username}/repos`)
  .then((response) => response.json())
  .then((data) => {
    const repoPromises = data.map((repo) =>
      fetch(
        `https://api.github.com/repos/${username}/${repo.name}/README.md`
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return null; // Return null for repositories without a README
          }
        })
        .then((readme) => ({
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          has_readme: readme !== null,
        }))
    );

    Promise.all(repoPromises)
      .then((repos) => {
        const validRepos = repos.filter((repo) => repo.has_readme);

        for (let repo of validRepos) {
          const div = document.createElement("div");
          div.classList.add("scroll-item");

          const headingContainer = document.createElement("div");
          headingContainer.classList.add("heading-container");

          const h3 = document.createElement("h3");
          h3.textContent = repo.name;
          headingContainer.appendChild(h3);

          const p = document.createElement("p");
          p.textContent = repo.description;
          headingContainer.appendChild(p);

          div.appendChild(headingContainer);

          const a = document.createElement("a");
          a.href = repo.html_url;
          a.classList.add("repo-link");

          const githubIcon = document.createElement("i");
          githubIcon.classList.add("fab", "fa-github");

          a.appendChild(githubIcon);
          a.appendChild(document.createTextNode("GitHub Repository"));

          div.appendChild(a);

          container.appendChild(div);
        }
      })
      .catch((error) => console.error(error));
  })
  .catch((error) => console.error(error));
