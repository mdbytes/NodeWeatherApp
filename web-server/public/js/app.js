const getWeather = document.querySelector("#get-weather");
const clientBox = document.querySelector("#client-box");
const weatherForm = document.querySelector("#weather-request");
const inputValue = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

getWeather.addEventListener("submit", (e) => {
  e.preventDefault();
  clientBox.style.visibility = "visible";
  getWeather.style.visibility = "hidden";
});

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = inputValue.value;
  const fetchString = "/weather?address=" + location;
  messageOne.textContent = "Loading forecast ...";
  fetch(fetchString).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOnetextContent = data.error;
        inputValue.value = "";
      } else {
        messageOne.textContent = "Location: " + data.location;
        messageTwo.textContent = "Forecast: " + data.forecast;
        inputValue.value = "";
      }
    });
  });
});

fetch("/weather?address=cedar rapids").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
    }
  });
});
