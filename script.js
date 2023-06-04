// Get the current date in YYYY-MM-DD format
const currentDate = new Date().toISOString().split("T")[0];

// Retrieve the API key from local storage or replace 'YOUR_API_KEY' with your actual API key
const apiKey = localStorage.getItem("apiKey") || "ClhiteeWmrluskz5vusXA1NwyldDl0PeKZNEkkaY";

// Retrieve the searches from local storage or initialize an empty array
const searches = JSON.parse(localStorage.getItem("searches")) || [];

// Function to fetch and display the image of the day for the current date
function getCurrentImageOfTheDay() {
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const imageContainer = document.getElementById("current-image-container");
      imageContainer.innerHTML = `
        <img src="${data.url}" alt="${data.title}">
        <h3>${data.title}</h3>
        <p>${data.explanation}</p>
      `;
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

// Function to fetch and display the image of the day for a selected date
function getImageOfTheDay(date) {
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const imageContainer = document.getElementById("current-image-container");
      imageContainer.innerHTML = `
        <img src="${data.url}" alt="${data.title}">
        <h3>${data.title}</h3>
        <p>${data.explanation}</p>
      `;

      // Save the date to local storage
      saveSearch(date);

      // Add the date to the search history
     
      addSearchToHistory(date);
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

// Function to save a search date to local storage
function saveSearch(date) {
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

// Function to add a search date to the search history
function addSearchToHistory(date) {
  const searchHistory = document.getElementById("search-history");

  const listItem = document.createElement("li");
  listItem.textContent = date;
  listItem.addEventListener("click", () => {
    getImageOfTheDay(date);
  });

  searchHistory.appendChild(listItem);
}

// Event listener for the search form submission
document.getElementById("search-form").addEventListener("submit", event => {
  event.preventDefault();
  const searchInput = document.getElementById("search-input");
  const date = searchInput.value;
  getImageOfTheDay(date);
  searchInput.value = "";
});

// Run the getCurrentImageOfTheDay function when the page loads
window.addEventListener("load", getCurrentImageOfTheDay);