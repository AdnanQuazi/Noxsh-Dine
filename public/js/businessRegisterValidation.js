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