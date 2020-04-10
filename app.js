const request = require("./node_modules/request")
const chalk = require("./node_modules/chalk")
const fs = require("fs")



const LoadCityList=()=>{

    try {
        const databuffer = fs.readFileSync("city.list.json");
        const  dataJSON = databuffer.toString();
      //  console.log(dataJSON)
        return JSON.parse(dataJSON);
    } catch (error) {
        return []
    }
}






const getweather=(CityName,CountryCode)=>{

    

    const cities = LoadCityList()
   
    const RequestedCity = cities.filter((city) => city.name === CityName && city.country === CountryCode)

    
    
    if(RequestedCity.length === 0 ){
        console.log("Unable to find the City")

    }else{
        const id = RequestedCity[0].id
        console.log(id)
    
    
        
    const Weatherurl = "https://api.openweathermap.org/data/2.5/weather?id=" + id + "&appid=6b8630e18537115c76c10d09f8aa7ee3"
    request({url:Weatherurl},(error,response)=>{
        if(error){
            console.log("Sorry! Unable to Connect to Weather Services!")
        }else if(response.body.error){
            console.log("Unable to find Location")
    
        }
        else{
                   const WeatherObject = JSON.parse(response.body)
                  

                   const celsius = (WeatherObject.main.temp - 273).toFixed(2)
                   const farhenit= ((celsius * 9/5)+32).toFixed(2)
                  
                 // console.log(WeatherObject)

                console.log('\n\t~~~~~~~~~~~ Weather Forecast ~~~~~~~~~~')

                console.log(chalk.blue('\tCity: '), chalk.redBright.bold(CityName))
                console.log(chalk.blue('\tCountry: '), chalk.redBright.bold(CountryCode))
                console.log(chalk.blue('\tCondition: '), chalk.redBright.bold(WeatherObject.weather[0].description))
                console.log(chalk.blue('\tCurrent Temperature: '), chalk.redBright.bold(farhenit + '°F / ' + celsius + '°C\n'))
                  
        }

    })
    }

    
}
   

module.exports.getweather = getweather;

