
const weather =new Weather('allahabad','Uttar Pradesh','91');

//get weather on dom load
document.addEventListener('DOMContentLoaded',getWeather);

//weather.changeLocation('kanpur','Uttar Pradesh','91');

function getWeather(){
    weather.getWeather()
    .then(results=>{
        console.log(results);
        ui.paint(results);
    })
    .catch(err=>console.log(err));
}