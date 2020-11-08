var DefaultCities = ["New York", "Boston", "Los Angeles", "Seattle"]
for (i=0; i<DefaultCities.length; i++){
$("#cityBtn").append("<button id='subcityBtn' class='btns btn btn-primary'>" + DefaultCities[i] + "</button> <br>")



}
for(i=1; i<2; i++){
    var cityPull = localStorage.getItem("storedCity"+i)
    console.log(cityPull)
    $("#cityBtn").append("<button id='subcityBtn' class='btns btn btn-primary'>" + cityPull + "</button> <br>")
    
}

// console.log(localStorage.getItem("storedCity"+1))
s = 0

$("#find-city").on("click", function(event){
    event.preventDefault();
    s++
var city = $("#city-input").val()
localStorage.setItem("storedCity"+s, city)
var queryURL =
"https://api.openweathermap.org/data/2.5/weather?q=" +city+ "&appid=166a433c57516f51dfab1f7edaed8413";
console.log(city)
console.log(queryURL);
$.ajax({
url: queryURL,
method: "GET",
}).then(function (response) {
  var tempF = (response.main.temp - 273.15) * 1.80 + 32;
  $("#currentCity").html("<h1>"
   + response.name + 
   "</h1><h4> Temperature: " 
   + tempF.toFixed(0) + 
   "<h4><h4> Humidity: " 
   + response.main.humidity + 
   "<h4><h4> Wind Speed: " 
   + response.wind.speed + 
   " mph<h4>")

console.log(response);
getFiveDayForecast();
});

function getFiveDayForecast(city) {
//construct url
var city = $("#city-input").val()

var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" +city+ "&appid=166a433c57516f51dfab1f7edaed8413";

$.ajax({
url: queryUrl,
method: "GET"
}).then(function(data) {

//create the markup
var forecastWeatherMarkUp = "";
for (let i = 0; i < data.list.length; i++) {
var tempF2 = (data.list[i].main.temp - 273.15) * 1.80 + 32;
var dayPlus = 86400000
var dayPlus = dayPlus + 86400000
  if (data.list[i].dt_txt.indexOf("12:00:00") > -1) {
      forecastWeatherMarkUp += `
      <div class="col-md card m-2">
          <div class="card-body">
              <div class="card-title">
                  <p>${new Date().getTime()+ dayPlus}</p>
              </div>
              <div><img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png"></div>
              <p>Temp: ${tempF2.toFixed(0)}&deg;F</p>
              <p>Humidity: ${data.list[i].main.humidity}%</p>
          </div>
      </div>
      `;
  }
}

$("#fiveDayForecast").html(forecastWeatherMarkUp);
});
};


$("#cityBtn").append("<button id='subcityBtn' class='btns btn btn-primary'>" + city + "</button> <br>");

});

$(".subcityBtn").on("click", function(event){
var research = (event.target.innerText);
console.log("button Test")
var queryURL =
"https://api.openweathermap.org/data/2.5/weather?q=" +research+ "&appid=166a433c57516f51dfab1f7edaed8413";

$.ajax({
url: queryURL,
method: "GET",
}).then(function (response) {
  var tempF = (response.main.temp - 273.15) * 1.80 + 32;
  $("#currentCity").html("<h1>" 
  + response.name + 
  "</h1><h4> Temperature: "
  + tempF.toFixed(0) + 
  "<h4><h4> Humidity: "
  + response.main.humidity +
  "<h4><h4> Wind Speed: " 
  + response.wind.speed +
  " mph<h4>")

console.log(response);
getFiveDayForecast();

});
function getFiveDayForecast(research) {

var research = (event.target.innerText);

var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" +research+ "&appid=166a433c57516f51dfab1f7edaed8413";

$.ajax({
url: queryUrl,
method: "GET"
}).then(function(data) {


var forecastWeatherMarkUp = "";
for (let i = 0; i < data.list.length; i++) {
var tempF2 = (data.list[i].main.temp - 273.15) * 1.80 + 32;
  if (data.list[i].dt_txt.indexOf("12:00:00") > -1) {
      forecastWeatherMarkUp += `
      <div class="col-md card m-2">
          <div class="card-body">
              <div class="card-title">
                  <p>${new Date().toLocaleDateString()}</p>
              </div>
              <div><img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png"></div>
              <p>Temp: ${tempF2.toFixed(0)}&deg;F</p>
              <p>Humidity: ${data.list[i].main.humidity}%</p>
          </div>
      </div>
      `;
  }
}

$("#fiveDayForecast").html(forecastWeatherMarkUp);
});
};
})



