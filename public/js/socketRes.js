const socket = io()
const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
const room = "619ccebc133b95ae0d7db23c"
const dataPCon = document.querySelector('.main-data-holder-currentBookings');
const updataPCon = document.querySelector('.main-data-holder-upcomingBookings');

const upDataParentCon = document.querySelector('.data-wrapper-parent-upcomingBookings');
const currentBookingNotify = document.querySelector('.currentBookingNotify');
const upcomingBookingNotify = document.querySelector('.upcomingBookingNotify');
let main_data_holder_currentBookings = document.querySelector('.main-data-holder-currentBookings').childNodes;
// socket.emit('rest-connect', id)
socket.emit('join-room', room);

const det = [];
socket.on('recieve-details', details =>{


    det.push(details)
   
   let data = details
  
  let htmlData = `<div class="main-data-con">
  <div class="user-details-div">
      <img src="/uploads/${data.profilepic}" alt="">
      <div class="name-username-div">
          <h4 class="name">${data.name}</h4>
          <span class="username">${data.userName}</span>
      </div>
  </div>
  <div class="booking-details-con">
      <div class="date-con">
          <h4>Date</h4>
          <p>${data.date}</p>
      </div>
      <div class="time-con">
            <h4>Time</h4>
          <p>${data.time}</p>
      </div>
      <div class="guest-name-con">
            <h4>Guest Name</h4>
          <p>${data.guestName}</p>
      </div>
      <div class="guest-count-con">
            <h4>Guest Count</h4>
          <p>${data.guestCount}</p>
      </div>
  </div>
  <div class="buttons-con">
      
      <button class="decline" id="${data.socketId}" onclick="declineBookingRequest(this);">Decline</button>
      <button class="accept" id="${data.socketId}" onclick="acceptBookingRequest(this);">Accept</button>
  </div>
  </div>`

  dataPCon.insertAdjacentHTML('afterbegin', htmlData);
  currentBookingNotify.style.display = "flex"
  currentBookingNotify.innerHTML = main_data_holder_currentBookings.length
  

 
})

const displayUpcomingData = async ()=>{
    const getData = await fetch('/upcomingBookings',{
        method : 'POST'
    })

    let finalData = await getData.json()
    
    updataPCon.innerHTML = '';

    finalData[0].payload.forEach(elem => {

        let userdata = {};
        
        loop1:for(var i = 0; i < finalData[1].userData.length; i++){
        
           
            if(finalData[1].userData[i]._id === elem.userId){
                
              

                userdata = finalData[1].userData[i]
                break loop1
            }
        }
        
  
        let htmlData = `<div class="main-data-con">
        <div class="user-details-div">
            <img src="/uploads/" alt="">
            <div class="name-username-div">
                <h4 class="name">${userdata.name}</h4>
                <span class="username">${userdata.username}</span>
            </div>
        </div>
        <div class="booking-details-con">
            <div class="date-con">
                <h4>Date</h4>
                <p>${elem.bookingDate}</p>
            </div>
            <div class="time-con">
                  <h4>Time</h4>
                <p>${elem.bookingTime}</p>
            </div>
            <div class="guest-name-con">
                  <h4>Guest Name</h4>
                <p>${elem.guestName}</p>
            </div>
            <div class="guest-count-con">
                  <h4>Guest Count</h4>
                <p>${elem.guestCount}</p>
            </div>
        </div>
        <div class="buttons-con">
            <button class="more-info" id="${elem._id}" onclick="displayBookingOrderDetails(this)">More Info</button>
            
        </div>
        </div>`
        updataPCon.insertAdjacentHTML('afterbegin', htmlData);
    });
    upcomingBookingNotify.style.display = "flex"
    upcomingBookingNotify.innerHTML = finalData[0].payload.length
    
}
const acceptBookingRequest = async (i)=>{


   
    socket.emit('booking-response', true , i.id)
    var p = i.parentNode
    p.parentNode.remove()

    let currentBookingData;
    
    for(var j = 0; j < det.length ;j++){
        if(det[j].socketId == i.id){
            currentBookingData = j
        }
    }

   console.log(currentBookingData);
    const postData = await fetch('/saveUpcomingBookings',{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({payload: det[currentBookingData]})
       
    })
    let main_data_holder_currentBookings = document.querySelector('.main-data-holder-currentBookings').childNodes;

   

    if(main_data_holder_currentBookings.length == 0){
        currentBookingNotify.innerHTML = main_data_holder_currentBookings.length
        currentBookingNotify.style.display = "none"
     }else{
        currentBookingNotify.innerHTML = main_data_holder_currentBookings.length
     }
    
     displayUpcomingData()

}

const declineBookingRequest = (i)=>{


   
    socket.emit('booking-response', false , i.id)
    var p = i.parentNode
    p.parentNode.remove()

    if(main_data_holder_currentBookings.length == 0){
        currentBookingNotify.innerHTML = main_data_holder_currentBookings.length
        currentBookingNotify.style.display = "none"
     }else{
        currentBookingNotify.innerHTML = main_data_holder_currentBookings.length
     }
}


displayUpcomingData()

const displayBookingOrderDetails = async(i)=>{

    const getData = await fetch('/bookingDetails',{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({payload : i.id})
    })

    let finalData = await getData.json()
    finalData = finalData.bookingsData
    let currentBookingData = {};
    for(var j = 0; j < finalData.length; j++){
        
        if(finalData[j]._id == i.id){
            currentBookingData = finalData[j]
            break;
        }
    }
    let appendData = ``;
    for(var k = 0; k < currentBookingData.orderList.length; k++){
        
        appendData += `<div class="overall-food">
        <div class="food-item-con">
            
      
            <div class="item-details">
                <h4>${currentBookingData.orderList[k].foodName}</h4>
               <div class="details">
               <div class="quantity">
                
                   <p>${currentBookingData.orderList[k].quantity} Plate</p>
               </div>
               <div class="cost">
                
                   <p class="ruppee">₹${currentBookingData.orderList[k].cost * currentBookingData.orderList[k].quantity}</p>
               </div>
            </div>
            </div>
            

        </div>
        
        </div>`
    }
    
    let htmlData = ` <div class="more-data-holder more-data-holder-upcomingBookings">
    <div class="more-data-con">
        <div class="order-list-con">
        <h1>Order list</h1>

  ${appendData}
        
        
        </div>


        

        <div class="total-div">
            <h1>Total</h1>
          
            <div class="cal-div">
                <div class="sub-total"><h4>Sub Total : </h4> <p>450₹</p></div>
                <div class="tax"><h4>Taxes & Charges : </h4> <p>20₹</p></div>
            </div>

            <div class="grand-total"><h2>Grand Total : </h2> <p>470₹</p></div>


        </div>

        <div class="payment-details-div">
        <h1>Payemnt Method</h1>
        <p>Prepaid</p>
        <p>Paid Via PayTm</p>
        </div>

        
    </div>

</div> `

try {
   document.querySelector('.more-data-holder-upcomingBookings').remove();
    
    
} catch (error) {
    
}
upDataParentCon.insertAdjacentHTML('beforeend', htmlData)
   
}