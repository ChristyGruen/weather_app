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
  //this would work if I could make a js object, but MVP could be a list of cities
  //create object that will save button info and can recreate buttons when you refresh the website
  //add the citySelected to the object
  // need to stringify the object
  //localStorage.setItem('cityArchive, nameOfStringifiedObject)
  //pull the object from localStorage and jsonify
  //call function to create the buttons?  can also be used when the page loads
  console.log(retCityArchiveList.length)
  
  // this caused LOTS of errors, bad loop?
  for (i=0;i<retCityArchiveList.length;i++){
    console.log(retCityArchiveList[i])
  }
  

  

  // set new submission to local storage 
  // localStorage.setItem("user", JSON.stringify(user));




});






//this is the API with the lat and lng
// const api1URL = `https://api.openweathermap.org/data/2.5/weather?q=${citySelected}&appid=${apiKey}&units=imperial`
// console.log(api1URL)

const api2URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLng}&appid=${apiKey}&units=imperial`
console.log(api2URL)




//get weather data
fetch(api2URL)
  .then(response => {
    console.log(response)
    return response.json();
  })
  .then(response => {
    entireResponse = response
    console.log(entireResponse)
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
   
    $('.cityContent').text(`${citySelected} (${localDate})`)
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



