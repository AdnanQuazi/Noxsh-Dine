const namecheck = /^[A-Za-z. ]{2,30}$/;
const passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9 !@#$%^&*]{8,16}$/ ;
const phonecheck = /^[789][0-9]{9}$/
const dangerfname = document.getElementById('danger-fname');
const dangerphone = document.getElementById('danger-phone');
const dangerpass = document.getElementById('danger-pass');
const dangerSpan = document.querySelector('.danger-l-span');


let tl = new TimelineLite()
const hideToast = ()=>{
    let toast = document.querySelector('.my-toast')

    tl.to(toast,0.5,{
        opacity : "0",
        display : "none",
        top : "0"
    })

    
    
}
const showToast = (data,color)=>{
    let toast = document.querySelector('.my-toast')
    color ? toast.querySelector('span').style.backgroundColor = color : toast.querySelector('span').style.backgroundColor = 'rgb(202, 29, 29)'
    
    toast.querySelector('span').innerHTML = data    
    tl.to(toast,0.5,{
        opacity : "1",
        display : "flex",
        top : window.scrollY + 100

    })
    
    setTimeout(hideToast,4000);

}   

     let password 
     let firstname 
     let conpass 
     let email
     let username 

let vStatus;
const validation = async()=>{
     
      password = document.getElementById('password').value;
      firstname = document.getElementById('name').value;
      conpass = document.getElementById('confirmpassword').value
      email = document.getElementById('email').value;
      username = document.getElementById('username');

     
     
     if(namecheck.test(firstname) ){
          dangerfname.innerHTML = "";
          vStatus = true
     }else{
          if(screen.width < 480){
               showToast('Invalid Name','red')
               vStatus = false
               return false
          }else{
               dangerfname.innerHTML = "Invalid Name";
               vStatus = false
               return false
          }
         
     }
    
     // if(phonecheck.test(phone) ){
     //      dangerphone.innerHTML = "";
     //      vStatus = true
     // }else{
     //      if(screen.width < 480){
     //           showToast('Invalid Number','red')
     //           vStatus = false
     //           return false
     //      }else{
     //           dangerphone.innerHTML = "Invalid Number";
     //           vStatus = false
     //           return false
     //      }
         
     // }
     if(passwordcheck.test(password) ){
          dangerpass.innerHTML = "";
          vStatus = true
     }else{
          if(screen.width < 480){
               showToast('At least one number and one special character is required','red')
               vStatus = false
               return false
          }else{
          dangerpass.innerHTML = "At least one number and one special character is required*";
          vStatus = false
          return false
          }
     }
     if(password == conpass){
          dangerpass.innerHTML = "";
          vStatus = true
          localStorage.setItem("userReg", true)
     }else{
          if(screen.width < 480){
               showToast('Passwords are not matching','red')
               vStatus = false
               return false
          }else{
               dangerpass.innerHTML = "Passwords are not Matching";
               vStatus = false
               return false
          }
         
     }
     
     vStatus = await checkUsername(username)
     if(vStatus && username.value.length >= 2){

          const sendOtp = await fetch("/send-register-otp",{
               method : 'POST',
               headers : {'Content-Type' : 'application/json'},
               body : JSON.stringify({email : email})      
          })
          if(await sendOtp.status == 200){
               document.querySelector(".popup-div").style.display = "grid"
          }


          
     }
    
}
const checkUsername = async(e)=>{
     
     const findUsername = await fetch('/check-username',{
          method : 'POST',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({payload : e.value})
     })
     let result = await findUsername.json()
     console.log(result)
     if(result){
          e.parentElement.style.borderColor = "red";
          return false
     }else{
          e.parentElement.style.borderColor = "green";
          return true
     }
}
let isInProcess = false;
document.querySelector("#signUpAOTPS").addEventListener('click',async ()=>{
     let otp = document.querySelector('input[name="OTP"]').value
     if(!otp) return

     if(vStatus && !isInProcess && username.value.length >= 2){
          isInProcess = true
          const otpAuth = await fetch('/verify-otp',{
               method : 'POST',
               headers : {'Content-Type' : 'application/json'},
               body : JSON.stringify({otp : otp})               
          })
          if(await otpAuth.status == 200){
               const signUp = await fetch('/signup',{
                    method : 'POST',
                    headers : {'Content-Type' : 'application/json'},
                    body : JSON.stringify({name : firstname , username : username.value,email : email,password : password})
               })
     
               let result = await signUp.json()
               if(result.msg == 'Phone number exists'){
                    showToast(result.msg,'red')
                    isInProcess = false
               }else{
                    showToast("Account Created Successfully",'#3ea055');
                    setTimeout(() => {
                         window.location.href = '/'
                    }, 3000);
                    isInProcess = false
               }
          }else{
               isInProcess = false
               showToast("Invalid OTP","red")
          }
     }
     

})