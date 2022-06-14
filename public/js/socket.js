
    const room =  window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    const {token} = sessionStorage
    const socket = io()
    var form = document.querySelector('.table-book');  
    let bookingDetails = {};
    const ghostBooking2 = document.querySelector('.ghost-booking');
    const content= document.querySelector('.content');
    
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


            
            if (bookingDetails) {      
                socket.emit('booking-details', bookingDetails , room);
                
                   
                    }  
                });


                socket.on('recieved-details', msg =>{
                  if(msg){
                    content.innerHTML = `
                    <div class="status-div">
                    <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_dpqpppvf.json"  background="transparent"  speed="1"  style="width: 5rem; height: 5rem;"    autoplay></lottie-player>
                    
                    <span>Booking Confirmed</span>
                    </div>
                    `

                    
                  }else{
                    content.innerHTML = `
                    <div class="status-div">
                   
                    <lottie-player src="https://assets7.lottiefiles.com/temp/lf20_yYJhpG.json"  background="transparent"  speed="1"  style="width: 5rem; height: 5rem;"    autoplay></lottie-player>
                    
                    <span>Booking Declined</span>
                    </div>
                    `
                  }
                    setTimeout(()=>{
                        ghostBooking2.style.display = "none"
                        content.innerHTML = `<img src="/images/rollingloader2.svg" alt="" srcset="">
                        <span class="ghost-h2">Please wait for confirmation from the Restuarant</span>
                        <p>Do not close this window</p>`
                    },5000)
                })

