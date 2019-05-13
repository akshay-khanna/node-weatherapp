const path= require('path') 
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const port = process.env.PORT || 3000

//console.log(__dirname)
//console.log(__filename)
const publicDirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
const app=express()
console.log(publicDirPath)
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirPath))
app.get('/',(req,res) =>{ 
    res.render('index',{title:'Weathers',name :'Akshay Khanna'})

})
 app.get('/help',(req,res)=>{
     res.render('help',{title: 'Help',
    name:'Akshay Khanna'})
 })

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Akshay Khanna'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'No Location to Fetch the Weather'
        })
    }
    const location=req.query.address
    geocode.geoCode(location,(error,{latitude,longitude,place_name}={})=>{
        
        if(error){
          return res.send({error})
        }
        
        forecast(latitude,longitude, (error, forecastData) => {
          if(error)
          {
            return  res.send({error})
          }
          res.send({address:req.query.address,
            location:place_name,
            forecast:forecastData})
        }) 

    })
       
})

app.get('/products',(req,res)=>{
    if(!req.query.type){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.type)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Akshay Khanna",
        errorMessage:"Help Article Not Found"
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Akshay Khanna",
        errorMessage:"Page Not Found"
    })
})
app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})