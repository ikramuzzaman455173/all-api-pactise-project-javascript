// Funtion all elementIdGet & set new value
function setTextElementValueById(elementId, value) {
  let setElement = document.getElementById(elementId);
  setElement.innerText=value
}
const msgError = document.getElementById("msgError");
// This Function Use For All Id Get In Javascript  😀
function getElementId(getId) {
  const elementId = document.getElementById(getId)
  return elementId
}

const API_key = "ef6fb5dd955732b808bbe294a724d603";
// Create Function weather api
const weatherApi = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;
  console.log("🚀 ~ file: weather-api-project.js:6 ~ weatherApi ~ url:", url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log("🚀 ~ file: weather-api-project.js:13 ~ weatherApi ~ data:", data)
    displayWeatherApiData(data);
  } catch (error) {
    console.log(error);
  }
};

// show Data Display Weather Api Data
const displayWeatherApiData = (data) => {
  setTextElementValueById("temperature", data.main.temp);
  setTextElementValueById("city", data.name);
  setTextElementValueById("condition", data.weather[0].description);
  // set weather icon
  const url = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const imgIcon = document.getElementById("weather-icon");
  imgIcon.setAttribute("src", url);
  console.log(data);
};
const searchTemperature = () => {
  const searchField = document.getElementById("city-name");
  const searchFieldValue = searchField.value
  weatherApi(searchFieldValue)

}


// call the main Function weather api
weatherApi("Dhaka");
