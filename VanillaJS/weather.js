const weather = document.querySelector(".js-weather");
const COORDS = 'coords';
const API_KEY = '59f4bd23fcf43a0f883bdebcbbd922f5';
//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}

function getWeather(latitude, longitude){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    }).then(function(json){
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp}/${place}`;
    });

}
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
}
function handleGeoError(){
    console.log("can't access your location!");
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}
function init(){
    loadCoords();
}

init();