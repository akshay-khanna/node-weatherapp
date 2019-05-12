console.log('Client side javascript loaded')
/*fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
       console.log(data) 
    })
})
*/

const weatherform=document.querySelector('form')
const inputString=document.querySelector('input')
const mesg1=document.querySelector('#msg-1')
const mesg2=document.querySelector('#msg-2')


weatherform.addEventListener('submit',(e)=>{
e.preventDefault()
const location=inputString.value
mesg1.textContent='Loading....'
mesg2.textContent=''
fetch('http://localhost:3000/weather?address='+location).then(response=>{
    response.json().then((data)=>{
        if(data.error){
            mesg1.textContent=data.error
        }
        else{
            mesg1.textContent=data.location
            mesg2.textContent=data.forecast
        }
    })
})
})