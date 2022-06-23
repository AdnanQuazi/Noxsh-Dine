import * as toast from './toast.js'





export const getUser = async()=>{
    const nameInp = document.querySelector('input[name=fullName]');
    const usernameInp = document.querySelector('input[name=username]');
    const emailInp = document.querySelector('input[name=email]');
    const phoneInp = document.querySelector('input[name=phone]');
    const privateInp = document.querySelector('input[name=privateAccount]');
    const bloggerInp = document.querySelector('input[name=bloggerAccount]');
    const imageInp = document.querySelector('.profileImageLabel');

    const getData = await fetch('/send-prof-det',{
        method : "POST"
    })
    let finalData = await getData.json()

    if(finalData){
        nameInp.value = finalData.name 
        usernameInp.value = finalData.username
        emailInp.value = finalData.email ? finalData.email : ''
        phoneInp.value =`+91 ${finalData.phone}`
    }
    finalData.privateAccount ? privateInp.checked = true : privateInp.checked = false
    finalData.bloggerAccount ? bloggerInp.checked = true : bloggerInp.checked = false
    finalData.profileImg ? imageInp.style.backgroundImage = `/uploads/${finalData.profileImg}` : imageInp.style.backgroundImage = '/images/avatar.png'
    
}








function hideDiv(){
     dangerSpan.style.opacity = '0'
}
function validation(){

    
const namecheck = /^[A-Za-z. ]{2,30}$/;
const phonecheck = /^[789][0-9]{9}$/ ;
const emailcheck = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const dangerfname = document.querySelector('.text-danger-fullName');
const dangerphone = document.querySelector('.text-danger-phone');
const dangerusername = document.querySelector('.text-danger-username');
const dangeremail = document.querySelector('.text-danger-email');

     
     const fullName = document.querySelector('input[name=fullName]');
     const phone = document.querySelector('input[name=phone]');
     const email = document.querySelector('input[name=email]');
     const username = document.querySelector('input[name=username]');


       

            if(namecheck.test(fullName.value) ){
                dangerfname.style.opacity = '0'
                fullName.style.borderColor = '#afafaf'  


           }else{
              //   if(screen.width < 480){
              //        dangerSpan.innerHTML = "Invalid Name"
              //        dangerSpan.style.opacity = "1"
              //        setTimeout(hideDiv,3000)
              //        return false
              //   }else{
              //        
              //   }
      
              dangerfname.innerHTML = "Invalid Name";
              dangerfname.style.opacity = '1'
              fullName.style.borderColor = 'rgb(220,53,69)'  
              return false
               
           }

           if(username.value){
            dangerusername.style.opacity = '0'
            username.style.borderColor = '#afafaf'  


       }else{
          //   if(screen.width < 480){
          //        dangerSpan.innerHTML = "Invalid Name"
          //        dangerSpan.style.opacity = "1"
          //        setTimeout(hideDiv,3000)
          //        return false
          //   }else{
          //        
          //   }
  
          dangerusername.innerHTML = "Username Required";
          dangerusername.style.opacity = '1'
          username.style.borderColor = 'rgb(220,53,69)'  
          return false
           
       }
          
        //    if(phonecheck.test(phone.value) ){

        //     dangerphone.style.opacity = '0'
        //     phone.style.borderColor = '#afafaf'  


        //    }else{
        //       //   if(screen.width < 480){
        //       //        dangerSpan.innerHTML = "Invalid Number"
        //       //        dangerSpan.style.opacity = "1"
        //       //        setTimeout(hideDiv,3000)
        //       //        return false
        //       //   }else{
        //       //        
        //       //   }
        //       dangerphone.innerHTML = "Invalid Number";
        //       dangerphone.style.opacity = '1'
        //       phone.style.borderColor = 'rgb(220,53,69)'  
             
        //       return false
               
        //    }
           if(email.value){
            if(emailcheck.test(email.value) ){
                dangeremail.style.opacity = '0'
                email.style.borderColor = '#afafaf'  


             }else{
                dangeremail.innerHTML = "Invalid Email";
                dangeremail.style.opacity = '1'
                email.style.borderColor = 'rgb(220,53,69)'  

                return false
             }
           }
          
        
     
    
    //  if(passwordcheck.test(password) ){
    //       dangerpass.innerHTML = "";
          
    //  }else{
    //       if(screen.width < 480){
    //            dangerSpan.innerHTML = "at least one number and one special character is required"
    //            dangerSpan.style.opacity = "1"
    //            setTimeout(hideDiv,3000)
    //            return false
    //       }else{
    //       dangerpass.innerHTML = "at least one number and one special character is required*";
    //       return false
    //       }
    //  }
    //  if(password == conpass){
    //       dangerpass.innerHTML = "";
    //       localStorage.setItem("userReg", true)
    //  }else{
    //       if(screen.width < 480){
    //            dangerSpan.innerHTML = "Passwords are not Matching"
    //            dangerSpan.style.opacity = "1"
    //            setTimeout(hideDiv,3000)
    //            return false
    //       }else{
    //            dangerpass.innerHTML = "Passwords are not Matching";
    //            return false
    //       }
         
    //  }
        return true
    
}
export const saveDetails = async()=>{

    
    
    if(validation()){
        let details = {
            name : document.querySelector('input[name=fullName]').value ,
            username : document.querySelector('input[name=username]').value,
            email : document.querySelector('input[name=email]').value

        }
        const sendDetails = await fetch('/edit-profile',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({payload: details})
        })
        let res = await sendDetails.json()
        if(res == true){
            toast.showToast('Saved Successfully',"#198754");
            
        }else{
            if(res[0] == 'email'){
                toast.showToast('E-mail already taken')
            }
            if(res[0] == 'username'){
                toast.showToast('Username already taken')
            }


        }


    }else{
        console.log("nojp")
    }
}

export const privateAccount = async()=>{
    const checkStatus = document.querySelector('input[name=privateAccount]').checked
    console.log(checkStatus)
    const sendData = await fetch ('/private-account',{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({payload: checkStatus})
    })
}
export const bloggerAccount = async()=>{
    const checkStatus = document.querySelector('input[name=bloggerAccount]').checked
    console.log(checkStatus)
    const sendData = await fetch ('/blogger-account',{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({payload: checkStatus})
    })
}