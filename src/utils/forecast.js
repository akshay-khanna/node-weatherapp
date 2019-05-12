//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request=require('request') 
const forecast=(latitude,longitude,callback)=>{
const url='https://api.darksky.net/forecast/aad0b0371bc6e87264707ffb1aca7a72/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)
console.log(url);
request({ url, json: true} ,(error,{body})=>{
    if(error){
        callback("Unable to connect to the API",undefined)
    }
    else if(body.error){
        callback('Unable to find location',undefined)
    }
    else
    {
        
        const {currently}=body
        const{daily:today}=body

        // callback(undefined,{
        //     summary:response.body.daily.data[0].summary,
        //     temp:response.body.currently.temperature ,
        //     precProob:response.body.currently.precipProbability
        // })
        callback(undefined,today.data[0].summary +".It is currently " + currently.temperature + " degrees out.There is a "+currently.precipProbability+"% chance of rain.")
    }
    })     
}
 module.exports=forecast
 