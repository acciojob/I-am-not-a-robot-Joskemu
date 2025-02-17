// Image sources
const images = [
  'img1.jpg', // Replace with actual image paths
  'img2.jpg',
  'img3.jpg',
  'img4.jpg',
  'img5.jpg'
];

// Function to randomize and display images
function randomizeImages() {
  // Duplicate a random image
  const duplicateIndex = Math.floor(Math.random() * images.length);
  const randomizedImages = [...images, images[duplicateIndex]];
  
  // Shuffle the array
  randomizedImages.sort(() => Math.random() - 0.5);
  
  // Add images to the page dynamically
  const container = document.querySelector('.image-container');
  container.innerHTML = ''; // Clear any previous images
  
  randomizedImages.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Image ${index + 1}`;
    img.dataset.index = index; // Store image index
    container.appendChild(img);
  });
}

// Variables to track selected images
let selectedImages = [];

// Function to handle image click
function handleImageClick(event) {
  const clickedImage = event.target;
  
  // Avoid selecting the same image twice
  if (selectedImages.includes(clickedImage)) return;

  // Add clicked image to the array
  selectedImages.push(clickedImage);
  clickedImage.style.border = '3px solid blue'; // Highlight selected image
  
  // Show Reset button
  document.getElementById('reset').style.display = 'inline-block';
  
  // If two images are selected, show the Verify button
  if (selectedImages.length === 2) {
    document.getElementById('verify').style.display = 'inline-block';
  }
}

// Function to handle reset
function reset() {
  selectedImages = [];
  document.querySelectorAll('.image-container img').forEach(img => {
    img.style.border = '';
  });
  document.getElementById('reset').style.display = 'none';
  document.getElementById('verify').style.display = 'none';
  document.getElementById('para').textContent = ''; // Clear result message
  randomizeImages();
  document.getElementById('h').textContent = 'Please click on the identical tiles to verify that you are not a robot.';
}

// Function to handle verification
function verify() {
  const [image1, image2] = selectedImages;
  if (image1.src === image2.src) {
    document.getElementById('para').textContent = 'You are a human. Congratulations!';
  } else {
    document.getElementById('para').textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
  }
  
  // Hide Verify button after verification
  document.getElementById('verify').style.display = 'none';
}

// Event listeners
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('verify').addEventListener('click', verify);

// Initialize the game on page load
randomizeImages();

// Add event listener to images after loading
document.querySelector('.image-container').addEventListener('click', (event) => {
  if (event.target.tagName === 'IMG') {
    handleImageClick(event);
  }
});
