
    const room =  window.location.href.substring(window.location.href.indexOf('/restaurants') + 1).split(['/'])[1].split(['?'])[0]
    console.log(room)
    const {token} = sessionStorage
    const socket = io()
    var form = document.querySelector('.table-book');  
    let bookingDetails = {};
    const ghostBooking2 = document.querySelector('.ghost-booking');
    const content= document.querySelector('.content');

    socket.emit('status-check', room , async(res)=>{
        if(res == 'OFFLINE'){
            document.querySelector('.res-stats-popup').style.display = "flex"
            document.body.classList.add('ovf')
        }   
    })
    form.addEventListener('submit', function(e) {

            e.preventDefault();
            var input = document.querySelectorAll('.date-radio');
            let time = document.querySelectorAll('.time')
            let guestName = document.querySelector('.guest-name').value;
            let guestCount= document.querySelector('.quantity').value;
            

            input.forEach((elem , i)=>{
                if(elem.checked == true){
                    bookingDetails.date = elem.value
                }
            })
           
            time.forEach((elem , i)=>{
                if(elem.checked == true){
                    bookingDetails.time = elem.value
                }
            })

            bookingDetails.guestName = guestName;
            bookingDetails.guestCount = guestCount;
            bookingDetails.userId = localStorage.getItem("user");
            bookingDetails.restaurantId = room


           
            if (bookingDetails && guestName) {
                      
                socket.emit('booking-details', bookingDetails , room);
                    

            }else{
                window.location.href = "/login"
            }  
                });

                

                socket.on('login', data =>{
                    window.location.href = "/login"
                })
                socket.on('recieved-details', msg =>{
                  if(msg){
                    content.innerHTML = `
                    <div class="status-div">
                    <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_dpqpppvf.json"  background="transparent"  speed="1"  style="width: 5rem; height: 5rem;"    autoplay></lottie-player>
                    
                    <span style="color : green;">Booking Confirmed</span>
                    </div>
                    `

                    
                  }else{
                    content.innerHTML = `
                    <div class="status-div">
                   
                    <lottie-player src="https://assets7.lottiefiles.com/temp/lf20_yYJhpG.json"  background="transparent"  speed="1"  style="width: 5rem; height: 5rem;"    autoplay></lottie-player>
                    
                    <span style="color : rgb(195,14,14);">Sorry, Table is Unavailable at the moment</span>
                    </div>
                    `
                  }
                    setTimeout(()=>{
                        ghostBooking2.style.display = "none"
                        content.innerHTML = `<img src="/images/rollingloader2.svg" alt="" srcset="">
                        <span class="ghost-h2">Please wait for confirmation from the Restuarant</span>
                        <p>Do not close this window</p>
                        <h4 class="time"></h4>
                        `
                    
                    },5000)
                })


                


                // const sendTakeawayDet = async(e)=>{
                //     console.log(JSON.parse(localStorage.getItem(room)))
                //     socket.emit('takeaway-details', JSON.parse(localStorage.getItem(room)) , room , (res)=>{
                //        console.log(res)
                //         if(res == 'Recieved'){
                //             setTimeout(()=>{
                //                 document.querySelector('.successP').innerHTML =   ` <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_qw3jzeji.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;" loop autoplay></lottie-player>
                //                 <h1>Order Recieved</h1>`
                //             },2000)
                           
                //         }else{
                //             setTimeout(()=>{
                //                 document.querySelector('.successP').innerHTML =   ` <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_tl52xzvn.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"    autoplay></lottie-player>
                //                 <h1>Order Not Recieved</h1>`
                //             },2000)
                //             setTimeout(()=>{
                //                 document.querySelector('.popup').style.display = 'none'
                //             },3000)
                //         }
                //     });
                // }

                // socket.on('takeaway-details', (msg)=>{

  
                //     if(msg){
                //         document.querySelector('.successP').innerHTML =   ` <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_rc5d0f61.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"    autoplay></lottie-player>
                //                 <h1>Order Accepted</h1>`
                
                //                 setTimeout(()=>{
                //                     document.querySelector('.popup').style.display = 'none'
                //                 },5000)
                //     }else{
                //         document.querySelector('.successP').innerHTML =   ` <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_tl52xzvn.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"    autoplay></lottie-player>
                //                 <h1>Order Declined</h1>`
                
                //                 setTimeout(()=>{
                //                     document.querySelector('.popup').style.display = 'none'
                //                 },5000)
                //     }
                // })
                
                // // const sendDineDet = async(e)=>{
                // //     socket.emit('dine-details', JSON.parse(localStorage.getItem(Resid)) , room);
                // // }



                // document.querySelector('.order-btn').addEventListener('click',async()=>{
    
                //     document.querySelector('.loader-holder').style.display = 'flex'
                //     document.querySelector('.order-btn').style.pointerEvents = 'none'
                //     document.querySelector('.order-btn').style.backgroundColor = '#afafaf'
                //     document.querySelector('.order-btn').style.borderColor = '#afafaf'
                //     socket.emit('status-check', room , async(res)=>{
                //         console.log(res)
                //         if(res == 'ACTIVE'){
                            
                //             const checkout = await fetch('/checkout',{
                //                 method : 'POST',
                //                 headers: {'Content-Type': 'application/json'},
                //                 body: JSON.stringify({amount: theGrandTotal,returnUrl : `${window.location.href.split('?')[0]}?order_id={order_id}&order_token={order_token}`,id : room})
                //             })
                //             let data = await checkout.json()
                //             if(data.data){
                //                 localStorage.setItem(`${room}Payment`,JSON.stringify({
                //                     order_id : data.data.order_id,
                //                     order_token : data.data.order_token,
                //                     order_status : data.data.order_status      
                //                 }));
                                
                //                 window.location.href = data.data.payment_link
                //             }else{
                               
                //             }
                            
                //         }else{
                //             document.querySelector('.successP').innerHTML =   `<lottie-player src="https://assets5.lottiefiles.com/packages/lf20_dmo93tpy.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"  loop  autoplay></lottie-player>
                //             <h1>Restaurant Offline</h1>`
                
                //             document.querySelector('.successP').style.display = 'flex'
                //             setTimeout(()=>{
                //                 document.querySelector('.popup').style.display = 'none'
                //                 document.querySelector('.loader-holder').style.display = 'none'
                //                 document.querySelector('.order-btn').style.pointerEvents = 'auto'
                //                 document.querySelector('.order-btn').style.backgroundColor = '#00917c'
                //                 document.querySelector('.order-btn').style.borderColor = '#00917c'
                //             },5000)
                //         }
                //     })
                   
                   
                    
                // })


                // const checkPaymentStatus = async()=>{
                //     document.querySelector('.loader-holder').style.display = 'none'
                //                 document.querySelector('.order-btn').style.pointerEvents = 'auto'
                //                 document.querySelector('.order-btn').style.backgroundColor = '#00917c'
                //                 document.querySelector('.order-btn').style.borderColor = '#00917c'
                //     const queryString = window.location.search;
                //     const urlParams = new URLSearchParams(queryString);
                //     let ctg = JSON.parse(localStorage.getItem(`${room}Payment`))
                    
                    
                //     if(urlParams.has('order_id') && urlParams.has('order_token') && ctg && urlParams.get('order_id') == ctg.order_id && urlParams.get('order_token') == ctg.order_token){
                
                //         const verifyPayment = await fetch('/verify-payment',{
                //             method : 'POST',
                //             headers : {'Content-Type' : 'application/json'},
                //             body : JSON.stringify({order_id : urlParams.get('order_id')})  
                //         })
                //         let result = await verifyPayment.json()
                     
                //         if(result.order_status == 'PAID'){
                
                //             ctg.order_status = 'PAID'
                //             localStorage.setItem(`${room}Payment`,JSON.stringify(ctg));
                            
                //             document.querySelector('.successP').style.display = 'flex'
                //             sendTakeawayDet()
                
                //             localStorage.removeItem(`${room}Payment`)
                //             localStorage.removeItem(room)
                
                //         }else{
                //             localStorage.removeItem(`${room}Payment`)
                
                //         }
                //     }
                // }   
                        
                //     checkPaymentStatus()

                    function hide(e){
                        document.body.classList.remove('ovf')
                        e.parentElement.style.display = 'none'
                    }



                    //CANCEL BOOKING

                    const cancelBooking = ()=>{

                        socket.emit('cancel-booking', room , async(res)=>{
                            
                        })
                    }   