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
  messageOne.textContent = "";
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
