


const parentBtn = document.querySelector('.menu-wrap-con');
let Resid
try {
    Resid = window.location.href.substring(window.location.href.indexOf('/nfc') + 1).split(['/'])[1].split(['?'])[0];
    if(Resid == ''){
        Resid = window.location.href.substring(window.location.href.indexOf('/restaurants') + 1).split(['/'])[1].split(['?'])[0];  
    }
} catch (error) {
    
}


console.log(Resid)



//DISPLAY CART
const cartCon = document.querySelector('.cart-con');
const foodItemHolder = document.querySelector('.food-items-holder');

const emptyCart = document.querySelector('.empty-cart')
let theGrandTotal;
const displayCart = async()=>{

    try {
        const remEl = document.querySelectorAll('.food-list-con')
        console.log(remEl);
        remEl.forEach(elem =>{
            
            elem.remove()
        })
    } catch (error) {
        
    }


    try {
      
        

    let arr = JSON.parse(localStorage.getItem(Resid)) || []
    
    if(arr.length < 1){
            
        emptyCart.classList.add("active");
        document.querySelector('.cart-absolute-div').style.display = "none"
        document.querySelector('.categories-btn').style.bottom = "2rem"


    }else{
        emptyCart.classList.remove("active");
        document.querySelector('.cart-absolute-div').style.display = "flex"
        document.querySelector('.categories-btn').style.bottom = "14rem"


    }
    const menuData = await fetch(`/menuData/${Resid}`,{
        method : "GET",
       
    })
    let dataMenu = await menuData.json();
    let subTotal = 0;
    let grandTotal = 0;
    let tax = 0;

    arr.forEach((element, index )=> {
        dataMenu.menuData.menu.forEach(elem =>{
            
            

            if(element.foodId == elem._id.valueOf()){

                let catData;
                if(elem.category == "Veg"){
        
                    catData = `<img loading="lazy" src="https://img.icons8.com/fluency/48/000000/vegetarian-food-symbol.png"/>`
                }else{
                    catData = `<img loading="lazy" src="https://img.icons8.com/fluency/50/000000/non-vegetarian-food-symbol.png"/>`

                }
                let priceDat;
                let currentPrice
                elem.quantityDetails.forEach(price =>{
                    let stringP = `${price.quantity} ${price.quantityUnit}`
                      
                    if(element.foodQuantity == stringP){

                        priceDat = ` <h4 class="">₹ ${price.price}</h4>`
                        currentPrice = price.price
                    }
                })
        
        
                    let htmlData = `<div class="food-list-con">
                    <div class="food-item">
                    <div class="food-img-con">
                    <img src="/images/biryani.jpg"></img>
                    </div>
                    
                      <div class="left-con">
                        <div class="food-food-price-con">
                          <h4>${elem.cuisinename}</h4>
                         ${priceDat}
                       ${catData}
        
                        </div>
                      </div>
                      <div class="right-con">
                         <div class="number-input">
                       
                       <button class="minus" onclick="this.parentNode.querySelector('input[type=number]').stepDown(); removeFromCart('${elem._id}' , '${element.foodQuantity}' , this)"><i class="bi bi-dash"></i></button>
                       <input class="quantity" min="1" max="15" name="food-quantity" value=${element.cartQuantity} type="number" required>
                       <button onclick="this.parentNode.querySelector('input[type=number]').stepUp();" class="plus" ><i class="bi bi-plus" data-tab-target="addToCart" id="${elem._id}"></i></button>
                       </div>
                       <h4 class="food-total-price ">₹ ${currentPrice * element.cartQuantity}</h4>
                      </div>
                
                    </div>
                  </div>`
                  
      


                  foodItemHolder.insertAdjacentHTML('afterbegin', htmlData)

                  subTotal = parseFloat(subTotal)
                  subTotal +=  parseFloat(`${currentPrice * element.cartQuantity}`);
                  subTotal = parseFloat(subTotal).toFixed(2)
                  
                  

                  
              
            }
        })

        

    });



   
   
    

        

        
      
       
        tax = ((parseFloat(subTotal) * 18) / 100).toFixed(2)


        
        grandTotal = (parseFloat(subTotal) + parseFloat(tax)).toFixed(2);
        theGrandTotal = grandTotal;
       

         document.querySelector('.sub-total-text').textContent = "₹ " + subTotal;
            document.querySelector('.tax-text').textContent = "₹ " + tax ;
         document.querySelector('.grand-total-text').textContent = "₹ " + grandTotal;
         document.querySelector('.grand-total-abs').textContent = "₹ " + grandTotal;
         document.querySelector('.item-count-abs').textContent =   `${arr.length} ${ arr.length > 1 ? "ITEMS" : "ITEM"}`;




    } catch (error) {
        console.log(error);
    }
    

   
}











menuWrapCon.addEventListener('click', (e)=>{
   
    if(e.target.dataset.tabTarget == "addToCart"){
      
        addToCart(e.target)
    }

   
})

document.querySelector('.food-items-holder').addEventListener('click', (e)=>{
    console.log(e.target);
    if(e.target.dataset.tabTarget == "addToCart"){
        addToCart(e.target)
    }
})







const changeBtn = (e)=>{

    let arr = JSON.parse(localStorage.getItem(Resid)) || []

        let parentDiv = e.closest('.menu-item');
    let addToCartDiv = parentDiv.querySelector('.add-to-cart-div');
    if(arr.length < 1){

    }else{

        for(let [index,elem] of arr.entries()){
            if(elem.foodId == e.name){
                
                if(elem.foodQuantity == e.value){
                       
                    let btn = ` <div class="btn-con">
                    <button ><span><i class="bi bi-dash" onclick="removeFromCart('${elem.foodId}' , '${e.value}' , this);"></i></span></button>
                    <input class="quantity ${elem.foodId}" min="1" max="15" name="food-quantity" value=${elem.cartQuantity} type="number"  data-id="${elem.foodId}">
                    <button ><span><i class="bi bi-plus" id="${elem.foodId}" data-tab-target="addToCart" ></i></span></button>
                </div>`
                addToCartDiv.innerHTML = ''
                addToCartDiv.insertAdjacentHTML('afterbegin', btn)
                break;
                }
            }else{
                let btn = `<button class="add-to-cart" id="${e.name}" data-tab-target="addToCart">Add <i class="bi bi-plus"></i></button>`
                addToCartDiv.innerHTML = ''
                addToCartDiv.insertAdjacentHTML('afterbegin', btn)

            }
        }

    }
}


// const addCount = (e)=>{

//     const pCon = e.closest('.btn-con');
//     pCon.querySelector('input').value = parseInt(pCon.querySelector('input').value) + 1;
// }
// const subCount = (e)=>{

//     const pCon = e.closest('.btn-con');
//     pCon.querySelector('input').value = parseInt(pCon.querySelector('input').value) - 1;
// }
const addToCart = (e)=>{
    
    let foodId;
    let foodQuantity;
   

    foodId = e.id
    console.log(e);
    console.log(e.id);
    try{
      
    }catch (error){
        console.log(error)
    }
    try {
    foodQuantity = document.querySelector(`[data-tab-id='${foodId}']:checked`).value;
        
    } catch (error) {
        document.querySelector(`[data-tab-id='${foodId}']`).checked = true;
        foodQuantity = document.querySelector(`[data-tab-id='${foodId}']`).value;

    }
    
    
    try{
        // const pCon = e.closest('.menu-item');
        
        document.querySelector(`[data-id='${foodId}']`).value = parseInt(document.querySelector(`[data-id='${foodId}']`).value) + 1;
    }catch {
       
    }
    

    let arr = JSON.parse(localStorage.getItem(Resid)) || []
                
    let currentData = {};


        if(arr.length < 1){

        currentData = {
            foodId : foodId,
            foodQuantity : foodQuantity,
            cartQuantity : 1
        }

        arr.push(currentData) 
        localStorage.setItem(Resid, JSON.stringify(arr));
        console.log('First');
        try {
            let parentDiv = e.closest('.menu-item');
            let addToCartDiv = parentDiv.querySelector('.add-to-cart-div');
            let btn = ` <div class="btn-con">
                    <button ><span><i class="bi bi-dash" onclick="removeFromCart('${foodId}' , '${foodQuantity}' , this);"></i></span></button>
                    <input class="quantity ${foodId}" min="1" max="15" name="food-quantity" value="1" type="number"  data-id="${foodId}">
                    <button ><span><i class="bi bi-plus" id="${foodId}" data-tab-target="addToCart" ></i></span></button>
                </div>`
                addToCartDiv.innerHTML = ''
                addToCartDiv.insertAdjacentHTML('afterbegin', btn)

        } catch (error) {
            
        }
        
        displayCart()
        return;
        }else{

            for(let [index,elem] of arr.entries()){
                if(elem.foodId == foodId){
              
                    if(elem.foodQuantity == foodQuantity){
            
            
            
                        arr[index].cartQuantity += 1
                        localStorage.setItem(Resid, JSON.stringify(arr));
                       
                        
                        break;
                        
            
            
            
                    }else{
            
                        currentData = {
                            foodId : foodId,
                            foodQuantity : foodQuantity,
                            cartQuantity : 1
                        }
                        arr.push(currentData)
                        console.log('Second');
                        localStorage.setItem(Resid, JSON.stringify(arr));
                        try {
                            let parentDiv = e.closest('.menu-item');
                            let addToCartDiv = parentDiv.querySelector('.add-to-cart-div');
                            let btn = ` <div class="btn-con">
                                    <button ><span><i class="bi bi-dash" onclick="removeFromCart('${foodId}' , '${foodQuantity}' , this);"></i></span></button>
                                    <input class="quantity ${foodId}" min="1" max="15" name="food-quantity" value="1" type="number"  data-id="${foodId}">
                                    <button ><span><i class="bi bi-plus" id="${foodId}" data-tab-target="addToCart" ></i></span></button>
                                </div>`
                                addToCartDiv.innerHTML = ''
                                addToCartDiv.insertAdjacentHTML('afterbegin', btn)
                
                        } catch (error) {
                            
                        }
                        break;
                    }
                }else{
            
                    if(index == arr.length - 1){
                        currentData = {
                            foodId : foodId,
                            foodQuantity : foodQuantity,
                            cartQuantity : 1
                        }
                        arr.push(currentData) 
                        console.log(index , elem.foodId , foodId);
                        localStorage.setItem(Resid, JSON.stringify(arr));
                        try {
                            let parentDiv = e.closest('.menu-item');
                            let addToCartDiv = parentDiv.querySelector('.add-to-cart-div');
                            let btn = ` <div class="btn-con">
                                    <button ><span><i class="bi bi-dash" onclick="removeFromCart('${foodId}' , '${foodQuantity}' , this);"></i></span></button>
                                    <input class="quantity ${foodId}" min="1" max="15" name="food-quantity" value="1" type="number"  data-id="${foodId}">
                                    <button ><span><i class="bi bi-plus" id="${foodId}" data-tab-target="addToCart" ></i></span></button>
                                </div>`
                                addToCartDiv.innerHTML = ''
                                addToCartDiv.insertAdjacentHTML('afterbegin', btn)
                
                        } catch (error) {
                            
                        }
                        break;
                    }
            
            
                }

            }
       

}


displayCart()

}

// parentBtn.addEventListener('click', (e)=>{

//     if(e.target.classList.contains('add-to-cart')){
        

// const cartBtn = document.querySelectorAll('.add-to-cart');

//         cartBtn.forEach(btn =>{

//             btn.addEventListener('click', (e)=>{
                
        
                
                
//             })


        
//         })
        
              
//     }
// })


   



const removeFromCart = (foodId, foodQuantity, e)=>{
    
    

    const arr = JSON.parse(localStorage.getItem(Resid))
    try {
        document.querySelector(`[data-id='${foodId}']`).value = parseInt(document.querySelector(`[data-id='${foodId}']`).value) - 1;
    } catch (error) {
        
    }
    
   
    for(var j = 0; j < arr.length; j++){
      if(arr[j].foodId == foodId){
          if(arr[j].foodQuantity == foodQuantity){
              arr[j].cartQuantity -= 1

              if(arr[j].cartQuantity == 0){
                  arr.splice(j,1);
                  try {
            
                    let parentDiv = document.querySelector(`[data-id='${foodId}']`).closest('.menu-item');
                    console.log(parentDiv);
                    let addToCartDiv = parentDiv.querySelector('.add-to-cart-div');
                    let btn = `<button class="add-to-cart" id="${foodId}" data-tab-target="addToCart">Add <i class="bi bi-plus"></i></button>`
                        addToCartDiv.innerHTML = ''
                        addToCartDiv.insertAdjacentHTML('afterbegin', btn)
        
                } catch (error) {
                    
                }
              }
          }
      }
    }
   

    localStorage.setItem(Resid, JSON.stringify(arr));
    if(arr.length < 1){
       
    }
    displayCart()


}


displayCart()



