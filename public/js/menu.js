
const menuWrapConE = document.querySelector('.menu-wrap-con');




// const id = window.location.href.substring(window.location.href.indexOf('/restaurants') + 1).split(['/'])[1].split(['?'])[0]
// console.log(id);

// let finalData;

// let categories = [];
// let a = 0;
const fillMenuE = ()=>{
   console.log(finalData);
   
    menuWrapConE.innerHTML = ''
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
        document.querySelector('.catUl').innerHTML += `<li id="${element}">${element} (${a})</li>`
        let containerData = `<div class="specify-div" >
            <button class="specify-head"  data-tab-target="${element}" data-tab-status="open">${element} (${a}) <i class="bi bi-caret-down-fill"></i></button>
            <div class="menu-inner-wrap-con menu-inner-wrap-con${index}" id="${element}" data-tab-content="${element}" style="display : flex;"></div>
            </div>
            `
               menuWrapConE.innerHTML += containerData; 
               
        finalData.menuData.menu.forEach(elem=>{

            const containerDiv = menuWrapConE.querySelector(`.menu-inner-wrap-con${index}`);

            
            if(element == elem.category){
                  let typeData;
                  let quantityData = '';
               if(elem.type == "Non-Veg"){
                   typeData = `<img src="https://img.icons8.com/fluency/50/000000/non-vegetarian-food-symbol.png" alt="">`
               }else{
                   typeData = `<img src="https://img.icons8.com/fluency/50/000000/non-vegetarian-food-symbol.png" alt="">`
               } 

               
            //    elem.quantityDetails.forEach((element , index)=>{

            //     if(index == 0){
            //         quantityData += `<div class="quantity-div">
            //     <input type="radio" name="${elem._id}" value='${element.quantity} ${element.quantityUnit}' data-tab-id=${elem._id} data-tab-price=${element.price} onchange="changeBtn(this)" checked>
            //     <label for="quantity1">${element.quantity} ${element.quantityUnit}</label>
            //     </div>`
            //     }else{
            //         quantityData += `<div class="quantity-div">
            //     <input type="radio" name="${elem._id}" value='${element.quantity} ${element.quantityUnit}' data-tab-id=${elem._id} data-tab-price=${element.price} onchange="changeBtn(this)">
            //     <label for="quantity1">${element.quantity} ${element.quantityUnit}</label>
            //     </div>`
            //     }
                

            // })
            let arr = JSON.parse(localStorage.getItem(id)) || []
            // console.log(arr);
            // let btn;
            // if(arr.length < 1){
            //     btn = `<button class="add-to-cart" id="${elem._id}" data-tab-target="addToCart">Add <i class="bi bi-plus"></i></button>`
            // }
            //     for(let [index,i] of arr.entries()){
            //         let quantity = `${elem.quantityDetails[0].quantity} ${elem.quantityDetails[0].quantityUnit}`
            //         console.log(quantity);
            //         if(i.foodId == elem._id){

            //             if(i.foodQuantity == quantity){
            //                 btn = `<div class="btn-con">
            //                 <button ><span><i class="bi bi-dash" onclick="removeFromCart('${i.foodId}' , '${i.foodQuantity}' , this);"></i></span></button>
            //                 <input class="quantity ${i.foodId}" min="1" max="15" name="food-quantity" value="${i.cartQuantity}" type="number"  data-id="${i.foodId}">
            //                 <button ><span><i class="bi bi-plus" id="${i.foodId}" data-tab-target="addToCart" ></i></span></button>
            //                 </div>`
            //                 break;
            //             }

            //         }else{
                        
            //             if(index == arr.length - 1){
            //                 btn = `<button class="add-to-cart" id="${elem._id}" data-tab-target="addToCart">Add <i class="bi bi-plus"></i></button>`
            //             }
            //         }
            //     } 
               
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
                 
                    
                </div>
                </div>
                
           
           
                     <hr>

            </div>`

            containerDiv.innerHTML += htmlData
            
       

            }   
        })

        a = 0;
    })

    console.log(menuWrapConE);
    
}
// const menuWra = document.querySelectorAll('.menu-wrap-con');
// menuWra.forEach(elem => {

// })

const menuDataFetchE = async()=>{

    const menuData = await fetch(`/menuData/${id}`,{
        method : "GET",
       
    })


    let data = await menuData.json();
    finalData = data;
    console.log(finalData);
    fillMenuE()
    

    

    
}
menuDataFetchE()

const filterTabsE = menuWrapConE.closest('.menu-items').querySelectorAll('[data-tab-category]');
filterTabsE.forEach(tab =>{
    tab.addEventListener('click', ()=>{
        a = 0;
 

        if(tab.dataset.tabCategory == "Veg"){

            if(tab.dataset.tabStatus == "inactive"){
                document.querySelector('.catUl').innerHTML = ''
                let vegData = [];
                let vegCategories = []
                menuWrapConE.innerHTML = '';
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
                    document.querySelector('.catUl').innerHTML += `<li id="${element}">${element} (${a})</li>`
                    let containerData = `<div class="specify-div" >
                        <button class="specify-head"  data-tab-target="${element}" data-tab-status="open">${element} (${a}) <i class="bi bi-caret-down-fill"></i></button>
                        <div class="menu-inner-wrap-con menu-inner-wrap-con${index}" id="${element}" data-tab-content="${element}" style="display : flex;">
                        </div>
                        </div>
                        `
                           menuWrapConE.innerHTML += containerData; 
                           
                    vegData.forEach(elem=>{
            
                        const containerDiv = menuWrapConE.querySelector(`.menu-inner-wrap-con${index}`);
            
                        
                        if(element == elem.category){
                              let typeData;
                  let quantityData;

                           if(elem.type == "Non-Veg"){
                               typeData = `<img src="https://img.icons8.com/fluency/50/000000/non-vegetarian-food-symbol.png" alt="">`
                           }else{
                               typeData = `<img src="https://img.icons8.com/fluency/50/000000/non-vegetarian-food-symbol.png" alt="">`
                           } 

                        //    elem.quantityDetails.forEach((element , index)=>{
                        //     if(index == 0){
                        //         quantityData += `<div class="quantity-div">
                        //         <input type="radio" name="${elem._id}" value='${element.quantity} ${element.quantityUnit}' data-tab-id=${elem._id}  data-tab-price=${element.price} onchange="changeBtn(this)" checked>
                        //         <label for="quantity1">${element.quantity} ${element.quantityUnit}</label>
                        //         </div>`
                        //     }else{
                        //         quantityData += `<div class="quantity-div">
                        //         <input type="radio" name="${elem._id}" value='${element.quantity} ${element.quantityUnit}' data-tab-id=${elem._id}  data-tab-price=${element.price} onchange="changeBtn(this)">
                        //         <label for="quantity1">${element.quantity} ${element.quantityUnit}</label>
                        //         </div>`
                        //     }
                           
            
                        // })
                            
                        let arr = JSON.parse(localStorage.getItem(id)) || []
                        // let btn;
                        // for(let [index,i] of arr.entries()){
                        //     let quantity = `${elem.quantityDetails[0].quantity} ${elem.quantityDetails[0].quantityUnit}`
                        //     console.log(quantity);
                        //     if(i.foodId == elem._id){
        
                        //         if(i.foodQuantity == quantity){
                        //             btn = `<div class="btn-con">
                        //             <button ><span><i class="bi bi-dash" onclick="removeFromCart('${i.foodId}' , '${i.foodQuantity}' , this);"></i></span></button>
                        //             <input class="quantity ${i.foodId}" min="1" max="15" name="food-quantity" value="${i.cartQuantity}" type="number"  data-id="${i.foodId}">
                        //             <button ><span><i class="bi bi-plus" id="${i.foodId}" data-tab-target="addToCart" ></i></span></button>
                        //             </div>`
                        //             break;
                        //         }
        
                        //     }else{
                                
                        //         if(index == arr.length - 1){
                        //             btn = `<button class="add-to-cart" id="${elem._id}" data-tab-target="addToCart">Add <i class="bi bi-plus"></i></button>`
                        //         }
                        //     }
                        // }  

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
                              
                                
                            </div>
                            </div>
                            
                       
                        
                                 <hr>
            
                        </div>`
                        containerDiv.innerHTML += htmlData
                    
            
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
                fillMenuE()
            }   
        }else if(tab.dataset.tabCategory == "Non-Veg"){
            if(tab.dataset.tabStatus == "inactive"){

                document.querySelector('.catUl').innerHTML = ''
                let vegData = [];
                let vegCategories = []
                menuWrapConE.innerHTML = '';
                finalData.menuData.menu.forEach(elem =>{
            
                    if(elem.type == "Non-Veg"){
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
                    document.querySelector('.catUl').innerHTML += `<li id="${element}">${element} (${a})</li>`
                    let containerData = `<div class="specify-div" >
                        <button class="specify-head"  data-tab-target="${element}" data-tab-status="open">${element} (${a}) <i class="bi bi-caret-down-fill"></i></button>
                        <div class="menu-inner-wrap-con menu-inner-wrap-con${index}" id="${element}" data-tab-content="${element}" style="display : flex;">
                        </div>
                        </div>
                        `
                           menuWrapConE.innerHTML += containerData; 
                           
                    vegData.forEach(elem=>{
            
                        const containerDiv = menuWrapConE.querySelector(`.menu-inner-wrap-con${index}`);
            
                        
                        if(element == elem.category){
                              let typeData;
                  let quantityData;

                           if(elem.type == "Non-Veg"){
                               typeData = `<img src="https://img.icons8.com/fluency/50/000000/non-vegetarian-food-symbol.png" alt="">`
                           }else{
                               typeData = `<img src="https://img.icons8.com/fluency/50/000000/non-vegetarian-food-symbol.png" alt="">`
                           } 

                           
                        let arr = JSON.parse(localStorage.getItem(id)) || []
                        // let btn;
                        // for(let [index,i] of arr.entries()){
                        //     let quantity = `${elem.quantityDetails[0].quantity} ${elem.quantityDetails[0].quantityUnit}`
                        //     console.log(quantity);
                        //     if(i.foodId == elem._id){
        
                        //         if(i.foodQuantity == quantity){
                        //             btn = `<div class="btn-con">
                        //             <button ><span><i class="bi bi-dash" onclick="removeFromCart('${i.foodId}' , '${i.foodQuantity}' , this);"></i></span></button>
                        //             <input class="quantity ${i.foodId}" min="1" max="15" name="food-quantity" value="${i.cartQuantity}" type="number"  data-id="${i.foodId}">
                        //             <button ><span><i class="bi bi-plus" id="${i.foodId}" data-tab-target="addToCart" ></i></span></button>
                        //             </div>`
                        //             break;
                        //         }
        
                        //     }else{
                                
                        //         if(index == arr.length - 1){
                        //             btn = `<button class="add-to-cart" id="${elem._id}" data-tab-target="addToCart">Add <i class="bi bi-plus"></i></button>`
                        //         }
                        //     }
                        // } 
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
                               
                                
                            </div>
                            </div>
                            
                       
                        
                                 <hr>
            
                        </div>`
                        containerDiv.innerHTML += htmlData
                       
            
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
                fillMenuE()
            }
        }


    })
})