const api_key = "98740f4ebc0d63bc0f8ba70090e5a091"; 
const weather_api_url = "https://api.openweathermap.org/data/2.5/weather";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const city = document.getElementById("city");
const country = document.getElementById("country");
const temp = document.getElementById("temp");
const icon = document.getElementById("icon");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feels-like");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const forecastSlider = document.getElementById("forecast-slider");

searchButton.addEventListener("click", () => {
    const cityName = searchInput.value;
    getWeatherData(cityName);
});

const getWeatherData = (cityName) => {
    const url = `${weather_api_url}?q=${cityName}&appid=${api_key}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("City not found.");
                return;
            }
            displayWeatherData(data);
        })
        .catch(error => {
            alert("Error getting weather data.");
            console.error(error);
        });
};

const displayWeatherData = (data) => {
    city.textContent = data.name;
    country.textContent = data.sys.country;
    temp.textContent = Math.round(data.main.temp) + "°C";
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">`;
    description.textContent = data.weather[0].description;
    feelsLike.textContent = Math.round(data.main.feels_like) + "°C";
    humidity.textContent = data.main.humidity + "%";
    wind.textContent = data.wind.speed + " m/s";
    pressure.textContent = data.main.pressure + " hPa";
    visibility.textContent = data.visibility / 1000 + " km";
    sunrise.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    sunset.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    setDynamicBackground(data.weather[0].main);

    // Fetch forecast data and update the slider
    getForecastData(data.coord.lat, data.coord.lon);
};

const setDynamicBackground = (weatherCondition) => {
    const body = document.body;
    switch (weatherCondition.toLowerCase()) {
        case "clear":
            body.style.backgroundImage = "url('clear_sky.jpg')";
            break;
        case "clouds":
            body.style.backgroundImage = "url('cloudy.jpg')";
            break;
        case "rain":
            body.style.backgroundImage = "url('rain.jpg')";
            break;
        case "snow":
            body.style.backgroundImage = "url('snow.jpg')";
            break;
        case "thunderstorm":
            body.style.backgroundImage = "url('thunderstorm.jpg')";
            break;
        default:
            body.style.backgroundImage = "url('default_weather.jpg')";
            break;
    }
};

const getForecastData = (lat, lon) => {
    const forecast_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${api_key}&units=metric`;

    fetch(forecast_url)
        .then(response => response.json())
        .then(data => {
            displayForecastData(data.daily);
        })
        .catch(error => {
            alert("Error getting forecast data.");
            console.error(error);
        });
};

const displayForecastData = (dailyForecast) => {
    forecastSlider.innerHTML = ""; // Clear previous forecast data

    dailyForecast.forEach((day, index) => {
        if (index === 0) return; // Skip today's forecast (already displayed)

        const forecastDay = document.createElement("div");
        forecastDay.classList.add("forecast-day");

        const date = new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' });
        const temp = Math.round(day.temp.day) + "°C";
        const icon = `<img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="Weather Icon">`;

        forecastDay.innerHTML = `
            <div class="forecast-date">${date}</div>
            <div class="forecast-icon">${icon}</div>
            <div class="forecast-temp">${temp}</div>
        `;

        forecastSlider.appendChild(forecastDay);
    });
};

// Smooth scrolling on navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for triggering animations
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    observer.observe(section);
});

const currentLocationButton = document.getElementById("current-location-button");

// Event listener for current location button
currentLocationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherDataByCoords(latitude, longitude);
        }, error => {
            alert("Error getting location: " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

// Modify the getWeatherData function to accept coordinates
const getWeatherDataByCoords = (lat, lon) => {
    const url = `${weather_api_url}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("Location not found.");
                return;
            }
            displayWeatherData(data);
        })
        .catch(error => {
            alert("Error getting weather data.");
            console.error(error);
        });
};
