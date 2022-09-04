
        const windowContent = document.querySelectorAll('[data-tab-windowContent]');

        const fetchEditData = async (id)=>{
            const editData = await fetch('/edit-food-data',{
                method : 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({payload: id})
            })

                return await editData.json();
        }

        const popEditWindow2 = async(e)=>{
            let foodData = await fetchEditData(e.id);
            console.log(foodData.finalData)
            const categoryData = [
                "Soups",
                "Salads",
                "Beverages",
                "Tandori",
                "Snacks",
                "Rolls",
                "Breakfast",
                "Main Course Veg",
                "Main Course Non-Veg",
                "Appetizers",
                "Ice Cream",
                "Shakes",
                "Pulao",
                "Pao Bhaji",
                "Extra / Addons",
                "Dips",
                "Indian",
                "Sizzler",
                "Platters",
                "Quick Bites",
                "Pantry",
                "Momos",
                "Bunnies",
                "Chutney",
                "Cookies",
                "Deserts",
                "Parathas",
                "Lassi",
                "Chai",
                "Coffee",
                "Soda",
                "Maska",
                "Namkeen",
                "Sweets",
                "Farsan"
                ]
                
                let cuisineData = ``;
                let matched = false;
                let manualCat = `<input type="text" name="cuisineType" placeholder="Add Category Manually">`
                categoryData.forEach((elem,i )=>{
                    if(elem == foodData.finalData.category){
                        matched = true
                        cuisineData += `<div class="input-con">
                        <input type="radio" name="cuisineType" value="${elem}" checked>
                         <label for="">${elem}</label>
                    </div>`
                    }else{
                        cuisineData += `<div class="input-con">
                        <input type="radio" name="cuisineType" value="${elem}">
                         <label for="">${elem}</label>
                    </div>`   
                    }
                    if(!matched && i == categoryData.length - 1){
                        manualCat = `<input type="text" name="cuisineType" placeholder="Add Category Manually" value="${foodData.finalData.category}">`
                    }
                    
                  
                })
                
                
            windowContent.forEach(elem =>{
                if(elem.dataset.tabWindowcontent == e.dataset.tabWindow){
                    let QtyData = ``;
                    // foodData.finalData.quantityDetails.forEach((elem , index )=>{
                    //     if(index != 0){
                    //         QtyData += `<div class="qty-div qty-div-${index + 1}" style="display : flex;">
                    //         <input type="checkbox" name="quantityOption" value="true" hidden checked>
                           
                                
                            
                    //         <div class="input-quantity-group">
                    //             <input type="text" placeholder="Quantity" name="foodQuantity${index + 1}" value="${elem.quantity}">
    
                    //         <select  id="" placeholder="Food Quantity" name="foodUnit${index + 1}">
                    //             <option value=""> Select Quantity</option>
                    //             <option value="Plate">Plate</option>
                    //             <option value="Kg">KG</option>
                    //             <option value="Gram">Gram</option>
                    //             <option value="ltr">Ltr</option>
                    //             <option value="Ml">Ml</option>
                    //             <option value="Pc">Pc</option>
    
    
                    //         </select>
                    //         <input type="text" placeholder="Food Price" name="foodPrice${index + 1}" value="${elem.price}">
                    //         </div>
                    //         </div>`
                            

                    //     }
                    // })
                    for(let k = 0; k <= 2; k++){
                        if(k != 0 && k <= foodData.finalData.quantityDetails.length - 1){
                            QtyData += `<div class="qty-div qty-div-${k + 1}" style="display : flex;">
                            <button type="button" class="rmv-qty" onclick="removeQty(this)"><i class="bi bi-x-lg"></i></button>
                            <input type="checkbox" name="quantityOption" value="true" hidden checked>
                           
                                
                            
                            <div class="input-quantity-group">
                                <input type="text" placeholder="Quantity" name="foodQuantity${k + 1}" value="${foodData.finalData.quantityDetails[k].quantity}">
    
                            <select  id="" placeholder="Food Quantity" name="foodUnit${k + 1}">
                                <option value=""> Select Quantity</option>
                                <option value="Plate">Plate</option>
                                <option value="Kg">KG</option>
                                <option value="Gram">Gram</option>
                                <option value="ltr">Ltr</option>
                                <option value="Ml">Ml</option>
                                <option value="Pc">Pc</option>
    
    
                            </select>
                            <input type="text" placeholder="Food Price" name="foodPrice${k + 1}" value="${foodData.finalData.quantityDetails[k].price}">
                            </div>
                            </div>`
                            

                        }else if(k >= foodData.finalData.quantityDetails.length){
                            QtyData += `<div class="qty-div qty-div-${k + 1}">
                            <button type="button" class="rmv-qty" onclick="removeQty(this)"><i class="bi bi-x-lg"></i></button>
                            <input type="checkbox" name="quantityOption" value="true" hidden>
                           
                                
                            
                            <div class="input-quantity-group">
                                <input type="text" placeholder="Quantity" name="foodQuantity${k + 1}">
    
                            <select  id="" placeholder="Food Quantity" name="foodUnit${k + 1}">
                                <option value=""> Select Quantity</option>
                                <option value="Plate">Plate</option>
                                <option value="Kg">KG</option>
                                <option value="Gram">Gram</option>
                                <option value="ltr">Ltr</option>
                                <option value="Ml">Ml</option>
                                <option value="Pc">Pc</option>
    
    
                            </select>
                            <input type="text" placeholder="Food Price" name="foodPrice${k + 1}">
                            </div>
                            </div>`
                        }
                    }
                   document.querySelector('.edit-data-outer-div-2').style.display = "flex";
                   document.querySelector('.edit-data-outer-div-2').style.top =  `${window.scrollY}px`
                   document.querySelector('.edit-data-outer-div-2').innerHTML = ` <i class="bi bi-x-lg" onclick="closeEditWindow2()"></i>
                   <div class="edit-data-div" data-tab-windowContent="food-items">
                       <h1>Edit Food Items</h1>
                       <div class="form-div">
                           <form action="/edit-food-items" method="POST" enctype="multipart/form-data">
                           <input name="foodId" value="${e.id}" hidden>
                           <input name="originalFileName" value="${foodData.finalData.cuisineImg}" hidden>

                           <div class="form-content">
                               <div class="img-det-con">
                                   <div class="upload-img-div">
                                   <i class="bi bi-card-image"></i>
                                   <img src="/uploads/${foodData.finalData.cuisineImg}" alt="" srcset=""  class="edit-f-img">
                               </div>
           
                               <input type="file" name="file" id="edit-img-inp" value="${foodData.finalData.cuisineImg}" onchange="showImg()">
                               </div>
                               
                               <div class="food-item-det-div">
                                   <input type="text" placeholder="Food Name" name="foodName" value="${foodData.finalData.cuisinename}" required>
                                      
           
                                   <div class="input-quantity-group" >
                                       <input type="text" placeholder="Quantity" name="foodQuantity1" value="${foodData.finalData.quantityDetails[0].quantity}" required>
                                   <select  id="" placeholder="Food Quantity" name="foodUnit1" required>
                                       <option value=""> Select Quantity</option>
                                       <option value="Plate">Plate</option>
                                       <option value="Kg">KG</option>
                                       <option value="Gram">Gram</option>
                                       <option value="ltr">Ltr</option>
                                       <option value="Pc">Pc</option>
           
                                   </select> 
                                   <input type="number" placeholder="Food Price" name="foodPrice1" value="${foodData.finalData.quantityDetails[0].price}" required>
                                   </div>
                                   ${QtyData}
                                   <button class="add-quantity" onclick="addQtyDiv(this)" data-tab-counter="${foodData.finalData.quantityDetails.length + 1}" type="button">Add More</button>
                                   <div class="input-group">
                                       
                                       <input type="radio" name="category" value="Veg" ${foodData.finalData.type == 'Veg' ? 'checked' : ''}>
                                       <h4>VEG</h4>
                                       <input type="radio" name="category" value="Non-veg" ${foodData.finalData.type == 'Non-veg' ? 'checked' : ''}>
                                       <h4>NON-VEG</h4>
           
                                   </div>
                                   <div class="cuisine-data-con">
                                       <h2>Category</h2>
                                       <div class="cuisine-data-holder">
                                        ${cuisineData}
                                       </div>
                                          ${manualCat}
           
                                          
                                   </div>
                                   <div class="input-group">
                                       <select  id="" placeholder="Packaging Type" name="packaging">
                                       <option value=""> Select Quantity</option>
                                       <option value="packed">Packed</option>
                                       <option value="unpacked">Unpacked</option>
                                   </select>
                                   </div>
                               </div>
                               </div>
                           <button type="submit">Save Now</button>
                               
                           </form>
                       </div>
                   </div>`
                   document.querySelector('select[name="foodUnit1"]').value = foodData.finalData.quantityDetails[0].quantityUnit
                   document.querySelector('select[name="packaging"]').value = foodData.finalData.packaging
                   foodData.finalData.quantityDetails.forEach((elem , index )=>{
                        if(index != 0){
                            document.querySelector(`select[name="foodUnit${index + 1}"]`).value = elem.quantityUnit
                        }   
                    })
                   

                    document.body.classList.add('ovf');
                }   
            })
        
        
                
        }

        const closeEditWindow2 = async()=>{

            document.querySelector('.edit-data-outer-div-2').style.display = "none"
            document.body.classList.remove('ovf');
            
        
        }


const popEditWindow = async(e)=>{
    console.log(e.id);

    windowContent.forEach(elem =>{
        if(elem.dataset.tabWindowcontent == e.dataset.tabWindow){
           document.querySelector('.edit-data-outer-div').style.display = "flex";
           document.querySelector('.edit-data-outer-div').style.top =  `${window.scrollY}px`
           
            document.body.classList.add('ovf');

        }   
    })


    
}

const closeEditWindow = async()=>{

    document.querySelector('.edit-data-outer-div').style.display = "none"
    document.body.classList.remove('ovf');
    

}











let finalData;

const fetchRestData = async()=>{
    const getRestData = await fetch("/business/send-data",{
        method : "POST"
    })

    finalData = await getRestData.json();
    console.log(finalData.activeOffers);
    //Active Offers
    const offersDivCon = document.querySelector('.offers-div-con');
    finalData.activeOffers.forEach(elem =>{
        console.log(elem);
        let htmlData = `<div class="offer">
        <div class="hov-btn-con">
                        <button class="edit-btn" onclick="popEditWindow2(${elem.offerId})" data-tab-window="offer-items"><i class="bi bi-pencil-fill"></i></button>
                        <button class="delete-btn"><i class="bi bi-trash3-fill"></i></button>
                        </div>
        <div class="img"><img src="/uploads/${elem.cuisineImg}" alt="" srcset=""></div>
        <div class="offer-det-div">
            <div class="offer-name-price-con">
                <p class="food-name">${elem.cuisinename}</p>
            <p class="offer-before ruppee">₹${elem.price}</p>
            </div>
            
            <p class="offer-after ruppee">Offer Price - ₹${elem.offerPrice}</p>

        </div>
    </div>`

    offersDivCon.insertAdjacentHTML("afterbegin" , htmlData)
    })

    //Food Items
    const foodItemsDiv = document.querySelector('.food-items-div-con');
    
    finalData.foodItems.forEach(elem =>{
        let qntDet = ``
        elem.quantityDetails.forEach(element =>{
            qntDet += `<div class="offer-name-price-con">
            <p>${element.quantity} ${element.quantityUnit}</p>
            <p>₹ ${element.price}</p>
        </div>`
        })
        let htmlData = `<div class="food">
        <div class="hov-btn-con">
                        <button class="edit-btn" onclick="popEditWindow2(this)" id="${elem._id}" data-tab-window="food-items"><i class="bi bi-pencil-fill"></i></button>
                        <button class="delete-btn" id="${elem._id}" onclick="openpopup(this)"><i class="bi bi-trash3-fill"></i></button>
                        </div>
        <div class="img"><img loading="lazy" src="/uploads/${elem.cuisineImg}" alt="" srcset=""></div>
        <div class="food-det-div">
            <div class="offer-name-price-con">
                <p class="food-name">${elem.cuisinename}</p>
            
            </div>
            ${qntDet}
            

        </div>
    </div>`
    foodItemsDiv.insertAdjacentHTML("afterbegin",htmlData);
    })

    // //Menu
    // const menuDiv = document.querySelector('.menu-div-con');
    // finalData.menu.forEach(elem =>{
    //     let htmlData = ` <div class="menu">
    //     <div class="hov-btn-con">
    //                     <button class="edit-btn" onclick="popEditWindow2(${elem._Id})" data-tab-window="Menu-items"><i class="bi bi-pencil-fill"></i></button>
    //                     <button class="delete-btn"><i class="bi bi-trash3-fill"></i></button>
    //                     </div>
    //     <div class="menu-img"><img src="/uploads/${elem.img}" alt="" srcset=""></div>
        
        
    //     </div>`

    //     menuDiv.insertAdjacentHTML("afterbegin",htmlData)

    // })

    //Gallery
    const galleryDiv = document.querySelector('.gallery-div-con');
    finalData.gallery.forEach(elem =>{
        let htmlData = `<div class="gallery">
        <div class="hov-btn-con">
                        <button class="delete-btn"><i class="bi bi-trash3-fill"></i></button>
                        </div>
        <div class="gallery-img"><img src="/uploads/${elem}" alt="" srcset=""></div>
        
            

        </div>`

        galleryDiv.insertAdjacentHTML("afterbegin",htmlData)

    })
    document.querySelector("#pending-amount-here").textContent = "₹" + finalData.pendingAmount
    console.log("DATA", finalData)
    
}

fetchRestData()

const searchPastBookings = async(i)=>{
    document.querySelector('.past-bookings-data-holder').innerHTML = ''
    const val = document.querySelector('input[name="past-item-search"]').value
    const getPastBookings = await fetch('/get-past-bookings',{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({payload: val.toUpperCase()})
    })
    const pastBooking = await getPastBookings.json()
    console.log(pastBooking);
    if(!pastBooking.userData) return document.querySelector('.past-bookings-data-holder').insertAdjacentHTML('afterbegin',`<h1>No Results</h1>`)
    if(pastBooking.whereFound == 'Table Booking'){
   
        let htmlData = `<div class="main-data-con">
        <span class="specifier">Table booking</span>
        <div class="user-details-div">
            <img src="${pastBooking.userData.profileImg}" alt="">
            <div class="name-username-div">
                <h4 class="name">${pastBooking.userData.name}</h4>
                <span class="username">${pastBooking.userData.username}</span>
            </div>
            <h4><span>ID</span>${pastBooking.bookingFound.orderId}</h4>
        </div>
        <div class="booking-details-con">
            <div class="date-con">
                <h4>Date</h4>
                <p>${pastBooking.bookingFound.bookingDate}</p>
            </div>
            <div class="time-con">
                  <h4>Time</h4>
                <p>${pastBooking.bookingFound.bookingTime}</p>
            </div>
            <div class="guest-name-con">
                  <h4>Guest Name</h4>
                <p>${pastBooking.bookingFound.guestName}</p>
            </div>
            <div class="guest-count-con">
                  <h4>Guest Count</h4>
                <p>${pastBooking.bookingFound.guestCount}</p>
            </div>
        </div>
        <div class="buttons-con">
            <button class="more-info" id="${pastBooking.bookingFound._id}" onclick="displayBookingOrderDetails(this)">More Info</button>
            
        </div>
        </div>`
        document.querySelector('.past-bookings-data-holder').insertAdjacentHTML('afterbegin',htmlData)

    }else if(pastBooking.whereFound == 'Takeaway'){

        let orderDate = `${pastBooking.bookingFound.orderDate.split([' '])[0]}, ${pastBooking.bookingFound.orderDate.split([' '])[1]} ${pastBooking.bookingFound.orderDate.split([' '])[2]}`
        let htmlData = `<div class="main-data-con">
        
        <div class="user-details-div">
            <img src="${pastBooking.userData.profileImg}" alt="">
            <div class="name-username-div">
                <h4 class="name">${pastBooking.userData.name}</h4>
                <span class="username">${pastBooking.userData.username}</span>
            </div>
            <h4><span>ID</span> ${pastBooking.bookingFound.orderId}</h4>
        </div>
        <div class="booking-details-con">
            <div class="date-con">
                <h4>Date</h4>
                <p>${orderDate}</p>
            </div>
            <div class="time-con">
                  <h4>Time</h4>
                <p>${pastBooking.bookingFound.orderTime ? pastBooking.bookingFound.orderTime : '10'}</p>
            </div>
            <div class="guest-name-con">
                  <h4>Guest Name</h4>
                <p>${pastBooking.userData.name}</p>
            </div>
            <div class="guest-count-con">
                  <h4>Guest Count</h4>
                <p>${'none'}</p>
            </div>
        </div>
        <div class="buttons-con">
            <button class="more-info" id="${pastBooking.bookingFound._id}" onclick="moreInfo('takeaway','${pastBooking.bookingFound._id}','${room}')">More Info</button>
            
        </div>
        </div>`
        document.querySelector('.past-bookings-data-holder').insertAdjacentHTML('afterbegin',htmlData)
    }else if(pastBooking.whereFound == 'Dine In'){
        let orderDate = `${pastBooking.bookingFound.orderDate.split([' '])[0]}, ${pastBooking.bookingFound.orderDate.split([' '])[1]} ${pastBooking.bookingFound.orderDate.split([' '])[2]}`
        let htmlData = `<div class="main-data-con">
        <div class="user-details-div">
            <div class="table-no-div">
          <h4><span>Table No.</span> </h4>
          <h4><span>ID</span> ${pastBooking.bookingFound.orderId}</h4>
      
            </div>
        </div>
        <div class="booking-details-con">
            <div class="date-con">
                <h4>Date</h4>
                <p>${orderDate}</p>
            </div>
            <div class="time-con">
                  <h4>Time</h4>
                <p>${orderDate}</p>
            </div>
            <div class="guest-name-con">
                  
            </div>
            <div class="guest-count-con">
                 
            </div>
        </div>
        <div class="buttons-con">
        <button class="more-info" id="${pastBooking.bookingFound._id}" onclick="moreInfo('dine','${pastBooking.bookingFound._id}','${room}')">More Info</button>
        
        </div>
        </div>`
        document.querySelector('.past-bookings-data-holder').insertAdjacentHTML('afterbegin',htmlData)
    }
}

const searchFoodItems = (i)=>{
    console.log(i.value)
    let regExp = new RegExp(i.value+'.*','i');
    const foodItemsDiv = document.querySelector('.food-items-div-con');
    foodItemsDiv.innerHTML = ``
    finalData.foodItems.forEach(elem =>{
        if(regExp.test(elem.cuisinename)){

            let qntDet = ``
        elem.quantityDetails.forEach(element =>{
            qntDet += `<div class="offer-name-price-con">
            <p>${element.quantity} ${element.quantityUnit}</p>
            <p>₹ ${element.price}</p>
        </div>`
        })
        let htmlData = `<div class="food">
        <div class="hov-btn-con">
                        <button class="edit-btn" onclick="popEditWindow2(this)" id="${elem._id}" data-tab-window="food-items"><i class="bi bi-pencil-fill"></i></button>
                        <button class="delete-btn" id="${elem._id}" onclick="deleteFoodItem(this)"><i class="bi bi-trash3-fill"></i></button>
                        </div>
        <div class="img"><img loading="lazy" src="/uploads/${elem.cuisineImg}" alt="" srcset=""></div>
        <div class="food-det-div">
            <div class="offer-name-price-con">
                <p class="food-name">${elem.cuisinename}</p>
            
            </div>
            ${qntDet}
            

        </div>
    </div>`
    foodItemsDiv.insertAdjacentHTML("afterbegin",htmlData);   
        }

        
        
    })
    if(!i.value){
        let htmlData = `<div class="add-div" data-tab-window="food-items" onclick="popEditWindow(this)">
        <i class="bi bi-plus-lg"></i>
        <p>Add Food Item</p>
    </div>`
    foodItemsDiv.insertAdjacentHTML("beforeend",htmlData); 
    }
}


const deleteFoodItem = async(i)=>{
    i.style.borderColor = '#afafaf'
    i.style.color = '#afafaf'

    const sendReq = await fetch('/delete-food-item',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({payload : i.id})
    })
    if(await sendReq.status == 200){
        window.location.href = window.location.href
    }
    document.body.classList.add('ovf')
}
const openpopup = async(i)=>{

    

    document.querySelector('.delete-popup-con').style.display = 'flex'
    document.querySelector('.delete-popup-con').style.top = window.scrollY + "px"
    document.querySelector('.confirm').id = i.id




}
const closepopup = ()=>{
    document.querySelector('.delete-popup-con').style.display = 'none'
    document.body.classList.remove('ovf')

}

const addQtyDiv = (i)=>{
    console.log(i.dataset.tabCounter)
    if(parseInt(i.dataset.tabCounter) <= 3){
        const findAsdq = i.closest('.food-item-det-div');

    const aQWe = findAsdq.querySelector(`.qty-div-${i.dataset.tabCounter}`)
    console.log(aQWe)
    aQWe.style.display = 'flex'
    aQWe.querySelector('input[name="quantityOption"]').checked = true
    i.dataset.tabCounter = parseInt(i.dataset.tabCounter) + 1
    }
    

}
const removeQty = (i)=>{
   const currDiv = i.parentElement
    const parentE = currDiv.parentElement 
    parentE.querySelector('.add-quantity').dataset.tabCounter = parseInt(parentE.querySelector('.add-quantity').dataset.tabCounter) - 1
    const foundDiv = parentE.querySelector(`.qty-div-${parseInt(parentE.querySelector('.add-quantity').dataset.tabCounter)}`)
    
   foundDiv.querySelector('input[name="quantityOption"]').checked = false
   foundDiv.style.display = 'none'
}