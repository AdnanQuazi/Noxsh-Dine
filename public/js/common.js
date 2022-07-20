window.addEventListener('scroll', function (){

    let nav = document.querySelector('nav');

    let windowPosition = window.scrollY > 10;

    nav.classList.toggle('nav-scroll', windowPosition);
})



function displayDecLocCon(){

     const loccaret = document.querySelector('.loc-arr');
     
     const dec_loc_con= document.querySelector('.dec-loc-con');

     if(dec_loc_con.style.display == 'flex'){
          loccaret.style .transform = "rotate(0deg)";
         
         let tl = new TimelineLite();
          tl.to(dec_loc_con,0.5,{
                    opacity: 0,
                     display : "none",
                     marginTop : "0"
                       

          })
          
     
     }else{
          loccaret.style .transform = "rotate(180deg)";
          
         let tl = new TimelineLite();
          tl.to(dec_loc_con,0.5,{
               opacity: 1,
                display : "flex",
                marginTop : "2rem"
                  

     })
     }
}



const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links-con");
const logo = document.querySelector(".logo");
const icn = document.getElementById('bars');
const icn1 = document.getElementById('cross');
const accDet = document.querySelector('.acc-det');

burger.addEventListener('click', ()=>{
     logo.classList.toggle("blk")
     icn1.classList.toggle("blk")
     icn.classList.toggle("blk")
    nav.classList.toggle('nav-active');
    
    if(icn.style.display == 'none' && icn1.style.display == 'flex'){
         icn.style.display = 'flex'
         icn1.style.display = 'none'
          document.body.classList.remove("ovf");
          let tl = new TimelineLite();
          tl.to(accDet,0.5,{
               opacity: 0,
               top : "-100vh"
                    

          })
         
    }else{
         icn.style.display =  'none'
         icn1.style.display =  'flex'
         document.body.classList.add("ovf");
         let tl = new TimelineLite();
               tl.to(accDet,0.5,{
                    opacity: 1,
                    top : "65vh"
                         

               })
     
    }
    
   

})
const ovfh = ()=>{
     
    nav.classList.remove('nav-active');
    body.classList.remove('ovf');
    if(icn.style.display == 'none' && icn1.style.display == 'flex'){
         icn.style.display = 'flex'
         icn1.style.display = 'none'
    }else{
         icn.style.display =  'none'
         icn1.style.display =  'flex'
    }
}

const profOptionsCon = document.querySelector('.home-prof-div-con');


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



const topFaciCon = document.querySelector(".top-faci-con");
const morefaci = document.querySelector(".more-faci");

// const faciCon = document.querySelector(".faci-con");
// console.log(screen.width);
// faciCon.onclick = function () {
//      faciCon.scrollLeft += 20;
//    };

//    if(screen.width < 657 && screen.width > 423){

//      morefaci.addEventListener('click', ()=>{
//           if(topFaciCon.style.height != "100rem")
//           {
//                topFaciCon.style.height = "100rem";
//           }else{
//                topFaciCon.style.height = "45rem"
//           }
//      })
//    }
//    else if(screen.width < 423){
        
//      morefaci.addEventListener('click', ()=>{
//           if(topFaciCon.style.height != "145rem")
//           {
//                topFaciCon.style.height = "145rem";
//           }else{
//                topFaciCon.style.height = "45rem"
//           }
//      })
//    }
//    else{

//      morefaci.addEventListener('click', ()=>{
//           if(topFaciCon.style.height != "80rem")
//           {
//                topFaciCon.style.height = "80rem";
//           }else{
//                topFaciCon.style.height = "45rem"
//           }
//      })

//    }



