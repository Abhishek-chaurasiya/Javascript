
class Weather{
    constructor(city,state,countrycode){
        this.apiKey='4f2b422fbf6f6e60ab8877540d74f17f';
        this.city=city;
        this.state=state;
        this.countrycode=countrycode;
    }
    async getWeather(){
        // const response=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${this.city}},${this.state}&appid=${this.apiKey}}`);

        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state},${this.countrycode}&appid=${this.apiKey}`)
         
        const responseData=await response.json();

        return responseData;
    }
    changeLocation(city,state){
        this.city=city;
        this.state=state;
    }
}

