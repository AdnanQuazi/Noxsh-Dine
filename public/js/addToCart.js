const parentBtn = document.querySelector('.menu-wrap-con');

let Resid = window.location.href.substring(21).split(['/'])[2];



//DISPLAY CART
const cartCon = document.querySelector('.cart-con');
const foodItemHolder = document.querySelector('.food-items-holder');

const emptyCart = document.querySelector('.empty-cart')

const displayCart = async()=>{

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
                       
                       <button class="minus" onclick="this.parentNode.querySelector('input[type=number]').stepDown(); removeFromCart('${elem._id}')"><i class="bi bi-dash"></i></button>
                       <input class="quantity" min="1" max="15" name="food-quantity" value=${element.cartQuantity} type="number" required>
                       <button onclick="this.parentNode.querySelector('input[type=number]').stepUp(); addToCart('${elem._id}')" class="plus"><i class="bi bi-plus"></i></button>
                       </div>
                       <h4 class="food-total-price ">₹ ${currentPrice * element.cartQuantity}</h4>
                      </div>
                
                    </div>
                  </div>`
                  foodItemHolder.insertAdjacentHTML('afterbegin', htmlData)
                  subTotal = parseFloat(subTotal)
                  subTotal +=  parseFloat(`${currentPrice * element.cartQuantity}`);
                  subTotal = parseFloat(subTotal).toFixed(2)
                  
                  
                  console.log(htmlData);
                  console.log(foodItemHolder);
                  
              
            }
        })

        

    });



   
   
        try {
            const remEl = document.querySelectorAll('.food-list-con')
            console.log(remEl);
            remEl.forEach(elem =>{
                console.log(elem);
                elem.remove()
            })
        } catch (error) {
            
        }
    

    

        

        
      
       
        tax = ((parseFloat(subTotal) * 18) / 100).toFixed(2)


        
        grandTotal = (parseFloat(subTotal) + parseFloat(tax)).toFixed(2);
        console.log(subTotal , grandTotal);

         document.querySelector('.sub-total-text').textContent = "₹ " + subTotal;
            document.querySelector('.tax-text').textContent = "₹ " + tax ;
         document.querySelector('.grand-total-text').textContent = "₹ " + grandTotal;
         document.querySelector('.grand-total-abs').textContent = "₹ " + grandTotal;
         document.querySelector('.item-count-abs').textContent =   `${arr.length} ${ arr.length > 1 ? "ITEMS" : "ITEM"}`;




    } catch (error) {
        console.log(error);
    }
    

   
}
























const addToCart = (e)=>{
    let foodId;
    let foodQuantity;       

    foodId = e.id

    try {
    foodQuantity = document.querySelector(`[data-tab-id='${foodId}']:checked`).value;
        
    } catch (error) {
        
        foodQuantity = document.querySelector(`[data-tab-id='${foodId}']`).value;

    }
    
    console.log(foodId , foodQuantity);


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
        return;
        }else{

        arr.forEach((elem , index )=> {
    if(elem.foodId == foodId){

        if(elem.foodQuantity == foodQuantity){



            arr[index].cartQuantity += 1
            localStorage.setItem(Resid, JSON.stringify(arr));
            



        }else{

            currentData = {
                foodId : foodId,
                foodQuantity : foodQuantity,
                cartQuantity : 1
            }
            arr.push(currentData)
            localStorage.setItem(Resid, JSON.stringify(arr));
        }
    }else{

        if(index == arr.length - 1){
            currentData = {
                foodId : foodId,
                foodQuantity : foodQuantity,
                cartQuantity : 1
            }
            arr.push(currentData) 
            localStorage.setItem(Resid, JSON.stringify(arr));
        }


    }
});

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


   



const removeFromCart = (foodId, foodQuantity)=>{
    
    
    
    const arr = JSON.parse(localStorage.getItem(Resid))
   
    for(var j = 0; j < arr.length; j++){
      if(arr[j].foodId == foodId){
          if(arr[j].foodQuantity == foodQuantity){
              arr[j].cartQuantity -= 1

              if(arr[j].cartQuantity == 0){
                  arr.splice(j,1);
              }
          }
      }
    }

    localStorage.setItem(Resid, JSON.stringify(arr));

    displayCart()


}

// const displayCart = async()=>{

//     const arr = JSON.parse(localStorage.getItem(id))



//     const menuData = await fetch(`/menuData/${id}`,{
//         method : "GET",
       
//     })
//     let dataMenu = await menuData.json();
//     console.log(menuData);

// }

displayCart()