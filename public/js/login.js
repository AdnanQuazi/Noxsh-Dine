
import * as toast from './toast.js'




 export const login = async()=>{
    const username = document.querySelector('input[name="username"]').value
    const password = document.querySelector('input[name="password"]').value
    
    const sendDetails = await fetch('/login',{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username,password : password})
    })
 

    if(await sendDetails.json() == true){

        toast.showToast("Welcome Back","green")


            setTimeout(function(){
                toast.hideToast()
                window.location.href = './'
            },1000)
    }else{

        toast.showToast("Invalid Credentials")
        
    }
}