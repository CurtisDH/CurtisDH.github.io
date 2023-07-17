// Get all the read-more links and modal elements
const readMoreLinks = document.querySelectorAll('.read-more');
const modalContainers = document.querySelectorAll('.modal-container');
const modalContents = document.querySelectorAll('.modal-content');
const closeButtons = document.querySelectorAll('.close-modal');

// Iterate over each read-more link
readMoreLinks.forEach((readMoreLink, index) => {
    // Add a click event listener to each read-more link
    readMoreLink.addEventListener('click', (e) => {
        e.preventDefault();

        // Show the corresponding modal
        modalContainers[index].style.display = 'block';
    });

    // Add a click event listener to the close button
    closeButtons[index].addEventListener('click', () => {
        // Hide the corresponding modal
        modalContainers[index].style.display = 'none';
    });
});

// Close the modal if the user clicks outside the modal content
modalContainers.forEach((modalContainer) => {
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            modalContainer.style.display = 'none';
        }
    });
});
