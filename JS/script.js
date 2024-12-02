const apiKey = "1bd0ae72a176bf76a548af43600f1057";
const api = `https://api.openweathermap.org/data/2.5/weather?`;

const deg = document.querySelector(".deg");
const city = document.querySelector(".city");
const humDeg = document.querySelector(".hum-deg");
const windDeg = document.querySelector(".wind-deg");
const weatherIcon = document.querySelector(".weather-icon");
const searchInput = document.querySelector(".search-input");
const searchIcon = document.querySelector(".search-icon");
const subCont = document.querySelector(".sub-cont");
const nav = document.querySelector("nav");

async function dataFun(inp) {
  try {
    const response = await fetch(api + `q=${inp}&appid=${apiKey}`);
    if (!response.ok) throw new Error("invalid city name");
    const data = await response.json();
    const state = data.weather[0].main;
    console.log(data); // json data
    city.textContent = data.name;
    deg.textContent = Math.round(data.main.temp / 10);
    humDeg.textContent = data.main.humidity;
    windDeg.textContent = data.wind.speed;
    getState(state);
    subCont.style.height = "400px";
    subCont.style.opacity = 1;
    searchInput.value = "";
  } catch (err) {
    alert(err);
  }
}

function getState(state) {
  if (state === "Clear") weatherIcon.src = "images/clear.png";
  if (state === "Rain") weatherIcon.src = "images/rain.png";
  if (state === "Clouds") weatherIcon.src = "images/clouds.png";
  if (state === "Drizzle") weatherIcon.src = "images/drizzle.png";
  if (state === "Mist") weatherIcon.src = "images/mist.png";
  else weatherIcon.src = "images/snow.png";
}

nav.addEventListener("click", (e) => {
  const clicked = e.target.closest(".search-icon");
  if (!clicked) return;
  const searchValue = searchInput.value;
  dataFun(searchValue);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const searchValue = searchInput.value;
    dataFun(searchValue);
  }
});
