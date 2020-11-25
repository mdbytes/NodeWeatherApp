const getWeather = document.querySelector("#get-weather");
const clientBox = document.querySelector("#client-box");
const weatherForm = document.querySelector("#weather-request");
const inputValue = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageOneTime = document.querySelector("#message-one-time");
const messageTwo = document.querySelector("#message-two");
const weatherIcon = document.querySelector("#weather-icon");

getWeather.addEventListener("submit", (e) => {
  e.preventDefault();
  clientBox.style.visibility = "visible";
  getWeather.style.visibility = "hidden";
});

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "";
  messageOneTime.textContent = "";
  messageOne.style.color = "black";
  messageTwo.textContent = "";
  const location = inputValue.value;
  const fetchString = "/weather?address=" + location;
  messageOne.textContent = "Loading forecast ...";
  fetch(fetchString).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        if (
          data.error ===
          "Your API request failed. Please try again or contact support."
        ) {
          messageOne.textContent =
            "Oops.  We didn't recognize that locataion.  Try again.";
          messageOne.style.color = "red";
        } else {
          messageOne.textContent = data.error;
          messageOne.style.color = "red";
        }
        inputValue.value = "";
      } else {
        messageOne.textContent = "Location: " + data.location;
        messageOneTime.textContent = "Time: " + data.time;
        messageTwo.textContent = "Forecast: " + data.forecast;
        inputValue.value = "";
      }
    });
  });
});
