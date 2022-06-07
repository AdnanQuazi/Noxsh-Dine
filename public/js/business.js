const profOptionsCon = document.querySelector('.home-prof-div-con-b');

const openProfileOptions = ()=>{

    if(screen.width > 920){
         if( profOptionsCon.style.display === "flex"){

              profOptionsCon.style.opacity = "0";     
              profOptionsCon.style.display = "none";
    
         }else{
              profOptionsCon.style.opacity = "1";
              profOptionsCon.style.display = "flex"
         }
    }else{
         window.location.href = "/myprofile"
    }
    
    
}
