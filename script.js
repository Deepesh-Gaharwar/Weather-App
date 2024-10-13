const API_KEY = "144e11bcf7339be2b2f1f1107c6d055f";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      
    } else {
      // Hide previous weather data with a transition
      const weatherContainer = document.querySelector(".weather");
      weatherContainer.classList.add("fade-out"); // Add fade-out class

      // Wait for the transition to finish before updating the weather data
      setTimeout(() => {
        // Hide error message when city is valid
        document.querySelector(".error").style.display = "none";
        weatherContainer.style.display = "block"; // Show weather info

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =
          Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML =
          Math.round(data.wind.speed) + " km/h";

        // Update the weather icon based on the weather condition
        if (data.weather[0].main === "Clouds") {
          weatherIcon.src = "./assets/clouds.png";
        } else if (data.weather[0].main === "Clear") {
          weatherIcon.src = "./assets/clear.png";
        } else if (data.weather[0].main === "Rain") {
          weatherIcon.src = "./assets/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
          weatherIcon.src = "./assets/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
          weatherIcon.src = "./assets/mist.png";
        }else if(data.weather[0].main ==="Haze"){
          weatherIcon.src = "./assets/haze.png";
        } else if(data.weather[0].main ==="Snow"){
          weatherIcon.src = "./assets/snow.png";
        }
         else if(data.weather[0].main ==="Snowy"){
          weatherIcon.src = "./assets/snowy.png";
        }

        // Remove fade-out class after the new data is set
        weatherContainer.classList.remove("fade-out");
        weatherContainer.classList.add("fade-in"); // Add fade-in class
      }, 300); // Match this duration with your CSS transition duration
    }
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

// Capitalize input as the user types
searchBox.addEventListener("input", () => {
  searchBox.value = searchBox.value.toUpperCase();
});

// Event listener for the search button
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
