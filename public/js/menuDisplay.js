const menuWrapCon = document.querySelector('.menu-wrap-con');


menuWrapCon.addEventListener('click' , (e)=>{

    if(e.target.name == "quantity"){
        let itemPrice = document.querySelector('.item-price');
        let div = e.target.closest('.menu-item');
        let div2 = div.querySelector('.item-price')
        
        div2.innerHTML =  `₹${e.target.dataset.tabPrice}`




    }
})

const id = window.location.href.substring(window.location.href.indexOf('/nfc') + 1).split(['/'])[1];
console.log(id);

let finalData;

let categories = [];
let a = 0;

const fillMenu = ()=>{
    menuWrapCon.innerHTML = ''
    finalData.menuData.menu.forEach(element => {
        if(!categories.includes(element.category)){
            categories.push(element.category)
        }

    });
    document.querySelector('.catUl').innerHTML = ''
    categories.forEach((element,index )=>{

        finalData.menuData.menu.forEach(e =>{
            if(element == e.category){
                a += 1;
            }


        })
        document.querySelector('.catUl').innerHTML += `<li onclick="scrollToView('${element}')" id="${element}">${element} (${a})</li>`
        let containerData = `<div class="specify-div" >
            <button class="specify-head"  data-tab-target="${element}" data-tab-status="open">${element} (${a}) <i class="bi bi-caret-down-fill"></i></button>
            <div class="menu-inner-wrap-con menu-inner-wrap-con${index}" id="${element}" data-tab-content="${element}"></div>
            </div>
            `
               menuWrapCon.innerHTML += containerData; 
               
        finalData.menuData.menu.forEach(elem=>{

            const containerDiv = document.querySelector(`.menu-inner-wrap-con${index}`);

            
            if(element == elem.category){
                  let typeData;
                  let quantityData = '';
               if(elem.type == "Non-veg"){
                   typeData = `<img src="https://img.icons8.com/fluency/50/000000/non-vegetarian-food-symbol.png" alt="">`
               }else{
                   typeData = `<img src="https://img.icons8.com/fluency/50/000000/vegetarian-food-symbol.png" alt="">`
               } 

               
               elem.quantityDetails.forEach((element , index)=>{

                if(index == 0){
                    quantityData += `<div class="quantity-div">
                <input type="radio" name="${elem._id}" value='${element.quantity} ${element.quantityUnit}' data-tab-id=${elem._id} data-tab-price=${element.price} onchange="changeBtn(this)" checked>
                <label for="quantity1">${element.quantity} ${element.quantityUnit}</label>
                </div>`
                }else{
                    quantityData += `<div class="quantity-div">
                <input type="radio" name="${elem._id}" value='${element.quantity} ${element.quantityUnit}' data-tab-id=${elem._id} data-tab-price=${element.price} onchange="changeBtn(this)">
                <label for="quantity1">${element.quantity} ${element.quantityUnit}</label>
                </div>`
                }
                

            })
            let arr = JSON.parse(localStorage.getItem(id)) || []
            console.log(arr);
            let btn;
            if(arr.length < 1){
                btn = `<button class="add-to-cart" id="${elem._id}" data-tab-target="addToCart">Add</i></button>`
            }
                for(let [index,i] of arr.entries()){
                    let quantity = `${elem.quantityDetails[0].quantity} ${elem.quantityDetails[0].quantityUnit}`
                    console.log(quantity);
                    if(i.foodId == elem._id){

                        if(i.foodQuantity == quantity){
                            btn = `<div class="btn-con">
                            <button ><span><i class="bi bi-dash" onclick="removeFromCart('${i.foodId}' , '${i.foodQuantity}' , this);"></i></span></button>
                            <input class="quantity ${i.foodId}" min="1" max="15" name="food-quantity" value="${i.cartQuantity}" type="number"  data-id="${i.foodId}">
                            <button ><span><i class="bi bi-plus" id="${i.foodId}" data-tab-target="addToCart" ></i></span></button>
                            </div>`
                            break;
                        }else{
                            btn = `<button class="add-to-cart" id="${elem._id}" data-tab-target="addToCart">Add</button>`
                        }

                    }else{
                        
                        if(index == arr.length - 1){
                            btn = `<button class="add-to-cart" id="${elem._id}" data-tab-target="addToCart">Add</button>`
                        }
                    }
                } 
               
                let htmlData = `<div class="menu-item" >
                <div class="item-wrap-con">
                <div class="img-wrap-con">
                        <div class="img-div">
                <img src="/uploads/${elem.cuisineImg}" alt="" srcset="">

                </div>
                </div>
                
                <div class="item-details-div">
                    ${typeData}
                    <span class="item-name">${elem.cuisinename}</span>
                    <span class="item-price ">₹${elem.quantityDetails[0].price}</span>

                    

                </div>
                <div class="add-to-cart-div">
                   ${btn}
                    
                </div>
                </div>
                
           
            <div class="quantity-wrap-div">
                        
                        ${quantityData}
                    </div>
                     <hr>

            </div>`

            containerDiv.innerHTML += htmlData
            quantityData = ''
       

            }   
        })

        a = 0;
    })
    
}
const menuWra = document.querySelectorAll('.menu-wrap-con');
menuWra.forEach(elem => {

})

const menuDataFetch = async()=>{

    const menuData = await fetch(`/menuData/${id}`,{
        method : "GET",
       
    })


    let data = await menuData.json();
    finalData = data;
    console.log(finalData);
    document.querySelector('.landing-div').innerHTML = `<h1>${finalData.menuData.restaurantname}<br>Warmly<br>Welcomes You</h1>`
    fillMenu()
    

    

    
}
menuDataFetch()

const filterTabs = document.querySelectorAll('[data-tab-category]');
filterTabs.forEach(tab =>{
    tab.addEventListener('click', ()=>{
        a = 0;
        console.log(tab);

        if(tab.dataset.tabCategory == "Veg"){

            if(tab.dataset.tabStatus == "inactive"){
                document.querySelector('.catUl').innerHTML = ''
                let vegData = [];
                let vegCategories = []
                menuWrapCon.innerHTML = '';
                finalData.menuData.menu.forEach(elem =>{
            
                    if(elem.type == "Veg"){
                       vegData.push(elem)
                    }
                    
                    
                    
                    
                    
            
            
            
            
                })
                vegData.forEach(elem =>{
                    if(!vegCategories.includes(elem.category)){
                        vegCategories.push(elem.category)
                    }
                })

                

                vegCategories.forEach((element,index )=>{

                    finalData.menuData.menu.forEach(e =>{
                        if(element == e.category){
                            a += 1;
                        }
            
            
                    })
                    document.querySelector('.catUl').innerHTML += `<li onclick="scrollToView('${element}')" id="${element}">${element} (${a})</li>`
                    let containerData = `<div class="specify-div" >
                        <button class="specify-head"  data-tab-target="${element}" data-tab-status="open">${element} (${a}) <i class="bi bi-caret-down-fill"></i></button>
                        <div class="menu-inner-wrap-con menu-inner-wrap-con${index}" id="${element}" data-tab-content="${element}">
                        </div>
                        </div>
                        `
                           menuWrapCon.innerHTML += containerData; 
                           
                    vegData.forEach(elem=>{
            
                        const containerDiv = document.querySelector(`.menu-inner-wrap-con${index}`);
            
                        
                        if(element == elem.category){
                              let typeData = '';
                  let quantityData = '';

                           if(elem.type == "Non-veg"){
                               typeData = `<img src="https://img.icons8.com/fluency/50/000000/non-vegetarian-food-symbol.png" alt="">`
                           }else{
                               typeData = `<img src="https://img.icons8.com/fluency/50/000000/non-vegetarian-food-symbol.png" alt="">`
                           } 

                           elem.quantityDetails.forEach((element , index)=>{
                            if(index == 0){
                                quantityData += `<div class="quantity-div">
                                <input type="radio" name="${elem._id}" value='${element.quantity} ${element.quantityUnit}' data-tab-id=${elem._id}  data-tab-price=${element.price} onchange="changeBtn(this)" checked>
                                <label for="quantity1">${element.quantity} ${element.quantityUnit}</label>
                                </div>`
                            }else{
                                quantityData += `<div class="quantity-div">
                                <input type="radio" name="${elem._id}" value='${element.quantity} ${element.quantityUnit}' data-tab-id=${elem._id}  data-tab-price=${element.price} onchange="changeBtn(this)">
                                <label for="quantity1">${element.quantity} ${element.quantityUnit}</label>
                                </div>`
                            }
                           
            
                        })
                            
                        let arr = JSON.parse(localStorage.getItem(id)) || []
                        let btn;
                        if(arr.length < 1){
                            btn = `<button class="add-to-cart" id="${elem._id}" data-tab-target="addToCart">Add</button>`
                        }
                        for(let [index,i] of arr.entries()){
                            let quantity = `${elem.quantityDetails[0].quantity} ${elem.quantityDetails[0].quantityUnit}`
                            console.log(quantity);
                            if(i.foodId == elem._id){
                                   
                                if(i.foodQuantity == quantity){
                                    btn = `<div class="btn-con">
                                    <button ><span><i class="bi bi-dash" onclick="removeFromCart('${i.foodId}' , '${i.foodQuantity}' , this);"></i></span></button>
                                    <input class="quantity ${i.foodId}" min="1" max="15" name="food-quantity" value="${i.cartQuantity}" type="number"  data-id="${i.foodId}">
                                    <button ><span><i class="bi bi-plus" id="${i.foodId}" data-tab-target="addToCart" ></i></span></button>
                                    </div>`
                                    break;
                                }else{
                                    btn = `<button class="add-to-cart" id="${elem._id}" data-tab-target="addToCart">Add</button>`
                                }
        
                            }else{
                                
                                if(index == arr.length - 1){
                                    btn = `<button class="add-to-cart" id="${elem._id}" data-tab-target="addToCart">Add</button>`
                                }
                            }
                        }  

                            let htmlData = `<div class="menu-item" >
                            <div class="item-wrap-con">
                            <div class="img-wrap-con">
                                    <div class="img-div">
                            <img src="/uploads/${elem.cuisineImg}" alt="" srcset="">
            
                            </div>
                            </div>
                            
                            <div class="item-details-div">
                                ${typeData}
                                <span class="item-name">${elem.cuisinename}</span>
                                <span class="item-price ">₹${elem.quantityDetails[0].price}</span>
            
                                
            
                            </div>
                            <div class="add-to-cart-div">
                                ${btn}
                                
                            </div>
                            </div>
                            
                       
                        <div class="quantity-wrap-div">
                                    ${quantityData}
            
                                </div>
                                 <hr>
            
                        </div>`
                        containerDiv.innerHTML += htmlData
                        quantityData = ''
            
                        }   
                    })
                })

                tab.style.backgroundColor = "#3ea055"
                tab.style.color = "white"
                tab.style.borderColor = "#3ea055"


                tab.dataset.tabStatus = "active";
            }else{
                tab.style.backgroundColor = "white"
                tab.style.color = "black"
                tab.style.borderColor = "#afafaf"

                tab.dataset.tabStatus = "inactive"
                fillMenu()
            }   
        }else if(tab.dataset.tabCategory == "Non-veg"){
            if(tab.dataset.tabStatus == "inactive"){

                document.querySelector('.catUl').innerHTML = ''
                let vegData = [];
                let vegCategories = []
                menuWrapCon.innerHTML = '';
                finalData.menuData.menu.forEach(elem =>{
            
                    if(elem.type == "Non-veg"){
                       vegData.push(elem)
                    }
                    
                    
                    
                    
                    
            
            
            
            
                })
                vegData.forEach(elem =>{
                    if(!vegCategories.includes(elem.category)){
                        vegCategories.push(elem.category)
                    }
                })
                vegCategories.forEach((element,index )=>{
                    finalData.menuData.menu.forEach(e =>{
                        if(element == e.category){
                            a += 1;
                        }
            
            
                    })
                    document.querySelector('.catUl').innerHTML += `<li onclick="scrollToView('${element}')" id="${element}">${element} (${a})</li>`
                    let containerData = `<div class="specify-div" >
                        <button class="specify-head"  data-tab-target="${element}" data-tab-status="open">${element} (${a}) <i class="bi bi-caret-down-fill"></i></button>
                        <div class="menu-inner-wrap-con menu-inner-wrap-con${index}" id="${element}" data-tab-content="${element}">
                        </div>
                        </div>
                        `
                           menuWrapCon.innerHTML += containerData; 
                           
                    vegData.forEach(elem=>{
            
                        const containerDiv = document.querySelector(`.menu-inner-wrap-con${index}`);
            
                        
                        if(element == elem.category){
                              let typeData;
                  let quantityData = '';

                           if(elem.type == "Non-veg"){
                               typeData = `<img src="https://img.icons8.com/fluency/50/000000/non-vegetarian-food-symbol.png" alt="">`
                           }else{
                               typeData = `<img src="https://img.icons8.com/fluency/50/000000/non-vegetarian-food-symbol.png" alt="">`
                           } 

                           elem.quantityDetails.forEach((element , index)=>{
                                if(index == 0){
                                    quantityData += `<div class="quantity-div">
                                    <input type="radio" name="${elem._id}" value='${element.quantity} ${element.quantityUnit}' data-tab-id=${elem._id}  data-tab-price=${element.price} onchange="changeBtn(this)" checked> 
                                    <label for="quantity1">${element.quantity} ${element.quantityUnit}</label>
                                    </div>`
                                }else{
                                    quantityData += `<div class="quantity-div">
                                    <input type="radio" name="${elem._id}" value='${element.quantity} ${element.quantityUnit}' data-tab-id=${elem._id}  data-tab-price=${element.price} onchange="changeBtn(this)">
                                    <label for="quantity1">${element.quantity} ${element.quantityUnit}</label>
                                    </div>`
                                }
                           
            
                        })
                        let arr = JSON.parse(localStorage.getItem(id)) || []
                        let btn = '';
                        if(arr.length < 1){
                            btn = `<button class="add-to-cart" id="${elem._id}" data-tab-target="addToCart">Add</button>`
                        }
                        for(let [index,i] of arr.entries()){
                            let quantity = `${elem.quantityDetails[0].quantity} ${elem.quantityDetails[0].quantityUnit}`
                            console.log(quantity);
                            if(i.foodId == elem._id){
        
                                if(i.foodQuantity == quantity){
                                    btn = `<div class="btn-con">
                                    <button ><span><i class="bi bi-dash" onclick="removeFromCart('${i.foodId}' , '${i.foodQuantity}' , this);"></i></span></button>
                                    <input class="quantity ${i.foodId}" min="1" max="15" name="food-quantity" value="${i.cartQuantity}" type="number"  data-id="${i.foodId}">
                                    <button ><span><i class="bi bi-plus" id="${i.foodId}" data-tab-target="addToCart" ></i></span></button>
                                    </div>`
                                    break;
                                }else{
                                    btn = `<button class="add-to-cart" id="${elem._id}" data-tab-target="addToCart">Add</button>`
                                }
        
                            }else{
                                
                                if(index == arr.length - 1){
                                    btn = `<button class="add-to-cart" id="${elem._id}" data-tab-target="addToCart">Add</button>`
                                }
                            }
                        } 
                            let htmlData = `<div class="menu-item" >
                            <div class="item-wrap-con">
                            <div class="img-wrap-con">
                                    <div class="img-div">
                            <img src="/uploads/${elem.cuisineImg}" alt="" srcset="">
            
                            </div>
                            </div>
                            
                            <div class="item-details-div">
                                ${typeData}
                                <span class="item-name">${elem.cuisinename}</span>
                                <span class="item-price ">₹${elem.quantityDetails[0].price}</span>
            
                                
            
                            </div>
                            <div class="add-to-cart-div">
                                ${btn}
                                
                            </div>
                            </div>
                            
                       
                        <div class="quantity-wrap-div">

                            ${quantityData}
            
                                </div>
                                 <hr>
            
                        </div>`
                        containerDiv.innerHTML += htmlData
                        quantityData = ''
            
                        }   
                    })
                })
                tab.style.backgroundColor = "#3ea055"
                tab.style.color = "white"
                tab.style.borderColor = "#3ea055"

                tab.dataset.tabStatus = "active";
            }
            else{
                tab.style.backgroundColor = "white"
                tab.style.color = "black"
                tab.style.borderColor = "#afafaf"

                tab.dataset.tabStatus = "inactive";
                fillMenu()
            }
        }


    })
})
// const vegFilter = ()=>{

//     let vegData = [];
//     let vegCategories = []
//     menuWrapCon.innerHTML = '';
//     finalData.menuData.menu.forEach(elem =>{

//         if(elem.type == "Veg"){
//            vegData.push(elem)
//         }
        
        
        
        
        




//     })
//     vegData.forEach(elem =>{
//         if(!vegCategories.includes(elem.category)){
//             vegCategories.push(elem.category)
//         }
//     })
//     vegCategories.forEach((element,index )=>{

//         let containerData = `<div class="specify-div" >
//             <button class="specify-head"  data-tab-target="${element}" data-tab-status="open">${element} (3) <i class="bi bi-caret-down-fill"></i></button>
//             <div class="menu-inner-wrap-con menu-inner-wrap-con${index}" id="${element}" data-tab-content="${element}">
//             </div>
//             </div>
//             `
//                menuWrapCon.innerHTML += containerData; 
               
//         vegData.forEach(elem=>{

//             const containerDiv = document.querySelector(`.menu-inner-wrap-con${index}`);

            
//             if(element == elem.category){
//                   let typeData;
//                if(elem.type == "Non-Veg"){
//                    typeData = `<img src="https://img.icons8.com/fluency/50/000000/non-vegetarian-food-symbol.png" alt="">`
//                }else{
//                    typeData = `<img src="https://img.icons8.com/fluency/50/000000/non-vegetarian-food-symbol.png" alt="">`
//                } 
//                 let htmlData = `<div class="menu-item" >
//                 <div class="item-wrap-con">
//                 <div class="img-wrap-con">
//                         <div class="img-div">
//                 <img src="/uploads/${elem.cuisineImg}" alt="" srcset="">

//                 </div>
//                 </div>
                
//                 <div class="item-details-div">
//                     ${typeData}
//                     <span class="item-name">${elem.cuisinename}</span>
//                     <span class="item-price ">₹${elem.price}</span>

                    

//                 </div>
//                 <div class="add-to-cart-div">
//                     <button class="add-to-cart" onclick="addToCart('${elem._id}')">Add <i class="bi bi-plus"></i></button>
                    
//                 </div>
//                 </div>
                
           
//             <div class="quantity-wrap-div">
//                         <div class="quantity-div">
//                                 <input type="radio" name="quantity1">
//                                 <label for="quantity1">1/2 Plate</label>
//                         </div>
//                         <div class="quantity-div">
//                                 <input type="radio" name="quantity1">
//                                 <label for="quantity1">1 Plate</label>
//                         </div>

//                     </div>
//                      <hr>

//             </div>`
//             containerDiv.innerHTML += htmlData

//             }   
//         })
//     })

// }
















// const cartCon = document.querySelector('.cart-con');
// const foodItemHolder = document.querySelector('.food-items-holder');

// const emptyCart = document.querySelector('.empty-cart')

// const displayCart = async()=>{

//     try {
      
//         const id = window.location.href.substring(window.location.href.indexOf('/nfc') + 1).split(['/'])[1];

//     let arr = JSON.parse(localStorage.getItem(id)) || []
    
//     let cart = [];
//     const menuData = await fetch(`/menuData/${id}`,{
//         method : "GET",
       
//     })
//     let dataMenu = await menuData.json();
//     arr.forEach(elem => {
//         for(var i = 0; i < dataMenu.menuData.menu.length; i ++){
            
            
            
            
//             if(elem ==  dataMenu.menuData.menu[i]._id.valueOf()){
               
                
//                 if(cart.includes(dataMenu.menuData.menu[i])){
                    
//                   let elemIndex = cart.indexOf(dataMenu.menuData.menu[i])
//                    cart[elemIndex]["quantityuser"] += 1;
//                 }else{      
                   
//                     cart.push(dataMenu.menuData.menu[i]);
//                     let elemIndex = cart.indexOf(dataMenu.menuData.menu[i])
//                     cart[elemIndex]["quantityuser"] = 1;
//                      break;
//                 }
               
//             }
//         }


//     });



   
   
//         try {
//             const remEl = document.querySelectorAll('.food-list-con')
//             console.log(remEl);
//             remEl.forEach(elem =>{
//                 console.log(elem);
//                 elem.remove()
//             })
//         } catch (error) {
            
//         }
    

    

//         if(cart.length < 1){
            
//             emptyCart.classList.add("active");
//             document.querySelector('.cart-absolute-div').style.display = "none"
//             document.querySelector('.categories-btn').style.bottom = "2rem"


//         }else{
//             emptyCart.classList.remove("active");
//             document.querySelector('.cart-absolute-div').style.display = "flex"
//             document.querySelector('.categories-btn').style.bottom = "14rem"


//         }

//         let subTotal = 0;
//         let grandTotal = 0;
//         let tax = 0;

        
//         const cartCon = document.querySelector('.total-div');
//         cart.forEach(elem =>{
            
//             let catData;
//         if(elem.category == "Veg"){

//             catData = `<img loading="lazy" src="https://img.icons8.com/fluency/48/000000/vegetarian-food-symbol.png"/>`
            
//         }else{
//             catData = `<img loading="lazy" src="https://img.icons8.com/fluency/50/000000/non-vegetarian-food-symbol.png"/>`
//         }


//             let htmlData = `<div class="food-list-con">
//             <div class="food-item">
//             <div class="food-img-con">
//             <img src="/images/biryani.jpg"></img>
//             </div>
            
//               <div class="left-con">
//                 <div class="food-food-price-con">
//                   <h4>${elem.cuisinename}</h4>
//                   <h4 class="">₹ ${elem.price}</h4>
//                ${catData}

//                 </div>
//               </div>
//               <div class="right-con">
//                  <div class="number-input">
               
//                <button class="minus" onclick="this.parentNode.querySelector('input[type=number]').stepDown(); removeFromCart('${elem._id}')"><i class="bi bi-dash"></i></button>
//                <input class="quantity" min="1" max="15" name="food-quantity" value="${elem.quantityuser}" type="number" required>
//                <button onclick="this.parentNode.querySelector('input[type=number]').stepUp(); addToCart('${elem._id}')" class="plus"><i class="bi bi-plus"></i></button>
//                </div>
//                <h4 class="food-total-price ">₹ ${elem.price * elem.quantityuser}</h4>
//               </div>
        
//             </div>
//           </div>`
//           subTotal = parseFloat(subTotal)
//           subTotal +=  parseFloat(`${elem.price * elem.quantityuser}`);
//           subTotal = parseFloat(subTotal).toFixed(2)
          
          
          
//           foodItemHolder.insertAdjacentHTML('afterbegin', htmlData)
//         })
//         tax = ((parseFloat(subTotal) * 18) / 100).toFixed(2)


        
//         grandTotal = (parseFloat(subTotal) + parseFloat(tax)).toFixed(2);

//          document.querySelector('.sub-total-text').textContent = "₹ " + subTotal;
//             document.querySelector('.tax-text').textContent = "₹ " + tax ;
//          document.querySelector('.grand-total-text').textContent = "₹ " + grandTotal;
//          document.querySelector('.grand-total-abs').textContent = "₹ " + grandTotal;
//          document.querySelector('.item-count-abs').textContent =   `${cart.length} ${ cart.length > 1 ? "ITEMS" : "ITEM"}`;




//     } catch (error) {
//         console.log(error);
//     }
    

   
// }
// const addToCart = async(i)=>{
//     try {

//       let id = window.location.href.substring(window.location.href.indexOf('/nfc') + 1).split(['/'])[1];
//     let arr = JSON.parse(localStorage.getItem(id)) || []
    
//     arr.push(i)
    
//     localStorage.setItem(id, JSON.stringify(arr));

//     displayCart()
        
//     } catch (error) {
//         console.log("errrrrr hereee");
//     }
    
    
 
// }





// const removeFromCart = async(i)=>{
   
//     let id = window.location.href.substring(window.location.href.indexOf('/nfc') + 1).split(['/'])[1];
    
//     const arr = JSON.parse(localStorage.getItem(id))
   
//     for(var j = 0; j < arr.length; j++){
//         if(arr[j] == i){
//             arr.splice(j,1)
//             break ;
//         }
//     }

//     localStorage.setItem(id, JSON.stringify(arr));

//     displayCart()

    
// }   


// const pushOrder = async()=>{
    
// }

var toastHTMLElement = document.querySelector('.toast')
const favBtnPCon = document.querySelector('.fav-button-con');



const addFav = async (target)=>{
    const addToFav = await fetch(`../addToFavourites`,{
            method: "POST"
    })


    if(await addToFav.json()){


        target.remove();
        let data = `<button class="fav-button" onclick="removeFav(this)" style="color: #FF4033;" ><i class="fas fa-heart"></i></button>`
        favBtnPCon.insertAdjacentHTML('afterbegin', data);
    
            toastHTMLElement.childNodes[0].innerHTML = `<i class="fas fa-heart text-white"></i>Added to favourites`;
             var toastElement = new bootstrap.Toast(toastHTMLElement)
           toastElement.show();
        
       
           


}

    
}

const removeFav = async (target)=>{
    const removeFromFav = await fetch(`../removeFromFavourites`,{
        method: "POST"
})  

   
    if(await removeFromFav.json()){
            target.remove();
            let data = `<button class="fav-button" onclick="addFav(this)" style="color: #333;"><i class="fas fa-heart"></i></button>`
            favBtnPCon.insertAdjacentHTML('afterbegin', data);

            toastHTMLElement.childNodes[0].innerHTML = `<i class="fas fa-heart text-white"></i>Removed from favourites`;
             var toastElement = new bootstrap.Toast(toastHTMLElement)
           toastElement.show();

            
                
    }

}
const tlN = new TimelineLite();
document.querySelector('.cart-absolute-div').addEventListener('click', ()=>{
    openCartMobile();
})
const openCartMobile = ()=>{

    const tabContainer = document.querySelector('.content-side-section-cart');
    document.body.classList.add('ovf');
    tlN.to(tabContainer, 1, {opacity: 1,
        display : "flex",
        top : window.scrollY,
        ease : Power2.easeinout      
   });
    
   
   

}
function closeCartMobile (){
    const tabContainer = document.querySelector('.content-side-section-cart');
    document.body.classList.remove('ovf');
    tlN.to(tabContainer, 1, {opacity: 0,
        display : "none",
        top : "100%",
        ease : Power2.easeinout      
   });

}
document.querySelector('.fa-angle-left').addEventListener('click', ()=>{
    const tabContainer = document.querySelector('.content-side-section-cart');
    document.body.classList.remove('ovf');
    tlN.to(tabContainer, 1, {opacity: 0,
        display : "none",
        top : "100%",
        ease : Power2.easeinout      
   });
})

// let preCookId = window.location.href.substring(window.location.href.indexOf('/nfc') + 1).split(['/'])[1];
// const callF = ()=>{
//     if(localStorage.getItem(preCookId)){
//         displayCart()
       
//     }
// }
// callF()

// displayCart()

// displayCart()