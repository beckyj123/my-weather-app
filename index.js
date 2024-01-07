function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function updateDateTime() {
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  const dateTimeElement = document.getElementById("currentDateTime");
  dateTimeElement.textContent = formattedDate;
}

updateDateTime();

setInterval(updateDateTime, 1000);

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);

  document.querySelector("#temperature").innerHTML = `${temperature}°C`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  let cityNameElement = document.querySelector("#cityName");
  cityNameElement.innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let units = "metric";

let form = document.getElementById("search-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let searchValue = document.getElementById("cityInput").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
});
