const giveColor = (e , btn)=>{
   
    if(e.value){
       document.querySelector(`.${btn}`).style.backgroundColor = "#3ea055"
       document.querySelector(`.${btn}`).style.borderColor = "#3ea055"
       document.querySelector(`.${btn}`).style.color = "white"


    }else{
        document.querySelector(`.${btn}`).style.backgroundColor = "#f5f5f5"
        document.querySelector(`.${btn}`).style.borderColor = "#f5f5f5"
        document.querySelector(`.${btn}`).style.color = "#afafaf"

    }
}



const verifyUsername = async ()=>{
    let getUsername = document.querySelector('input[name="username"]').value;

    if(!getUsername){
        
    }else{
    let username = getUsername.split([""]);

                if(username[0] == "@"){
                       
                }else{
                        getUsername = "@" + getUsername;

                }
                console.log(getUsername);
                const sendUsername = await fetch('/forgot-password',{
                    method : 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({username: getUsername})
                })

                if(await sendUsername.json()){

                    document.querySelector('.fg-div1').style.display = "none"
                    document.querySelector('.fg-div2').style.display = "flex"
                }else{
                    document.querySelector('.text-danger-username').innerHTML = "Invalid Username"
                document.querySelector('.text-danger-username').style.opacity = "1"

                }
                
    }
        
}


const verifyOTP = async()=>{

    let otp = document.querySelector('input[name="otp"]').value;

    if(!otp){
       

    }else{
        const verification = await fetch('/verify-otp',{
            method : "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({otp})
        })

        if(await verification.json()){

            document.querySelector('.fg-div2').style.display = "none"
            document.querySelector('.fg-div3').style.display = "flex"
        }else{
            document.querySelector('.text-danger-otp').innerHTML = "Invalid OTP"
        document.querySelector('.text-danger-otp').style.opacity = "1"

        }
    }


}

const passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9 !@#$%^&*]{8,16}$/ ;

let valid = false;
const validation = async(btn)=>{
    const pass = document.querySelector('input[name="password"').value
    const cPass = document.querySelector('input[name="cPassword"').value 

    if(passwordcheck.test(pass)){

        valid = true;
        document.querySelector('.text-danger-password').style.opacity = "0"
       document.querySelector('.text-danger-password').innerHTML= ""


    }else{

        document.querySelector('.text-danger-password').innerHTML = "Password must be of 8 character and contain one number and one special character"
        document.querySelector('.text-danger-password').style.opacity = "1"

        return;

    }

    if(pass == cPass){

        valid = true
        document.querySelector(`.${btn}`).style.backgroundColor = "#3ea055"
       document.querySelector(`.${btn}`).style.borderColor = "#3ea055"
       document.querySelector(`.${btn}`).style.color = "white"
       document.querySelector('.text-danger-cPassword').style.opacity = "0"
       document.querySelector('.text-danger-cPassword').innerHTML= ""



    }else{
        document.querySelector(`.${btn}`).style.backgroundColor = "#f5f5f5"
        document.querySelector(`.${btn}`).style.borderColor = "#f5f5f5"
        document.querySelector(`.${btn}`).style.color = "#afafaf"

        document.querySelector('.text-danger-cPassword').innerHTML = "Passwords are not matching"
        document.querySelector('.text-danger-cPassword').style.opacity = "1"

        return



    }

        
}



const submitPassword = async()=>{
    if(valid){
    const pass = document.querySelector('input[name="password"').value


        const resetPassword = await fetch("/reset-password",{
            method : "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({password : pass})
        })

        if(await resetPassword.json()){
            window.location.href = './login'
        }else{
            console.log("Reset Unsuccessful");

        }
    
}else{


}

}