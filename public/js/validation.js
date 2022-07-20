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



let vStatus;
const validation = async()=>{
     
     const password = document.getElementById('password').value;
     const firstname = document.getElementById('name').value;
     const conpass = document.getElementById('confirmpassword').value
     const phone = document.getElementById('phone').value;
     const username = document.getElementById('username');

     
     
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
    
     if(phonecheck.test(phone) ){
          dangerphone.innerHTML = "";
          vStatus = true
     }else{
          if(screen.width < 480){
               showToast('Invalid Number','red')
               vStatus = false
               return false
          }else{
               dangerphone.innerHTML = "Invalid Number";
               vStatus = false
               return false
          }
         
     }
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
          const signUp = await fetch('/signup',{
               method : 'POST',
               headers : {'Content-Type' : 'application/json'},
               body : JSON.stringify({name : firstname , username : username.value,phone : phone,password : password})
          })

          let result = await signUp.json()
          if(result.msg == 'Phone number exists'){
               showToast(result.msg,'red')
          }else{
               showToast("Account Created Successfully",'#3ea055');
               setTimeout(() => {
                    window.location.href = '/'
               }, 3000);
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