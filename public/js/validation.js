const namecheck = /^[A-Za-z. ]{2,30}$/;
const passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9 !@#$%^&*]{8,16}$/ ;
const phonecheck = /^[789][0-9]{9}$/
const dangerfname = document.getElementById('danger-fname');
const dangerphone = document.getElementById('danger-phone');
const dangerpass = document.getElementById('danger-pass');

function validation(){
     
     const password = document.getElementById('password').value;
     const firstname = document.getElementById('name').value;
     const conpass = document.getElementById('confirmpassword').value
     const phone = document.getElementById('phone').value;
     
     
     if(namecheck.test(firstname) ){
          dangerfname.innerHTML = "";
     }else{
          dangerfname.innerHTML = "Invalid Name";
          return false
     }
    
     if(phonecheck.test(phone) ){
          dangerphone.innerHTML = "";
     }else{
          dangerphone.innerHTML = "Invalid Number";
          return false
     }
     if(passwordcheck.test(password) ){
          dangerpass.innerHTML = "";
          
     }else{
          dangerpass.innerHTML = "at least one number and one special character is required*";
          return false
     }
     if(password == conpass){
          dangerpass.innerHTML = "";
          localStorage.setItem("userReg", true)
     }else{
          dangerpass.innerHTML = "Password are not Matching";
          return false
     }
}
