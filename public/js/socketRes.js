

const socket = io()
const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
let room;
const findId = async()=>{
    let sendReq = await fetch("/get-restaurant-id")
    let data = await sendReq.json()
    room = data.id

    socket.emit('join-room', room);


}
findId()


// // fetch("/get-restaurant-id").then(res => res.json()).then((res)=> {room = res.id})
// console.log(room)

const dataPCon = document.querySelector('.table-booking-s-data');
const updataPCon = document.querySelector('.main-data-holder-dine');

const upDataParentCon = document.querySelector('.data-wrapper-parent-upcomingBookings');
const currentBookingNotify = document.querySelector('.currentBookingNotify');
const dineNotify = document.querySelector('.dineNotify');
const takeawayNotify = document.querySelector('.takeawayNotify');

let main_data_holder_currentBookings = document.querySelector('.table-booking-s-data').childNodes;


const det = [];
const takeawayDet = [];
const dineDet = [];


socket.on('recieve-details', (details)=>{

    det.push(details)
   
   let data = details
        
   showNotification('TABLE BOOKING',`Booking request from ${data.guestName}`) 

  let htmlData = `<div class="main-data-con">
  <div class="user-details-div">
      <img src="${data.profileImg}" alt="">
      <div class="name-username-div">
          <h4 class="name">${data.name}</h4>
          <span class="username">${data.userName}</span>
      </div>
      <h4><span>ID</span> ${data.orderId}</h4>
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

  dataPCon.insertAdjacentHTML('beforeend', htmlData);
  currentBookingNotify.style.display = "flex"
  currentBookingNotify.innerHTML = main_data_holder_currentBookings.length
  

 
})

socket.on('cancel-booking', async(id,res)=>{
        const i = document.querySelector(`#${id}`)
        
       declineBookingRequest(i)
})
//MORE INFO
let isMoreInfoOpened = false
const closeMoreInfo = ()=>{
    isMoreInfoOpened = false
    document.querySelector('.more-info-holder').innerHTML = `<i class="bi bi-x-lg" onclick="closeMoreInfo()"></i>`
    document.querySelector('.more-info-holder').style.display = 'none'
}
    const moreInfo = async(source,id,resId)=>{

        if(isMoreInfoOpened) return
        isMoreInfoOpened = true
        let payload;
        let btn = ``;
        if(source == 'dine'){

            payload = 'dine'
            

        }else if(source == 'tb'){

            payload = 'upcomingBookings'

        }else if(source == 'takeaway'){
            payload = 'takeaway'
        }

        const moreInfoData = await fetch('/moreInfo',{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({payload,id,resId})
        })
        let fData = await moreInfoData.json()
        console.log(fData.data)
        if(source == 'takeaway'){
            btn = `<button class='p-n-d' onclick='confirmDelivered("${fData.data[0][3].orderId}","takeaway")'>Delivered</button>`
        }
        if(source == 'dine'){
            btn = `<button class='p-n-d' onclick='confirmDelivered("${fData.data[0][3].orderId}","dine")'>Paid & Download</button>`
        }
        if(source == 'dine' && fData.data[0][2][0].paymentStatus != 'UNPAID'){
            btn = `<button class='p-n-d' style="background-color : green;" onclick='confirmDelivered("${fData.data[0][3].orderId}","dine")'>Paid & Download</button>`
        }   

        if(source == 'dine' || source == 'tb' || source == "takeaway"){
            let orderHtml = ``;
            let totalHtml = ``;
            let paymentHtml = ``;
            let orderDate = ``;
            fData.data[0].forEach((elem , index)=> {

                if(index == 0){
                    elem.forEach(element =>{
                        orderHtml += `<div class="overall-food">
                        <div class="food-item-con">
                            
                      
                            <div class="item-details">
                                <h4>${element.foodName}</h4>
                               <div class="details">
                               <div class="quantity">
                                
                                   <p>${element.foodQuantity}</p>
                                   <p>X${element.cartQuantity}</p>
                               </div>
                               <div class="cost">
                                
                                   <p class="ruppee">₹${element.price * element.cartQuantity}</p>
                               </div>
                            </div>
                            </div>
                            
                    
                        </div>
                        
                        </div>`
                    })
                }
            })  
            console.log(fData.data)
                if(fData.data[0][2].length >= 1){
                    paymentHtml = `<h1>Payemnt Method</h1>
                    <p>${fData.data[0][2][0].paymentMode}</p>
                    <p>${fData.data[0][2][0].paymentStatus}</p>
                    </div>`
                }
                if(fData.data[0][1].length >= 1){
                    totalHtml = `<div class="total-div">
                    <h1>Total</h1>
                  
                    <div class="cal-div">
                        <div class="sub-total"><h4>Sub Total : </h4> <p>₹${fData.data[0][1][0].subTotal ? fData.data[0][1][0].subTotal : '--'}</p></div>
                        <div class="tax"><h4>Taxes & Charges : </h4> <p>₹${fData.data[0][1][0].charges ? fData.data[0][1][0].charges : '--'}</p></div>
                    </div>
        
                    <div class="grand-total"><h2>Grand Total : </h2> <p>₹${fData.data[0][1][0].grandTotal ? fData.data[0][1][0].grandTotal : '--'}</p></div>
        
        
                </div>`   
                }
                let mrInfo = ` <div class="more-data-holder more-data-holder-takeaway">
                <div class="more-data-con">
                    <h1 style="text-align:center;">${fData.data[0][4].restaurantName}</h1>
                    <h2 style="text-align:center;">${fData.data[0][4].address}</h2>
                    <p style="text-align:left;margin-top:2rem">DATE : ${fData.data[0][3].orderDate}</p>
                    <p style="text-align:left;margin: 1.5rem 0">ORDER ID : ${fData.data[0][3].orderId}<p>
                    <p style="text-align:left;">GST : ${fData.data[0][4].gstNumber}<p>
                    <div style="margin-top:2rem" class="order-list-con">
                    
            
              ${orderHtml}
                    
                    
                    </div>
            
            
                    
            
                  ${totalHtml}
            
                    <div class="payment-details-div">
                
            
                    
                </div>
               ${btn}
            </div>`
            document.querySelector('.more-info-holder').style.top = window.scrollY + 'px'
            document.querySelector('.more-info-holder').insertAdjacentHTML('afterbegin', mrInfo);
            document.querySelector('.more-info-holder').style.display = 'flex'
        }
    }

//MORE INFO ENDS

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
        <span class="specifier">Table booking</span>
        <div class="user-details-div">
            <img src="${userdata.profileImg}" alt="">
            <div class="name-username-div">
                <h4 class="name">${userdata.name}</h4>
                <span class="username">${userdata.username}</span>
            </div>
            <h4><span>ID</span> ${elem.orderId}</h4>
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
    dineNotify.style.display = "flex"
    dineNotify.innerHTML = finalData[0].payload.length
    
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
    
     displayDineinData()

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
    
    let htmlData = ``

try {
   document.querySelector('.more-data-holder-upcomingBookings').remove();
    
    
} catch (error) {
    
}
upDataParentCon.insertAdjacentHTML('beforeend', htmlData)
   
}
//TAKEAWAY

const takeawayMCon = document.querySelector('.data-wrapper-parent-takeaway');
const takeawayDataPCon = document.querySelector('.main-data-holder-takeaway');

const displayTakeawayData = async()=>{

    const getData = await fetch('/takeawayDetails',{
        method : 'POST'
    })

    let finalData = await getData.json()
    
    console.log(finalData)
    takeawayDataPCon.innerHTML = ''

    finalData[0].payload.forEach(elem => {
        let orderDate = `${elem.orderDate.split([' '])[0]}, ${elem.orderDate.split([' '])[1]} ${elem.orderDate.split([' '])[2]}`
        let userdata = {};
        
        loop1:for(var i = 0; i < finalData[1].userData.length; i++){
        
           
            if(finalData[1].userData[i]._id === elem.userId){
                
              

                userdata = finalData[1].userData[i]
                break loop1
            }
        }
        
  
        let htmlData = `<div class="main-data-con">
        <span class="pay-det-txt" style="color :${elem.payment[0].paymentStatus == "PAID" ? '#3ea055' : '#dc3545'} ;">${elem.payment[0].paymentStatus == "PAID" ? elem.payment[0].paymentStatus : "UNPAID"}</span>
        <div class="user-details-div">
            <img src="${userdata.profileImg}" alt="">
            <div class="name-username-div">
                <h4 class="name">${userdata.name}</h4>
                <span class="username">${userdata.username}</span>
            </div>
            <h4><span>ID</span> ${elem.orderId}</h4>
        </div>
        <div class="booking-details-con">
            <div class="date-con">
                <h4>Date</h4>
                <p>${orderDate}</p>
            </div>
            <div class="time-con">
                  <h4>Time</h4>
                <p>${elem.orderTime ? elem.orderTime : '10'}</p>
            </div>
            <div class="guest-name-con">
                  <h4>Guest Name</h4>
                <p>${userdata.name}</p>
            </div>
            <div class="guest-count-con">
                  <h4>Guest Count</h4>
                <p>${'none'}</p>
            </div>
        </div>
        <div class="buttons-con">
            <button class="more-info" id="${elem._id}" onclick="moreInfo('takeaway','${elem._id}','${room}')">More Info</button>
            
        </div>
        </div>`
        takeawayDataPCon.insertAdjacentHTML('afterbegin', htmlData);
    });

}
displayTakeawayData();
const acceptTakeawayRequest = async(i)=>{

   
    var p = i.parentNode
    p.parentNode.remove()

    let currentTakeawayData;
    for(var j = 0; j < takeawayDet.length ;j++){
        if(takeawayDet[j][1].socketId == i.id){
            console.log(j)
            currentTakeawayData = j
            break
        }
    }
    socket.emit('takeaway-response', true , i.id, takeawayDet[currentTakeawayData])
    const postData = await fetch('/saveTakeawayDetails',{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({payload: takeawayDet[currentTakeawayData]})
       
    })
    let main_data_holder_currentBookings = document.querySelector('.main-data-holder-takeaway').childNodes;

   

    if(main_data_holder_currentBookings.length == 0){
        takeawayNotify.innerHTML = main_data_holder_currentBookings.length
        takeawayNotify.style.display = "none"
     }else{takeawayNotify
        .innerHTML = main_data_holder_currentBookings.length
     }

displayTakeawayData();

}
const declineTakeawayRequest = async(i)=>{
    socket.emit('takeaway-response', false , i.id)
    var p = i.parentNode
    p.parentNode.remove()

    

}

const takeawayPCon = document.querySelector('.takeaway-s-data');



socket.on('recieve-takeaway-details', (details,user,orderId,payment)=>{
    
    takeawayDet.push([details,user,orderId,payment])
    showNotification('TAKEAWAY',`Takeaway request from ${user.username}`) 
    let htmlData = `<div class="main-data-con">
    <span class="pay-det-txt" style="color :${payment.orderStatus == "PAID" ? '#3ea055' : '#dc3545'} ;">${payment.orderStatus == "PAID" ? "PAID" : "UNPAID"}</span>
  <div class="user-details-div">
      <img src="${user.profileImg}" alt="">
      <div class="name-username-div">
          <h4 class="name">${user.name}</h4>
          <span class="username">${user.username}</span>
      </div>
      <h4><span>ID</span> ${orderId}</h4>
  </div>
  <div class="booking-details-con">
      <div class="date-con">
          <h4>Date</h4>
          <p>${user.date}</p>
      </div>
      <div class="time-con">
            <h4>Time</h4>
          <p>${user.time}</p>
      </div>
      <div class="guest-name-con">
            <h4>Guest Name</h4>
          <p>${user.name}</p>
      </div>
      <div class="guest-count-con">
            <h4>Guest Count</h4>
          <p>${user.phone}</p>
      </div>
  </div>
  <div class="buttons-con">
      
      <button class="decline" id="${user.socketId}" onclick="declineTakeawayRequest(this);">Decline</button>
      <button class="accept" id="${user.socketId}" onclick="acceptTakeawayRequest(this);">Accept</button>
  </div>
  </div>`

  takeawayPCon.insertAdjacentHTML('afterbegin', htmlData);
  
//   currentBookingNotify.style.display = "flex"
//   currentBookingNotify.innerHTML = main_data_holder_currentBookings.length
// let appendData = ``;
// for(var k = 0; k < details.length; k++){
        
//     appendData += `<div class="overall-food">
//     <div class="food-item-con">
        
  
//         <div class="item-details">
//             <h4>${details[k].foodName}</h4>
//            <div class="details">
//            <div class="quantity">
            
//                <p>${details[k].foodQuantity}</p>
//            </div>
//            <div class="cost">
            
//                <p class="ruppee">₹${details[k].price * details[k].cartQuantity}</p>
//            </div>
//         </div>
//         </div>
        

//     </div>
    
//     </div>`
// }

// let takeawayData = ` <div class="more-data-holder more-data-holder-takeaway">
//     <div class="more-data-con">
//         <div class="order-list-con">
//         <h1>Order list</h1>

//   ${appendData}
        
        
//         </div>


        

//         <div class="total-div">
//             <h1>Total</h1>
          
//             <div class="cal-div">
//                 <div class="sub-total"><h4>Sub Total : </h4> <p>450₹</p></div>
//                 <div class="tax"><h4>Taxes & Charges : </h4> <p>20₹</p></div>
//             </div>

//             <div class="grand-total"><h2>Grand Total : </h2> <p>470₹</p></div>


//         </div>

//         <div class="payment-details-div">
//         <h1>Payemnt Method</h1>
//         <p>Prepaid</p>
//         <p>Paid Via PayTm</p>
//         </div>

        
//     </div>

// </div> `

// try {
//     document.querySelector('.more-data-holder-takeaway').remove();
     
     
//  } catch (error) {
     
//  }
//  takeawayMCon.insertAdjacentHTML('beforeend', takeawayData)

})

//DINE


const dinePCon = document.querySelector('.dinein-s-data');
const dineDataPCon = document.querySelector('.data-wrapper-parent-dine');
const dCon = document.querySelector('.main-data-holder-dine');
const displayDineinData = async()=>{
    try {
       
        const getData = await fetch('/dineinDetails',{
            method : 'POST'
        })
        
        let finalData = await getData.json()
        console.log({fullDineinData : finalData})     
   
        dCon.innerHTML = ''
    
        finalData[0].payload.forEach(elem => {
            let orderDate = elem.orderDate
            let userdata = {};
            
            // loop1:for(var i = 0; i < finalData[1].userData.length; i++){
            
               
            //     if(finalData[1].userData[i]._id === elem.userId){
                    
                  
    
            //         userdata = finalData[1].userData[i]
            //         break loop1
            //     }
            // }
            
      
            let htmlData = ` <div class="main-data-con" style="border-left :0.7rem solid ${elem.payment[0].paymentStatus == "PAID" ? '#3ea055' : '#dc3545'} ;">
            <span class="pay-det-txt" style="color :${elem.payment[0].paymentStatus == "PAID" ? '#3ea055' : '#dc3545'} ;">${elem.payment[0].paymentStatus == "PAID" ? "PAID" : "UNPAID"}</span>
            <div class="user-details-div">
                <div class="table-no-div">
              <h4><span>Table No.</span> ${elem.tableNo}</h4>
              <h4><span>ID</span> ${elem.orderId}</h4>
          
                </div>
            </div>
            <div class="booking-details-con">
                <div class="date-con">
                    <h4>Date</h4>
                    <p>${orderDate}</p>
                </div>
                <div class="time-con">
                      <h4>Time</h4>
                    <p>${elem.orderTime}</p>
                </div>
                <div class="guest-name-con">
                      
                </div>
                <div class="guest-count-con">
                     
                </div>
            </div>
            <div class="buttons-con">
            <button class="more-info" id="${elem._id}" onclick="moreInfo('dine','${elem._id}','${room}')">More Info</button>
            
            </div>
            </div>`
            dCon.insertAdjacentHTML('afterbegin', htmlData);
        });
        finalData[1].tb.forEach(elem => {

            let userdata = {};
            
            loop1:for(var i = 0; i < finalData[2].tbData.length; i++){
            
               
                if(finalData[2].tbData[i]._id === elem.userId){
                    
                  
    
                    userdata = finalData[2].tbData[i]
                    break loop1
                }
            }
            
      
            let htmlData = `<div class="main-data-con">
            
            <span class="specifier">Table booking</span>
            <div class="user-details-div">
                <img src="${userdata.profileImg}" alt="">
                <div class="name-username-div">
                    <h4 class="name">${userdata.name}</h4>
                    <span class="username">${userdata.username}</span>
                </div>
                <h4><span>ID</span> ${elem.orderId}</h4>
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
                <button class="more-info" id="${elem._id}" onclick="moreInfo('tb','${elem._id}','${room}')">More Info</button>
                
            </div>
            </div>`
            dCon.insertAdjacentHTML('afterbegin', htmlData);
        });

    
    } catch (error) {
        console.log(error)
    }
}
displayDineinData()
const acceptDineinRequest = async(i)=>{

    var p = i.parentNode
    p.parentNode.remove()

    let currentBookingData;
    
    for(var j = 0; j < dineDet.length ;j++){
        if(dineDet[j][1].socketId == i.id){
            currentBookingData = j
        }
    }
    socket.emit('dine-response', true , i.id, dineDet[currentBookingData])

   
    const postData = await fetch('/saveDineinDetails',{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({payload: dineDet[currentBookingData]})

    })



    displayDineinData()

}
const declineDineinRequest = async(i)=>{
    socket.emit('dine-response', false , i.id)
    var p = i.parentNode
    p.parentNode.remove()
}

socket.on('recieve-dine-details', async(details,user,orderId,tableNo,payment)=>{
    
   
    showNotification('DINE-IN',` ORDER from ${orderId}`) 
    dineDet.push([details,user,orderId,tableNo,payment])
    let htmlData = `<div class="main-data-con">
    <span class="pay-det-txt" style="color :${payment.order_status == "PAID" ? '#3ea055' : '#dc3545'} ;">${payment.order_status == "PAID" ? "PAID" : "UNPAID"}</span>
    
  <div class="user-details-div">
      <div class="table-no-div">
    <h4>Table No. ${tableNo}</h4>
    <h4>${orderId}</h4>

      </div>
  </div>
  <div class="booking-details-con">
      <div class="date-con">
          <h4>Date</h4>
          <p>${user.date}</p>
      </div>
      <div class="time-con">
            <h4>Time</h4>
          <p>${user.time}</p>
      </div>
  </div>
  <div class="buttons-con">
      
      <button class="decline" id="${user.socketId}" onclick="declineDineinRequest(this);">Decline</button>
      <button class="accept" id="${user.socketId}" onclick="acceptDineinRequest(this);">Accept</button>
  </div>
  </div>`

  dinePCon.insertAdjacentHTML('afterbegin', htmlData);
//   currentBookingNotify.style.display = "flex"
//   currentBookingNotify.innerHTML = main_data_holder_currentBookings.length
let appendData = ``;
for(var k = 0; k < details.length; k++){
        
    appendData += `<div class="overall-food">
    <div class="food-item-con">
        
  
        <div class="item-details">
            <h4>${details[k].foodName}</h4>
           <div class="details">
           <div class="quantity">
            
               <p>${details[k].foodQuantity}</p>
           </div>
           <div class="cost">
            
               <p class="ruppee">₹${details[k].price * details[k].cartQuantity}</p>
           </div>
        </div>
        </div>
        

    </div>
    
    </div>`
}

let dineData = ` <div class="more-data-holder more-data-holder-takeaway">
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

// try {
//     document.querySelector('.more-data-holder-dine').remove();
     
     
//  } catch (error) {
     
//  }
//  dineDataPCon.insertAdjacentHTML('beforeend', dineData)

 

})

const delivered = async(e)=>{
    console.log(e.dataset.id)
    if(e.dataset.source == 'takeaway'){
        const updateTakeawayStatus = await fetch('/takeaway-order-status', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({payload: e.dataset.id})
        })
        const response = await updateTakeawayStatus.json()
        if(await updateTakeawayStatus.status === 200){
            document.querySelector('.popupdiv').style.display = 'none'
            displayTakeawayData()        
        }
    }
    if(e.dataset.source == 'dine'){
        const ssTarget =  document.querySelector('.more-data-holder')
        document.querySelector('.p-n-d').style.display = 'none'
        html2canvas(ssTarget).then((canvas)=>{
        const base64Img = canvas.toDataURL("image/jpg")
        const anchor = document.createElement('a');
        anchor.setAttribute("href", base64Img)
        anchor.setAttribute("download", `${e.dataset.id}.jpg`)
        anchor.click();
        document.querySelector('.p-n-d').style.display = 'block'
        }) 
        const updateDineStatus = await fetch('/dine-order-status', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({payload: e.dataset.id})
        })
        const response = await updateDineStatus.json()
        if(await updateDineStatus.status === 200){
            document.querySelector('.popupdiv').style.display = 'none'
            displayDineinData()        
        }
    }
    

}   

const confirmDelivered = (id,source) =>{
    if(source == 'takeaway'){
        document.querySelector('#popup-data').textContent = 'Are you sure this is Delivered ?'
    }
    if(source == 'dine'){
        document.querySelector('#popup-data').textContent = 'Do you want to mark this paid ?'
    }
    document.querySelector('.popupdiv').style.display = 'grid'
    document.querySelector(".confirm").dataset.id = id
    document.querySelector(".confirm").dataset.source = source


}
const dec = () =>{
    document.querySelector('.popupdiv').style.display = 'none'
    
}

function showNotification (head,body){
    const notification = new Notification(head,{
        body : body
    })
    
}
