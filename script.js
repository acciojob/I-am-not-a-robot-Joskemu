//your code here
// script.js
document.addEventListener('DOMContentLoaded', () => {
    const images = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg'];
    const imageContainer = document.getElementById('image-container');
    const resetButton = document.getElementById('reset');
    const verifyButton = document.getElementById('verify');
    const message = document.getElementById('h');
    const resultMessage = document.getElementById('para');
    let selectedImages = [];
    let selectedIndices = [];
    
    // Function to randomize images
    function shuffleImages() {
        const duplicateIndex = Math.floor(Math.random() * 5);
        const imageSet = [...images];
        imageSet.splice(duplicateIndex, 0, images[duplicateIndex]);  // Insert a duplicate image
        
        imageContainer.innerHTML = '';  // Clear existing images
        imageSet.forEach((src, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = src;
            imgElement.alt = `image-${index}`;
            imgElement.dataset.index = index;
            imgElement.addEventListener('click', handleImageClick);
            imageContainer.appendChild(imgElement);
        });
    }

    // Handle image click event
    function handleImageClick(event) {
        const image = event.target;
        const index = image.dataset.index;

        if (!selectedIndices.includes(index)) {
            selectedImages.push(image.src);
            selectedIndices.push(index);
            image.style.border = '2px solid #4CAF50'; // Highlight selected image

            if (selectedImages.length === 1) {
                resetButton.style.display = 'block';
            } else if (selectedImages.length === 2) {
                verifyButton.style.display = 'block';
            }
        }
    }

    // Reset the game
    resetButton.addEventListener('click', () => {
        selectedImages = [];
        selectedIndices = [];
        resetButton.style.display = 'none';
        verifyButton.style.display = 'none';
        resultMessage.textContent = '';
        message.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
        shuffleImages();
    });

    // Verify the selected images
    verifyButton.addEventListener('click', () => {
        if (selectedImages[0] === selectedImages[1]) {
            resultMessage.textContent = 'You are a human. Congratulations!';
        } else {
            resultMessage.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
        }
        verifyButton.style.display = 'none';
    });

    // Initialize the game
    shuffleImages();
});
