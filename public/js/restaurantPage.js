const select = document.querySelectorAll('.date-radio');
console.log(select);
const weekRadio = document.querySelectorAll('.week-date');
const monthRadio = document.querySelectorAll('.month');
const date = new Date();
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const week = {
     0: "Sun",
     1 : "Mon",
     2 : "Tue",
     3 : "Wed",
     4 : "Thu",
     5 : "Fri",
     6 : "Sat",
     
}
let timeCount = 0;

let todayDay = `${week[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`


select.forEach((item)=>{

     
    const tom = new Date(date.getTime('en-US',{
    }) + timeCount * 60 * 60 * 1000);
  
    
  
     const finalDate = `${week[tom.getDay()]}, ${tom.getDate()} ${months[tom.getMonth()]}`;

    item.value = finalDate
    select[0].checked = true;

    console.log(item);
     timeCount += 24;
})

timeCount = 0;
weekRadio.forEach((item)=>{

     const tom = new Date(date.getTime('en-US',{
     }) + timeCount * 60 * 60 * 1000);
   

     item.innerText = `${tom.getDate()} ${week[tom.getDay()]}`

     timeCount += 24;
})
timeCount = 0;
monthRadio.forEach((item)=>{
     const tom = new Date(date.getTime('en-US',{
     }) + timeCount * 60 * 60 * 1000);
   

     item.innerText = `${months[tom.getMonth()]}`

     timeCount += 24;
})









const timing = document.querySelectorAll('.checkmark');
const timingCon =document.querySelector('.timing-con');

let tCount = 20;




   





// let closeT = 23;
// let openT = 9;
// let tttCount = 30;
// let minCount = "00"
// var i = 1;
// var  v = 1;
// let ttt = new Date(date.getTime('en-US', { hour: 'numeric', hour12: true, minute: '2-digit'}));

// let hours ;

// for(hours = ttt.getHours(); hours == closeT;){

    
          
          

//            hours = ttt.getHours();
         
         
//          let min =  ttt.getMinutes();
      



     


let closeT = 23;
let openT = 9;
let tttCount = 30;
let minCount = "00"
var i = 1;
var  v = 1;
let ttt = new Date(date.getTime('en-US', { hour: 'numeric', hour12: true, minute: '2-digit'}));


const removeTimeNode = ()=>{
   
          const timeLabel = document.querySelector('.timing-con').childNodes;
          
          if(timeLabel.length > 0){

               for(var y = timeLabel.length - 1; y >= 0 ; y--){

                    timeLabel[y].remove();
                    
               }

          }

     
    

}

const timDis = (r)=>{

     removeTimeNode();
     
     if(r == todayDay || r == null){
          
    
   
          let hours ;
           let min =  ttt.getMinutes();


          
           for(hours = ttt.getHours() ;hours < closeT;hours++){
              
               
                if( hours >= closeT){
                   return
                }else{
                     if(min > 20){
                              
                         if(hours == closeT -1){
                            
                              hours = hours
                         }else{
                             hours = hours + v
                             
                         }
                          
                         
                          
                         let ampm = hours >= 12 ? 'PM' : 'AM';
                         let  hours12 = (hours % 12) || 12;

                          let finaltime = `${hours12}:${minCount} ${ampm}`
                          
                          let htmlData = `<label class="container time-label">
                          <input class="time" type="radio" checked="checked" name="time" value = "${finaltime}">
                          <span class="checkmark">${finaltime}</span>
                          </label>`
                         
                           timingCon.insertAdjacentHTML('beforeend', htmlData)
                          
                         
                           if(minCount == 30){
                              minCount = "00"
                         }else{
                              minCount = 30
                         }

                         finaltime = `${hours12}:${minCount} ${ampm}`
                          
                         htmlData = `<label class="container time-label" value = "${finaltime}">
                         <input class="time" type="radio" checked="" name="time" value = "${finaltime}">
                         <span class="checkmark">${finaltime}</span>
                         </label>`
                        
                          timingCon.insertAdjacentHTML('beforeend', htmlData)
                          

                          if(minCount == 30){
                              minCount = "00"
                         }else{
                              minCount = 30
                         }

                     }else{
                        
                         
                         
                          
                          let ampm = hours >= 12 ? 'PM' : 'AM';
                          let hours12 = (hours % 12) || 12;
                          
                          
                          let  finaltime = `${hours12}:${minCount} ${ampm}`
                          let htmlData = `<label class="container time-label">
                          <input class="time" type="radio" checked="checked" name="time" value = "${finaltime}">
                          <span class="checkmark">${finaltime}</span>
                          </label>`
                    
                           timingCon.insertAdjacentHTML('beforeend', htmlData)

                           if(minCount == 30){
                              minCount = "00"
                         }else{
                              minCount = 30
                         }

                         finaltime = `${hours12}:${minCount} ${ampm}`
                         htmlData = `<label class="container time-label">
                         <input class="time" type="radio" checked="" name="time" value = "${finaltime}">
                         <span class="checkmark">${finaltime}</span>
                         </label>`
                   
                          timingCon.insertAdjacentHTML('beforeend', htmlData)

                          if(minCount == 30){
                              minCount = "00"
                         }else{
                              minCount = 30
                         }
                     }
                     
                     
                        
                     
                         
                         v = 0;
                }
                          
      
           }
           

                
                     
                   
      
      }else{
           v = 1;
           let hours = openT;
          

         for(hours;hours < closeT;hours++ ){

          let ampm = hours >= 12 ? 'PM' : 'AM';
          let hours12 = (hours % 12) || 12;

          let finaltime = `${hours12}:${minCount} ${ampm}`
          let htmlData = `<label class="container time-label">
          <input class="time" type="radio" checked="checked" name="radio" value = "${finaltime}">
          <span class="checkmark">${finaltime}</span>
          </label>`
               
           timingCon.insertAdjacentHTML('beforeend', htmlData)



          if(minCount == 30){
               minCount = "00"
          }else{
               minCount = 30
          }

          finaltime = `${hours12}:${minCount} ${ampm}`
          htmlData = `<label class="container time-label">
          <input class="time" type="radio" checked="" name="radio" value = "${finaltime}">
          <span class="checkmark">${finaltime}</span>
          </label>`
               
           timingCon.insertAdjacentHTML('beforeend', htmlData)



          if(minCount == 30){
               minCount = "00"
          }else{
               minCount = 30
          }
       }
          
      }
     
}

timDis();



const getRadData = (r)=>{
     
    timDis(r.value)
}
const tl2 = new TimelineLite();
const openBookCon = ()=>{
     const  BookCon = document.querySelector('.content-side-section');
     if(screen.width < 481){

          document.body.classList.toggle("ovf");
      
      
    
          tl2.to(BookCon, 1, {opacity: 1,
               display : "flex",
               bottom : -window.scrollY - 75,
                 
          });

         
      }
}
const closeBookCon = ()=>{
     const  BookCon = document.querySelector('.content-side-section');
     if(screen.width < 481){

          document.body.classList.toggle("ovf");
      
      
    
          tl2.to(BookCon, 1, {opacity: 0,
               display : "none",
               bottom : "-100%",
                 
          });

         
      }
}

const ghostBooking = document.querySelector('.ghost-booking');
    const  clientBookingCycleAnimation = ()=>{
        const ghostBooking = document.querySelector('.ghost-booking').style.display = "flex";
    }


    const takeawayDiv = document.querySelector('.takeaway-div');
    const openTakeawayCon = ()=>{

     if(screen.width < 481){

          document.body.classList.toggle("ovf");

          tl2.to(takeawayDiv, 0.1, {opacity: 0,
               display : "none",
               bottom : -window.scrollY - 100
                 
          });
      
          tl2.to(takeawayDiv, 0.5, {opacity: 1,
               display : "block",
               bottom : -window.scrollY - 55,
                 
          });

         
      }

    }

    const closeTakeawayCon = ()=>{

     if(screen.width < 481){

          document.body.classList.toggle("ovf");
          
         
          tl2.to(takeawayDiv, 0.5, {opacity: 0,
               display : "none",
               bottom : -window.scrollY - 100,
                 
          });

         
      }

    }