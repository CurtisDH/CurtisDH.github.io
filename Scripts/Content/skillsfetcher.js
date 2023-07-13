fetch('../../file_data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const skillsContainer = document.querySelector('.skillsContainer');

        Object.entries(data).forEach(([key, value]) => {
            const sectionName = key.replace('Skills/', '');

            const sectionContainer = document.createElement('div');
            sectionContainer.classList.add('section');

            const sectionHeader = document.createElement('h2');
            sectionHeader.textContent = sectionName;
            sectionContainer.appendChild(sectionHeader);

            value.forEach(file => {
                const imagePath = `../../images/${key}/${file}`;

                const img = document.createElement('img');

                img.src = imagePath;

                img.setAttribute('data-name', file.split('.')[0]);

                sectionContainer.appendChild(img);
            });

            skillsContainer.appendChild(sectionContainer);
        });
    })
    .catch(error => {
        console.error('Error retrieving file data:', error);
    });
