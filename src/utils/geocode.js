const request=require('request')
const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieGEwMiIsImEiOiJjanY3MXhtcmUwMHlyNDNtajJqNG13OGRoIn0.PgkSFH7GREn9eLAGObZT4w&limit=1'
    request({url  ,json: true} ,(error,{body})=>{
        if(error){
            callback('Unable to connect to the API',undefined)
        }
        else if(body.features.length===0){
            callback('Unable to find location',undefined)
        }
        else
        {
            
            const {features}=body;
            callback(undefined,{
                place_name: features[0].place_name,
                longitude: features[0].center[0] ,
                latitude: features[0].center[1]
            })
        }   
       
    })
}
module.exports={
    geoCode:geoCode
}