// need to make the archive city buttons active as search buttons
// need to set up the api call for lat and lng (done)
//need to populate archive city buttons upon page load
//need to link everything together 



let coordinateResponse = 'default'
let weatherResponse = 'default'
let currentTemp = 'default'
let currentWind = 'default'
let currentHumid = 'default'
let currentSymbol = 'default'
let localDate = dayjs().format('MM/DD/YYYY');
console.log(localDate)
let citySelected = 'Minneapolis'
let cityLat = 44.98
let cityLng = -93.2638
// let cityLat
// let cityLng
let cityArchiveList

//if else to allow cityKey to persist in localStorage
if(localStorage.getItem('cityKey')===null){
  cityArchiveList =[]
  console.log(cityArchiveList)
}
else{
  cityArchiveList = JSON.parse(localStorage.getItem('cityKey'));
  console.log(cityArchiveList)
}
////////////////////////////////////////////////////////////////
// search button 
let citySearchButton = $('button.searchButton')

citySearchButton.on('click',function(){
  console.log($(this));
  citySelected = $('textarea#cityInput').val()
  console.log(citySelected)
  cityArchiveList.push(citySelected)
  console.log(cityArchiveList)
  //https://www.geeksforgeeks.org/how-to-store-an-array-in-localstorage/
  let cityString = JSON.stringify(cityArchiveList)
  localStorage.setItem('cityKey',cityString)
  console.log(cityString)
  let retCityString = localStorage.getItem('cityKey')
  let retCityArchiveList = JSON.parse(retCityString)
  console.log(retCityArchiveList)
  console.log(retCityArchiveList.length)
  
  for (i=0;i<retCityArchiveList.length;i++){
    console.log(retCityArchiveList[i])
    var archiveInjection = $('#cityArchivery')
    archiveInjection.append(`<li><button type="button" class="archiveButton btn btn-primary col-12 me-2 mb-2">${retCityArchiveList[i]}</button></li>`)
  }
});

//////////////////////////////////////////////////////////////////////
// city archive buttons
let cityArchiveSearchButton = $('#cityArchivery')

cityArchiveSearchButton.on('click','.archiveButton',function(event){
  console.log('The Archivery is ALIVE')
  console.log($(this));

  console.log($(this).text());
  citySelected = $(this).text()
})


///////////////////////////////////////////////////////////////////////
//this is the API with the lat and lng
const api1URL = `https://api.openweathermap.org/data/2.5/weather?q=${citySelected}&appid=${apiKey}&units=imperial`
console.log(api1URL)
///////////////////////////////////////////////////////////////////////
fetch(api1URL)
  .then(response => {
    console.log(response)
    return response.json();
  })
  .then(response => {
    coordinateResponse = response
    console.log(coordinateResponse)
    //get city coordinates
    cityLat = response.coord.lat
    console.log(cityLat)
    cityLng = response.coord.lon
    console.log(cityLng)

  });


//////////////////////////////////////////////////////////////////////
const api2URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLng}&appid=${apiKey}&units=imperial`
console.log(api2URL)

//get weather data
fetch(api2URL)
  .then(response => {
    console.log(response)
    return response.json();
  })
  .then(response => {
    weatherResponse = response
    console.log(weatherResponse)
    //get data for current day
    currentTemp = response.list[0].main.temp
    console.log(currentTemp)
    currentWind = response.list[0].wind.speed
    console.log(currentWind)
    currentHumid = response.list[0].main.humidity
    console.log(currentHumid)
    currentSymbol = response.list[0].weather[0].icon  
    console.log(currentSymbol)    
   

    var iconURL = "http://openweathermap.org/img/w/" + currentSymbol + ".png";
    console.log(iconURL)
   
    $('.cityName').text(`${citySelected}`)
    $('.cityDate').text(`(${localDate})`)
    $('#wicon').attr('src', iconURL);
    $('#cityTemp').text(`Temp: ${currentTemp}°F`)
    $('#cityWind').text(`Wind: ${currentWind} MPH`)
    $('#cityHumid').text(`Humidity: ${currentHumid}%`)

    //loop through forcasts
    for(let i = 0;i<40;i=i+8){
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
      console.log(forecastSymbol)    
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



