

const room =  window.location.href.substring(window.location.href.indexOf('/nfc') + 1).split(['/'])[1]
const tableNo =  window.location.href.substring(window.location.href.indexOf('/nfc') + 1).split(['/'])[2].split('?')[0]




const socket = io()
let isPendingOrder = false;

document.querySelector('.pay-later').addEventListener('click',()=>{
    if(isPendingOrder) return
    isPendingOrder = true
    let currObj = {
        order_status : 'UNPAID'
    }
   
    localStorage.setItem(`${room}Payment`,JSON.stringify(currObj));

    socket.emit('status-check', room , async(res)=>{
      if(res == 'ACTIVE'){
        socket.emit('dine-details', JSON.parse(localStorage.getItem(Resid)) , room , tableNo ,  JSON.parse(localStorage.getItem(`${room}Payment`)) , (res)=>{
            if(res == 'Recieved'){
                isPendingOrder = true
                setTimeout(()=>{
                    document.querySelector('.successP').style.display = 'flex'
                    document.querySelector('.successP').innerHTML =   ` <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_qw3jzeji.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;" loop autoplay></lottie-player>
                    <h1>Order Recieved</h1>`
                },2000)
                isPendingOrder = false
            }else{
                setTimeout(()=>{
                    document.querySelector('.successP').innerHTML =   ` <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_tl52xzvn.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"    autoplay></lottie-player>
                    <h1>Order Not Recieved</h1>`
                },2000)
                setTimeout(()=>{
                    document.querySelector('.popup').style.display = 'none'
                },3000)
                isPendingOrder = false

            }
        });
      }else{

        document.querySelector('.successP').innerHTML =   `<lottie-player src="https://assets5.lottiefiles.com/packages/lf20_dmo93tpy.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"  loop  autoplay></lottie-player>
            <h1>Restaurant Offline</h1>`

            document.querySelector('.successP').style.display = 'flex'
            setTimeout(()=>{
                document.querySelector('.popup').style.display = 'none'
            },5000)
        isPendingOrder = false

      }  
    })

    


})
const sendDineDet = async(e)=>{ 
    
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
     
        if(result.order_status == 'PAID'){

            ctg.order_status = 'PAID'
            localStorage.setItem(`${room}Payment`,JSON.stringify(ctg));
            
            document.querySelector('.successP').style.display = 'flex'
            socket.emit('dine-details', JSON.parse(localStorage.getItem(Resid)) , room , tableNo , JSON.parse(localStorage.getItem(`${room}Payment`)) , (res)=>{
    
            });

            

        }else{
            localStorage.removeItem(`${room}Payment`)

        }
    }


   
}

socket.on('dine-details', (msg,billDetails,restaurantname,address,gstDet)=>{

    isPendingOrder = false;
    if(msg){
        document.querySelector('.successP').innerHTML =   ` <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_5lp0ystr.json"  background="transparent"  speed="1"  style="width: 50px; height: 50px;"    autoplay></lottie-player>
                <h1 style="margin-top: 1rem;">Order Accepted</h1>
                <p>Enjoy your meal</p>
                `
                
    localStorage.removeItem(`${room}Payment`)
    localStorage.removeItem(room)
        if(!JSON.parse(localStorage.getItem(room))){
            document.querySelector('.cart-absolute-div').style.display = "none"
            document.querySelector('.categories-btn').style.bottom = "2rem"
        }
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
                        <h3>${gstDet.gstNumber}</h3>
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
                            <h1>+ TAXES & CHARGES :</h1>
                            <h1 class="en-pr">${charges}</h1>
                        </div>
                        <div class="grand-total-con">
                            <h1>GRAND TOTAL :</h1>
                            <h1 class="en-pr">₹${gTotal}</h1>
                        </div>
                        <div class="grand-total-con">
                            <h1 style="color:${billDetails[4].order_status == 'UNPAID' ? 'red' : 'green'}">${billDetails[4].order_status}</h1>
                        </div>
                    </div>
                    <hr>
                    <div class="greet-div">
                        <img src="/images/Frame3.jpg" alt="Noxsh Dine" srcset="">
                        <h1>THANK YOU <br>Visit Again</h1>
                      
                    </div>
            </div> 
            <p>Please Download Bill</p>
            <button class="dnd-bill" id="${billDetails[2]}" onclick="downloadBill(this)"><i class="bi bi-download"></i> Download Bill</button> 
            `
            document.querySelector('.inv-con').style.top = window.scrollY + "px";
            document.querySelector('.inv-con').insertAdjacentHTML('afterbegin', htmlData);
            document.querySelector('.inv-con').style.display = 'flex';
            

                }
    }else{
        document.querySelector('.successP').innerHTML =   ` <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_jqcjv619.json"  background="transparent"  speed="1"  style="width: 50px; height: 50px;"    autoplay></lottie-player>
                <h1 style="margin-top: 2rem;">Order Declined</h1>
                <p>If any amount has been deducted, It will be refunded within 1 to 2 business days</p>
                `

                setTimeout(()=>{
                    document.querySelector('.popup').style.display = 'none'
                    
                  
                },5000)
               

    }
})



const payNow = () =>{
    console.log("CLICKING")
    if(isPendingOrder) return
    isPendingOrder = true
    socket.emit('status-check', room , async(res)=>{
        if(res == 'ACTIVE'){
            console.log('SENDING REQ TO API')
            const checkout = await fetch('/checkout-dine',{
                method : 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({amount: theGrandTotal,returnUrl : `${window.location.href.split('?')[0]}?order_id={order_id}&order_token={order_token}`,id : room})
            })

            let data = await checkout.json()
            console.log({'recieved-data' : data})
            if(await checkout.status == 200){
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
            },5000)
        }
    })
   
   isPendingOrder = false
    
}

   




   

        
    sendDineDet()