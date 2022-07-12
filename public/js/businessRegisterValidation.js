
//TOAST
let tl = new TimelineLite()

const hideToast = ()=>{
    let toast = document.querySelector('.my-toast')

    tl.to(toast,0.5,{
        opacity : "0",
        display : "none",
        top : 0
    })

    
    
}
const showToast = (data,color)=>{
    let toast = document.querySelector('.my-toast')
    color ? toast.querySelector('span').style.backgroundColor = color : toast.querySelector('span').style.backgroundColor = 'rgb(202, 29, 29)'
    
    toast.querySelector('span').innerHTML = data    
    tl.to(toast,0.5,{
        opacity : "1",
        display : "flex",
        top : "10rem"

    })
    
    setTimeout(hideToast,4000);

}   





const selectedDiv = document.querySelector('.selected-div');

function getSelected(i){
    
    const selected = document.querySelectorAll('input[name="outletType"]:checked');
    if(selected.length >=3){
        i.checked = false;
        var toastHTMLElement = document.querySelector('.toast')
            toastHTMLElement.childNodes[0].innerHTML = `You can only select 2`;
             var toastElement = new bootstrap.Toast(toastHTMLElement)
            toastElement.show();
        return
    }    
    const selectedOldData = document.querySelectorAll('.selected-item');
    selectedOldData.forEach((elem , i)=>{
        selectedOldData[i].remove();
    })
    
    selected.forEach(elem =>{
        let htmlData = `<div class="selected-item"><h4>${elem.value}</h4></div>`
    selectedDiv.insertAdjacentHTML('beforeend', htmlData);
    })
   
    
}
function getSelectedCuisine(i){
    const selected = document.querySelectorAll('input[name="cuisine"]:checked')
    
}

const openDiv = document.querySelector('.open-div');
const openTimeCon = document.querySelector('.open-time-wrap-con');

const closeDiv = document.querySelector('.close-div');
const closeTimeCon = document.querySelector('.close-time-wrap-con');

openDiv.addEventListener('click', ()=>{
    openTimeCon.style.display = "flex"
})
closeDiv.addEventListener('click', ()=>{
    closeTimeCon.style.display = "flex"
})


document.addEventListener('mouseup', function(e) {

    try {

         
   
    if (!openDiv.contains(e.target) && !openTimeCon.contains(e.target)) {
         openTimeCon.style.display = 'none';
          
    }
    if (!closeDiv.contains(e.target) && !closeTimeCon.contains(e.target)) {
        closeTimeCon.style.display = 'none';
         
   }
    
    } catch (error) {
         
    }
    
    
});


function openTime (i){
  const getH =  document.querySelector('input[name="openHour"]:checked');
  const getM =  document.querySelector('input[name="openMin"]:checked');
  const getOHT = document.querySelector('.open-hour-text');
  const getOMT = document.querySelector('.open-min-text');
 
    if(getH.value < 10){
        
        getOHT.innerHTML = "0" + getH.value
    }else{
        getOHT.innerHTML =  getH.value
    }
    if(getM.value < 10){
        getOMT.innerHTML = "0" + getM.value
    }else{
        getOMT.innerHTML = getM.value
    }
   
}



function closeTime (i){
    const getH =  document.querySelector('input[name="closeHour"]:checked');
    const getM =  document.querySelector('input[name="closeMin"]:checked');
    const getOHT = document.querySelector('.close-hour-text');
    const getOMT = document.querySelector('.close-min-text');
   
      if(getH.value < 10){
          
          getOHT.innerHTML = "0" + getH.value
      }else{
          getOHT.innerHTML =  getH.value
      }
      if(getM.value < 10){
          getOMT.innerHTML = "0" + getM.value
      }else{
          getOMT.innerHTML = getM.value
      }
     
  }





const namecheck = /^[A-Za-z. ]{2,30}$/;
const phonecheck = /^[789][0-9]{9}$/ ;
const emailcheck = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;


const allTextInputs = document.querySelectorAll('input[type=text]')
let allTelInputs = document.querySelectorAll('input[type=tel]')
let allEmailInputs = document.querySelectorAll('input[type=email]')
const allRadioInputs = document.querySelectorAll('input[type=radio]')
const allEstablishmentsInputs = document.querySelectorAll('input[name=establishment]')
const allOutletInputs = document.querySelectorAll('input[name=outletType]')
const allCuisineInputs = document.querySelectorAll('input[name=cuisine]')
const allWeekInputs = document.querySelectorAll('input[name=week]')








const prevBtns = document.querySelectorAll(".prev");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const nextBtn1 = document.querySelector('.next1');
const nextBtn2 = document.querySelector('.next2');
const nextBtn3 = document.querySelector('.next3');
const nextBtn4 = document.querySelector('.next4');




let formStepsNum = 0;


const step1Validation = async()=>{
    let validationStatus;
    let allTelInputs = document.querySelectorAll('input[type=tel]')
    for(let i = 0;i < allTextInputs.length; i++){

        if(allTextInputs[i].name == "restaurantName"){

            if(!namecheck.test(allTextInputs[i].value)){
                allTextInputs[i].style.borderColor = 'red'
                validationStatus = false
                showToast('Please fill the details','red')
                break
            }else{
                validationStatus = true

                allTextInputs[i].style.borderColor = '#afafaf'

            }
        }

        if(allTextInputs[i].name == "ownerName"){

            if(!namecheck.test(allTextInputs[i].value)){
                allTextInputs[i].style.borderColor = 'red'
                validationStatus = false
                showToast('Please fill the details','red')
                break
            }else{
                validationStatus = true
                
                allTextInputs[i].style.borderColor = '#afafaf'

            }
        }


        

        

        
    }

    if(validationStatus){
        for(let j = 0;j < allEmailInputs.length; j++){

            if(allEmailInputs[j].name == "ownerEmail"){
    
                if(!emailcheck.test(allEmailInputs[j].value)){
                    allEmailInputs[j].style.borderColor = 'red'
                    validationStatus = false
    
                    break
                }else{
                    validationStatus = true
    
                    allEmailInputs[j].style.borderColor = '#afafaf'
    
                } 
                
            }
    
        }
    }
    
    if(validationStatus){
       const verifyData = await fetch('/verify-step1',{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({payload: {phone : allTelInputs[0].value, email : allEmailInputs[0].value}})
       })
       let fData = await verifyData.json()
       console.log(fData);
       if(verifyData.status == 401){
            
            showToast(fData.msg,"Red");
       }else{
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();

       }    

    }

}



const step2Validation = async()=>{
    let validationStatus;

        for(let j = 0;j < allEstablishmentsInputs.length; j++){
            
            if(!allEstablishmentsInputs[j].checked){
                if(j == allEstablishmentsInputs.length - 1){
                    console.log("Please check");
                    allEstablishmentsInputs[j].style.borderColor = 'red'
                    showToast('Please Select Establishment type','red')                    

                    return
                    
                }

            }else{

                validationStatus = true
                break
            }
    
        }

        for(let k = 0; k < allOutletInputs.length; k++){

            if(!allOutletInputs[k].checked){
                
                if(k == allOutletInputs.length - 1){
                    console.log("Please check one");
                    showToast('Please Select Outlet type','red')                    

                    return

                }
            }else{

                validationStatus = true

                break

            }

        }

        for(let j = 0; j < allCuisineInputs.length;j++){
            if(!allCuisineInputs[j].checked){
                
                if(j == allCuisineInputs.length - 1){
                    console.log("Please check one");
                    showToast('Please Select Cuisines ','red')    
                    
                    return

                }
            }else{
                validationStatus = true

                break

            }
        }
        for(let l = 0;l < allWeekInputs.length;l++){
            if(allWeekInputs[l].checked){
                validationStatus = true
                break
            }else{
                showToast('Please Select at least one day','red')                    

                validationStatus = false
                return
            }
        }
    
        if(validationStatus){
            formStepsNum++;
            updateFormSteps();
            updateProgressbar();
        }
}

const step3Validation = ()=>{
    let resImgInp = document.querySelector('input[name=res-img-inp]');

    if(!resImgInp.value){
        showToast('Please Choose an Image', 'red')
    }else{
        formStepsNum++;
            updateFormSteps();
            updateProgressbar();
    }
}


const step4Validation = ()=>{
    let validationStatus = true;
    
    console.log(document.querySelector('select[name=account-type]').value)

    document.querySelectorAll('input').forEach(elem =>{
        elem.style.borderColor = '#afafaf'
    })
    document.querySelectorAll('label').forEach(elem =>{
        elem.style.borderColor = '#afafaf'
    })
    if(!document.querySelector('input[name=pan-number]').value){
        document.querySelector('input[name=pan-number]').style.borderColor = 'red'
        showToast('Please Enter Pan Number', 'red')
        validationStatus = false
        return
    }
    if(!document.querySelector('input[name=legal-entity]').value){
        document.querySelector('input[name=legal-entity]').style.borderColor = 'red'
        showToast('Please Enter Entity Name', 'red')
        validationStatus = false
        return
    }
    if(!document.querySelector('input[name=legal-entity-address]').value){
        document.querySelector('input[name=legal-entity-address]').style.borderColor = 'red'
        showToast('Please Enter Entity Address', 'red')
        validationStatus = false
        return
    }
    if(!document.querySelector('input[name=pan-img]').value){
        document.querySelector('.pan-img-upload').style.borderColor = 'red'
        showToast('Please Upload Pan Image', 'red')
        validationStatus = false
        return
    }
    if(document.querySelector('input[name="gst-registered"]:checked').value == "true"){
        if(!document.querySelector('input[name=gstin-number]').value){
            document.querySelector('input[name=gstin-number]').style.borderColor = 'red'
            showToast('Please Enter GST Number', 'red')
            validationStatus = false
            return
        }
        if(!document.querySelector('input[name=gst-img]').value){
            document.querySelector('.gst-img-upload').style.borderColor = 'red'
            showToast('Please Upload GST Image', 'red')
            validationStatus = false
            return
        }
        
        
    }

    if(!document.querySelector('input[name=fssai-number]').value){
        document.querySelector('input[name=fssai-number]').style.borderColor = 'red'
        showToast('Please Enter FSSAI Number', 'red')
        validationStatus = false
        return
    }
    if(!document.querySelector('input[name=fssai-expiry]').value){
        document.querySelector('input[name=fssai-expiry]').style.borderColor = 'red'
        showToast('Please Enter FSSAI Expiry', 'red')
        validationStatus = false
        return
    }
    if(!document.querySelector('input[name=fssai-img]').value){
        document.querySelector('.fssai-img-upload').style.borderColor = 'red'
        showToast('Please Upload FSSAI Image', 'red')
        validationStatus = false
        return
    }
    if(!document.querySelector('input[name=account-holder]').value){
        document.querySelector('.input[name=account-holder]').style.borderColor = 'red'
        showToast('Please Enter Account Holder Name', 'red')
        validationStatus = false
        return
    }
    if(!document.querySelector('input[name=bank-number]').value){
        document.querySelector('input[name=bank-number]').style.borderColor = 'red'
        showToast('Please Enter Bank Number', 'red')
        validationStatus = false
        return
    }else{
        if(document.querySelector('input[name=bank-number]').value != document.querySelector('input[name=re-bank-number]').value){
            document.querySelector('input[name=re-bank-number]').style.borderColor = 'red'
            showToast('Account number is not matching', 'red')
            validationStatus = false
            return
        }
        
    }
    if(!document.querySelector('input[name=bank-ifsc]').value){
        document.querySelector('input[name=bank-ifsc]').style.borderColor = 'red'
        showToast('Please Enter Bank IFSC', 'red')
        validationStatus = false
        return
    }
    if(!document.querySelector('select[name=account-type]').value){
        document.querySelector('select[name=account-type]').style.borderColor = 'red'
        showToast('Please Select Account Type', 'red')
        validationStatus = false
        return
    }

    if(validationStatus){
        registerRestaurant()
    }
   
}

const registerRestaurant = async()=>{
        let restaurantName = document.querySelector('input[name=restaurantName]').value || "ad";
        let restaurantAddress = document.querySelector('input[name=restaurantAddress]').value;
        let latitude = document.querySelector('input[name=lat]').value;
        let longitude = document.querySelector('input[name=long]').value;
        let phone = document.querySelector('input[name=phone]').value;
        let ownerName = document.querySelector('input[name=ownerName]').value;
        let ownerEmail = document.querySelector('input[name=ownerEmail]').value;
        let establishmentType = document.querySelector('input[name=establishment]:checked').value;
        let outletType = document.querySelectorAll('input[name=outletType]:checked');
        let outletTypeValue = []
         for(let i = 0; i < outletType.length;i++){
                outletTypeValue[i] = outletType[i].value
         }   
        let cuisineType = document.querySelectorAll('input[name=cuisine]:checked');
        let cuisineTypeValue = []
         for(let i = 0; i < cuisineType.length;i++){
                cuisineTypeValue[i] = cuisineType[i].value
         }   
        let openHour = document.querySelector('input[name=openHour]:checked').value
        let openMin = document.querySelector('input[name=openMin]:checked').value
        let closeHour = document.querySelector('input[name=closeHour]:checked').value
        let closeMin = document.querySelector('input[name=closeMin]:checked').value
        let weekDays = document.querySelectorAll('input[name=week]:checked');
        let weekDaysValue = []
         for(let i = 0; i < weekDays.length;i++){
                weekDaysValue[i] = weekDays[i].value
         }   
        
        let panNumber = document.querySelector('input[name=pan-number]').value;
        let legalEntity = document.querySelector('input[name=legal-entity]').value;
        let legalEntityAddress = document.querySelector('input[name=legal-entity-address]').value;
        let panImage = document.querySelector('input[name=pan-img]').files[0];
        let gstRegistered = document.querySelector('input[name=gst-registered]:checked').value;
        let gstNumber = document.querySelector('input[name=gstin-number]').value;
        let gstImage = document.querySelector('input[name=gst-img]').files[0];
        let gstMenuCharge = document.querySelector('input[name=gst-menu-charge]:checked').value
        let fssaiNumber = document.querySelector('input[name=fssai-number]').value;
        let fssaiExpiry = document.querySelector('input[name=fssai-expiry]').value;
        let fssaiImage = document.querySelector('input[name=fssai-img]').files[0];
        let accountHolder = document.querySelector('input[name=account-holder]').value;
        let bankNumber = document.querySelector('input[name=bank-number]').value;
        let accountType = document.querySelector('select[name=account-type]').value;
        let ifscCode = document.querySelector('input[name=bank-ifsc]').value;
        let restaurantImage = document.querySelector('input[name=res-img-inp]').files[0];
        console.log(restaurantImage);
        
        

        

            const formData = new FormData();
            formData.append('panImage', panImage);
            formData.append('gstImage', gstImage);
            formData.append('fssaiImage', fssaiImage);
            formData.append('restaurantName', restaurantName);
            formData.append('restaurantAddress', restaurantAddress);
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);
            formData.append('phone', phone);
            formData.append('ownerName',ownerName);
            formData.append('ownerEmail', ownerEmail);
            formData.append('establishmentType', establishmentType);
            formData.append('outletType', outletTypeValue);
            formData.append('cuisineType', cuisineTypeValue);
            formData.append('openHour', openHour);
            formData.append('openMin', openMin);
            formData.append('closeHour', closeHour);
            formData.append('closeMin', closeMin);
            formData.append('weekDays', weekDaysValue);
            formData.append('restaurantImage', restaurantImage);
            formData.append('panNumber', panNumber);
            formData.append('legalEntity', legalEntity);
            formData.append('legalEntityAddress', legalEntityAddress);
            formData.append('gstRegistered', gstRegistered);
            formData.append('gstNumber', gstNumber);
            formData.append('gstMenuCharge', gstMenuCharge);
            formData.append('fssaiNumber', fssaiNumber);
            formData.append('fssaiExpiry', fssaiExpiry);
            formData.append('accountHolder', accountHolder);
            formData.append('bankNumber', bankNumber);
            formData.append('accountType', accountType);
            formData.append('ifscCode', ifscCode);

            










            //    console.log(formData)
               
            // const response = await fetch("/business", {
            //     method: "POST",
                
            //     body: ,
            // });
            // const result = await response.json();
            // console.log(result.message);

        const sendData = await fetch('/business/register',{
            method : 'POST',
            body: formData
        })
        if(await sendData.json()){
            document.querySelector('.pp-bg-con').style.display = 'flex'
            document.querySelector('.pp-bg-con').style.top = window.scrollY
            document.body.classList.add('ovf')
        }else{
            document.body.classList.remove('ovf')
            showToast("Fialed" , 'red')
        }
}

function hidePopup(){
    document.querySelector('.pp-bg-con').style.display = 'none'
}

// nextBtns.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       formStepsNum++;
//       updateFormSteps();
//       updateProgressbar();
//     });
//   });
  
  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      formStepsNum--;
      updateFormSteps();
      updateProgressbar();
    });
  });


  
function updateFormSteps() {
    formSteps.forEach((formStep) => {
      formStep.classList.contains("step-active") &&
        formStep.classList.remove("step-active");
    });
  
    formSteps[formStepsNum].classList.add("step-active");
  }
  
  function updateProgressbar() {
    progressSteps.forEach((progressStep, idx) => {
      if (idx < formStepsNum + 1) {
        progressStep.classList.add("progress-step-active");
      } else {
        progressStep.classList.remove("progress-step-active");
      }
    });
  
    const progressActive = document.querySelectorAll(".progress-step-active");
  
    progress.style.height =
      ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
  }

nextBtn1.addEventListener('click', step1Validation);
nextBtn2.addEventListener('click',step2Validation);
nextBtn3.addEventListener('click',step3Validation);
nextBtn4.addEventListener('click',step4Validation);

document.querySelector('.verify-owner-email').addEventListener('click',async()=>{
    let allEmailInputs = document.querySelectorAll('input[type=email]')

    if(emailcheck.test(allEmailInputs[0].value)){
        allEmailInputs[0].style.borderColor = '#afafaf'
        document.querySelector('.otp-div-email').style.display = 'flex';
        const veriyEmail = await fetch('/verify-email',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({payload: allEmailInputs[0].value})
        })
    }else{
        allEmailInputs[0].style.borderColor = 'red';
       
        showToast('Invalid Email', 'red');
    }
   
})


document.querySelector('.verify-email-otp').addEventListener('click', async()=>{

    const otpVal = document.querySelector('input[name=email-otp]');
    const sendOtp = await fetch('/verify-email-otp',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({payload : otpVal.value})
    })
    const msg = await sendOtp.json()
    if(msg.msg == "Email Verified"){
        allEmailInputs[0].style.borderColor = '#3ea055'
        otpVal.parentNode.style.display = 'none'
        document.querySelector('.verify-owner-email').innerHTML = `<i class="bi bi-person-check-fill"></i>` + msg.msg
        document.querySelector('.verify-owner-email').style.backgroundColor = '#3ea055'
        document.querySelector('.verify-owner-email').style.borderColor = '#3ea055'
        document.querySelector('.verify-owner-email').style.pointerEvents = 'none';
        showToast(msg.msg, '#3ea055')   
    }else{
        showToast(msg.msg, 'red')

    }
})

document.querySelector('.verify-phone').addEventListener('click',async()=>{
    let numberVal = document.querySelector('input[name=phone]')

    if(phonecheck.test(numberVal.value)){
        numberVal.style.borderColor = '#afafaf'
        document.querySelector('.otp-div-phone').style.display = 'flex';
        const verifyPhone = await fetch('/verify-phone',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({payload: numberVal.value})
        })
    }else{
        numberVal.style.borderColor = 'red';
       

        showToast('Invalid Phone', 'red');
    }
   
})


document.querySelector('.verify-phone-otp').addEventListener('click', async()=>{

    const otpVal = document.querySelector('input[name=phone-otp]');
    const sendOtp = await fetch('/verify-phone-otp',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({payload : otpVal.value})
    })
    const msg = await sendOtp.json()
    if(msg.msg == "Phone Number Verified"){
        otpVal.style.borderColor = '#3ea055'
        otpVal.parentNode.style.display = 'none'
        
        document.querySelector('.verify-phone').innerHTML = `<i class="bi bi-person-check-fill"></i>` + 'Verified'
        document.querySelector('.verify-phone').style.backgroundColor = '#3ea055'
        document.querySelector('.verify-phone').style.borderColor = '#3ea055'
        document.querySelector('.verify-phone').style.pointerEvents = 'none';
        showToast(msg.msg, '#3ea055')
    }else{
        showToast(msg.msg, 'red')

    }
})


function hideGstDiv (e){

    if(e.value == "true"){
        document.querySelector('.gst-con-h-div').style.display = 'block'
    }else if(e.value == "false"){

        document.querySelector('.gst-con-h-div').style.display = 'none'
    }
}

function showDoc (e){
    if(e.value){

       
        
      const [file] = e.files
      if (file) {
       
       
        document.querySelector(`[data-doc-content='${e.dataset.docTarget}`).src = URL.createObjectURL(file)
        document.querySelector(`[data-doc-content='${e.dataset.docTarget}`).style.display = 'block'
      }
    
    }
}