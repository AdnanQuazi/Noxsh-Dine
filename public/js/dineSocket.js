

const room =  window.location.href.substring(window.location.href.indexOf('/nfc') + 1).split(['/'])[1]
const tableNo =  window.location.href.substring(window.location.href.indexOf('/nfc') + 1).split(['/'])[2]



const socket = io()

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
            socket.emit('dine-details', JSON.parse(localStorage.getItem(Resid)) , room , tableNo , (res)=>{
                console.log(res)
                if(res == 'Recieved'){
                    setTimeout(()=>{
                        document.querySelector('.successP').innerHTML =   ` <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_qw3jzeji.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;" loop autoplay></lottie-player>
                        <h1>Order Recieved</h1>`
                    },2000)
                   
                }else{
                    setTimeout(()=>{
                        document.querySelector('.successP').innerHTML =   ` <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_tl52xzvn.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"    autoplay></lottie-player>
                        <h1>Order Not Recieved</h1>`
                    },2000)
                    setTimeout(()=>{
                        document.querySelector('.popup').style.display = 'none'
                    },3000)
                }
            });

            localStorage.removeItem(`${room}Payment`)
            localStorage.removeItem(room)

        }else{
            localStorage.removeItem(`${room}Payment`)

        }
    }


   
}

socket.on('dine-details', (msg)=>{

  
    if(msg){
        document.querySelector('.successP').innerHTML =   ` <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_rc5d0f61.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"    autoplay></lottie-player>
                <h1>Order Accepted</h1>`

                setTimeout(()=>{
                    document.querySelector('.popup').style.display = 'none'
                },5000)
    }else{
        document.querySelector('.successP').innerHTML =   ` <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_tl52xzvn.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"    autoplay></lottie-player>
                <h1>Order Declined</h1>`

                setTimeout(()=>{
                    document.querySelector('.popup').style.display = 'none'
                },5000)
    }
})




document.querySelector('.order-btn').addEventListener('click',async()=>{
    

    socket.emit('status-check', room , async(res)=>{
        if(res == 'ACTIVE'){

            const checkout = await fetch('/checkout',{
                method : 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({amount: theGrandTotal,returnUrl : `${window.location.href.split('?')[0]}?order_id={order_id}&order_token={order_token}`,id : room})
            })
            let data = await checkout.json()
            if(await checkout.status == 200){
                localStorage.setItem(`${room}Payment`,JSON.stringify({
                    order_id : data.data.order_id,
                    order_token : data.data.order_token,
                    order_status : data.data.order_status      
                }));

                window.location.href = data.data.payment_link
            }else{
                console.log(data)
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
   
   
    
})



   

        
    sendDineDet()