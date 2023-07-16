// //able to console log the apiKey value
// console.log(apiKey)



let entireResponse = 'default'
let currentTemp = 'default'
let currentWind = 'default'
let currentHumid = 'default'
let currentSymbol = 'default'
let localDate = dayjs().format('MM/DD/YYYY');
console.log(localDate)
let citySelected = 'Minneapolis'
let cityLat = 'default'
let cityLng = 'default'

const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySelected}&appid=${apiKey}&units=imperial`
console.log(apiURL)


$('.cityContent').text(`${citySelected} (${localDate})`)


fetch(apiURL)
  .then(response => {
    console.log(response)
    return response.json();
  })
  .then(response => {
    // console.log(response.newboard.grids[0].solution)// targeting the obj example
    entireResponse = response
    console.log(entireResponse)
    currentTemp = response.main.temp
    currentWind = response.wind.speed
    currentHumid = response.main.humidity
    currentSymbol = response.weather[0].icon  //doesn't work yet
    var iconURL = "http://openweathermap.org/img/w/" + currentSymbol + ".png";
    console.log(iconURL)
   
    $('.cityContent').text(`${citySelected} (${localDate})`)
    $('#wicon').attr('src', iconURL);
    $('#wicon2').attr('src', iconURL);
    $('#cityTemp').text(`Temp: ${currentTemp}°F`)
    $('#cityWind').text(`Wind: ${currentWind} MPH`)
    $('#cityHumid').text(`Humidity: ${currentHumid}%`)

    

    console.log(currentTemp)
    console.log(currentWind)
    console.log(currentHumid)
    console.log(currentSymbol)    //it just might work
  });



