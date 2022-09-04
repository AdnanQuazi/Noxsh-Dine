const room =  window.location.href.substring(window.location.href.indexOf('/restaurants') + 1).split(['/'])[1].split(['?'])[0]
    console.log(room)
    const {token} = sessionStorage
    const socket = io()

 
    const sendTakeawayDet = async(e)=>{
       
      
            document.querySelector('.loader-holder').style.display = 'none'
                        document.querySelector('.order-btn').style.pointerEvents = 'auto'
                        document.querySelector('.order-btn').style.backgroundColor = '#00917c'
                        document.querySelector('.order-btn').style.borderColor = '#00917c'
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            let ctg = JSON.parse(localStorage.getItem(`${room}Payment`))
            
            
            if(urlParams.has('order_id') && urlParams.has('order_token') && ctg && urlParams.get('order_id') == ctg.order_id && urlParams.get('order_token') == ctg.order_token){
        
                const verifyPayment = await fetch('/verify-payment',{
                    method : 'POST',
                    headers : {'Content-Type' : 'application/json'},
                    body : JSON.stringify({order_id : urlParams.get('order_id')})  
                })
                let result = await verifyPayment.json()
                
                if(verifyPayment.status == 200 && result.order_status == 'PAID'){
                    
                    ctg.order_status = 'PAID'
                    localStorage.setItem(`${room}Payment`,JSON.stringify(ctg));
                    
                    document.querySelector('.successP').style.display = 'flex'
                    socket.emit('takeaway-details', JSON.parse(localStorage.getItem(room)) , room , JSON.parse(localStorage.getItem(`${room}Payment`)) , (res)=>{
                        console.log(res)
                         // if(res == 'Recieved'){
                         //     setTimeout(()=>{
                         //         document.querySelector('.successP').innerHTML =   ` <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_qw3jzeji.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;" loop autoplay></lottie-player>
                         //         <h1>Order Recieved</h1>`
                         //     },2000)
                            
                         // }else{
                         //     setTimeout(()=>{
                         //         document.querySelector('.successP').innerHTML =   ` <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_tl52xzvn.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"    autoplay></lottie-player>
                         //         <h1>Order Not Recieved</h1>`
                         //     },2000)
                         //     setTimeout(()=>{
                         //         document.querySelector('.popup').style.display = 'none'
                         //     },3000)
                         // }
                     });
                    
                    localStorage.removeItem(`${room}Payment`)
                    localStorage.removeItem(room)
        
                }else{
                  
                    localStorage.removeItem(`${room}Payment`)
        
                }
            }
    

        
    }

    socket.on('takeaway-details', (msg,billDetails,restaurantname,address,gstDet)=>{


        if(msg){
            document.querySelector('.successP').innerHTML =   ` <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_5lp0ystr.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"    autoplay></lottie-player>
                    <h1>Order Accepted</h1>
                    <p>Enjoy your meal</p>
                    `

                    setTimeout(()=>{
                        document.querySelector('.popup').style.display = 'none'
                        displayBill()
                    },5000)

                    function displayBill (){
                        console.log(billDetails,restaurantname,address,gstDet)
                        let gstData = ``;
    
                        const event = new Date();
                        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    
                        if(gstDet.gstRegistered){
                            gstData = `<div class="gst-div">
                            <h1>GST</h1>
                            <h3>${gst.gstNumber}</h3>
                        </div>`
                        }
                        let subTotal = 0;
                        let gTotal = 0;
                        let foodData = ``;
                        billDetails[0].forEach(elem => {
                            foodData += `<tr>
                                    <td>${elem.foodName}</td>
                                    <td>₹${elem.price}</td>
                                    <td>${elem.cartQuantity}</td>
                                    <td>₹${elem.price * elem.cartQuantity}</td>
                                    </tr>
                                    `
                                    subTotal += elem.price * elem.cartQuantity
    
                        });
                        let charges = ((subTotal / 100) * 5).toFixed(2)
                        gTotal = subTotal + parseFloat(charges)
                        let htmlData = `<div class="invoice">
                        <div class="logo-div">
                            <div class="name-add-div">
        
                            <h1 class="res-name">${restaurantname}</h1>
                            <h3>${address}</h3>
                            </div>
                             
                            <h3 class="order-no">${billDetails[2]}</h3>
                        </div>
                        <hr>
                        <div class="gst-date-div">
                            ${gstData}
                            <div class="date-div">
                                <h1>DATE</h1>
                                <h3>${event.toLocaleDateString(undefined, options)}</h3>  
                            </div>
        
                        </div>
                        <hr>
                        
                        <table class="bill-table">
                            <thead>
                                <tr style="border: none;">
                                    <th>ITEM</th>
                                    <th>PRICE</th>
                                    <th>QTY</th>
                                    <th>TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${foodData}
                            </tbody>
        
                        </table>
                        <div class="total-div">
                            <div class="total-con">
                                <h1>TOTAL :</h1>
                                <h1 class="en-pr">₹${subTotal}</h1>
                            </div>
                            <div class="tax-con">
                                <h1>+ TAXES :</h1>
                                <h1 class="en-pr">5%</h1>
                            </div>
                            <div class="grand-total-con">
                                <h1>GRAND TOTAL :</h1>
                                <h1 class="en-pr">₹${gTotal}</h1>
                            </div>
                        </div>
                        <hr>
                        <div class="greet-div">
                            <img src="/images/Frame3.jpg" alt="Noxsh Dine" srcset="">
                            <h1>THANK YOU <br>Visit Again</h1>
                          
                        </div>
                </div> 
                <button class="dnd-bill" id="${billDetails[2]}" onclick="downloadBill(this)"><i class="bi bi-download"></i> Download Bill</button> 
                `
                document.querySelector('.inv-con').style.top = window.scrollY + "px";
                document.querySelector('.inv-con').insertAdjacentHTML('afterbegin', htmlData);
                document.querySelector('.inv-con').style.display = 'flex';
                
    
                    }
        }else{
            document.querySelector('.successP').innerHTML =   ` <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_jqcjv619.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"    autoplay></lottie-player>
                    <h1>Order Declined</h1>
                    <p>If any amount has been deducted, It will be refunded within 1 to 2 business days</p>
                    `
                    
                    setTimeout(()=>{
                        document.querySelector('.popup').style.display = 'none'
                    },5000)
        }
    })
    
    // const sendDineDet = async(e)=>{
    //     socket.emit('dine-details', JSON.parse(localStorage.getItem(Resid)) , room);
    // }



    document.querySelector('.order-btn').addEventListener('click',async()=>{

        document.querySelector('.loader-holder').style.display = 'flex'
        document.querySelector('.order-btn').style.pointerEvents = 'none'
        document.querySelector('.order-btn').style.backgroundColor = '#afafaf'
        document.querySelector('.order-btn').style.borderColor = '#afafaf'
        socket.emit('status-check', room , async(res)=>{
            console.log(res)
            if(res == 'ACTIVE'){
                
                const checkout = await fetch('/checkout',{
                    method : 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({amount: theGrandTotal,returnUrl : `${window.location.href.split('?')[0]}?order_id={order_id}&order_token={order_token}`,id : room})
                })
                let data = await checkout.json()
                if(data.data){
                    localStorage.setItem(`${room}Payment`,JSON.stringify({
                        order_id : data.data.order_id,
                        order_token : data.data.order_token,
                        order_status : data.data.order_status      
                    }));
                    
                    window.location.href = data.data.payment_link
                }else{
                   
                }
                
            }else{
                document.querySelector('.successP').innerHTML =   `<lottie-player src="https://assets5.lottiefiles.com/packages/lf20_dmo93tpy.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"  loop  autoplay></lottie-player>
                <h1>Restaurant Offline</h1>`
    
                document.querySelector('.successP').style.display = 'flex'
                setTimeout(()=>{
                    document.querySelector('.popup').style.display = 'none'
                    document.querySelector('.loader-holder').style.display = 'none'
                    document.querySelector('.order-btn').style.pointerEvents = 'auto'
                    document.querySelector('.order-btn').style.backgroundColor = '#00917c'
                    document.querySelector('.order-btn').style.borderColor = '#00917c'
                },5000)
            }
        })
       
       
        
    })


   
            
        sendTakeawayDet()