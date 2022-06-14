const namecheck = /^[A-Za-z. ]{2,30}$/;
const passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9 !@#$%^&*]{8,16}$/ ;
const phonecheck = /^[789][0-9]{9}$/
const dangerfname = document.getElementById('danger-fname');
const dangerphone = document.getElementById('danger-phone');
const dangerpass = document.getElementById('danger-pass');
const dangerSpan = document.querySelector('.danger-l-span');

function hideDiv(){
     dangerSpan.style.opacity = '0'
}
function validation(){
     
     const password = document.getElementById('password').value;
     const firstname = document.getElementById('name').value;
     const conpass = document.getElementById('confirmpassword').value
     const phone = document.getElementById('phone').value;
     
     
     if(namecheck.test(firstname) ){
          dangerfname.innerHTML = "";
     }else{
          if(screen.width < 480){
               dangerSpan.innerHTML = "Invalid Name"
               dangerSpan.style.opacity = "1"
               setTimeout(hideDiv,3000)
               return false
          }else{
               dangerfname.innerHTML = "Invalid Name";
               return false
          }
         
     }
    
     if(phonecheck.test(phone) ){
          dangerphone.innerHTML = "";
     }else{
          if(screen.width < 480){
               dangerSpan.innerHTML = "Invalid Number"
               dangerSpan.style.opacity = "1"
               setTimeout(hideDiv,3000)
               return false
          }else{
               dangerphone.innerHTML = "Invalid Number";
               return false
          }
         
     }
     if(passwordcheck.test(password) ){
          dangerpass.innerHTML = "";
          
     }else{
          if(screen.width < 480){
               dangerSpan.innerHTML = "at least one number and one special character is required"
               dangerSpan.style.opacity = "1"
               setTimeout(hideDiv,3000)
               return false
          }else{
          dangerpass.innerHTML = "at least one number and one special character is required*";
          return false
          }
     }
     if(password == conpass){
          dangerpass.innerHTML = "";
          localStorage.setItem("userReg", true)
     }else{
          if(screen.width < 480){
               dangerSpan.innerHTML = "Passwords are not Matching"
               dangerSpan.style.opacity = "1"
               setTimeout(hideDiv,3000)
               return false
          }else{
               dangerpass.innerHTML = "Passwords are not Matching";
               return false
          }
         
     }

    
}
