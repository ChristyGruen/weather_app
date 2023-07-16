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
let cityLat = 44.98
let cityLng = -93.2638



// const api1URL = `https://api.openweathermap.org/data/2.5/weather?q=${citySelected}&appid=${apiKey}&units=imperial`
// console.log(api1URL)

const api2URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLng}&appid=${apiKey}&units=imperial`
console.log(api2URL)


$('.cityContent').text(`${citySelected} (${localDate})`)


fetch(api2URL)
  .then(response => {
    console.log(response)
    return response.json();
  })
  .then(response => {
    // console.log(response.newboard.grids[0].solution)// targeting the obj example
    entireResponse = response
    console.log(entireResponse)
    currentTemp = response.list[0].main.temp
    console.log(currentTemp)
    currentWind = response.list[0].wind.speed
    console.log(currentWind)
    currentHumid = response.list[0].main.humidity
    console.log(currentHumid)
    currentSymbol = response.list[0].weather[0].icon  //worked to get url 4 icon
    console.log(currentSymbol)    //it just might work
    // currentSymbol = response.weather[0].icon  //worked to get the url 4 the icon

    var iconURL = "http://openweathermap.org/img/w/" + currentSymbol + ".png";
    console.log(iconURL)
   
    $('.cityContent').text(`${citySelected} (${localDate})`)
    $('#wicon').attr('src', iconURL);
    $('#cityTemp').text(`Temp: ${currentTemp}°F`)
    $('#cityWind').text(`Wind: ${currentWind} MPH`)
    $('#cityHumid').text(`Humidity: ${currentHumid}%`)



    // //first forecastDay
    // let forecastDate = response.list[8].dt_txt.split(" ")[0]

    // let forecastTemp = response.list[8].main.temp
    // console.log(forecastTemp)
    // let forecastWind = response.list[8].wind.speed
    // console.log(forecastWind)
    // let forecastHumid = response.list[8].main.humidity
    // console.log(forecastHumid)
    // let forecastSymbol = response.list[8].weather[0].icon  //worked to get url 4 icon
    // console.log(forecastSymbol)    //it just might work
    // // currentSymbol = response.weather[0].icon  //worked to get the url 4 the icon

    // var iconURL = "http://openweathermap.org/img/w/" + forecastSymbol + ".png";
    // console.log(iconURL)
   
    // $('.fDate1').text(`${forecastDate}`)
    // $('#fwicon1').attr('src', iconURL);
    // $('#fTemp1').text(`Temp: ${forecastTemp}°F`)
    // $('#fWind1').text(`Wind: ${forecastWind} MPH`)
    // $('#fHumid1').text(`Humidity: ${forecastHumid}%`)


    //     //second forecastDay 
    // forecastDate = response.list[16].dt_txt.split(" ")[0]
    // forecastTemp = response.list[16].main.temp
    // console.log(forecastTemp)
    // forecastWind = response.list[16].wind.speed
    // console.log(forecastWind)
    // forecastHumid = response.list[16].main.humidity
    // console.log(forecastHumid)
    // forecastSymbol = response.list[16].weather[0].icon  //worked to get url 4 icon
    // console.log(forecastSymbol)    //it just might work
    // // currentSymbol = response.weather[0].icon  //worked to get the url 4 the icon

    // var iconURL = "http://openweathermap.org/img/w/" + forecastSymbol + ".png";
    // console.log(iconURL)
   
    // $('.fDate2').text(`${forecastDate}`)
    // $('#fwicon2').attr('src', iconURL);
    // $('#fTemp2').text(`Temp: ${forecastTemp}°F`)
    // $('#fWind2').text(`Wind: ${forecastWind} MPH`)
    // $('#fHumid2').text(`Humidity: ${forecastHumid}%`)
////////////////////////////////////////////////////////////
//try for forecast loop

    //first forecastDay
    for(let i = 0;i<40;i=i+8){
      // let forecastDate = localDate
      let forecastDate = response.list[i].dt_txt.split(" ")[0] 
      console.log(response.list[i].dt_txt)
      console.log(forecastDate)
      let forecastTemp = response.list[i].main.temp
      console.log(forecastTemp)
      let forecastWind = response.list[i].wind.speed
      console.log(forecastWind)
      let forecastHumid = response.list[i].main.humidity
      console.log(forecastHumid)
      let forecastSymbol = response.list[i].weather[0].icon  //worked to get url 4 icon
      console.log(forecastSymbol)    //it just might work
      // currentSymbol = response.weather[0].icon  //worked to get the url 4 the icon

      var iconURL = "http://openweathermap.org/img/w/" + forecastSymbol + ".png";
      console.log(iconURL)
      console.log(i)
    
      $(`.fDate${(i+8)/8}`).text(`${forecastDate}`)
      $(`#fwicon${(i+8)/8}`).attr('src', iconURL);
      $(`#fTemp${(i+8)/8}`).text(`Temp: ${forecastTemp}°F`)
      $(`#fWind${(i+8)/8}`).text(`Wind: ${forecastWind} MPH`)
      $(`#fHumid${(i+8)/8}`).text(`Humidity: ${forecastHumid}%`)
    }

  });



