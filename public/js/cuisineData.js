const restaurantType= [
    "5 Star",
    "All Day Dining",
    "Buffets",
    "Buffests and Thalis",
    "Cafes",
    "Cafes to Chill",
    "Dessert",
    "Family Dining",
    "Fine Dine",
    "Local Food",
    "Outdoor Seating",
    "Pizza Places",
    "Best Places to Drink",
    "Pure Veg",
    "Quick Bites",
    "Best Luxury Dining",
    "Breakfast",
    "Budget Friendly",
    "Dessert Parlour"
]

const data = [
    "Afghan",
"American",
"Andhra",
"Arabian",
"Asian",
"Assamese",
"Awadhi",
"BBQ",
"Bakery",
"Bar Food",
"Belgian",
"Bengali",
"Beverages",
"Bihari",
"Biryani",
"Brazilian",
"Bubble Tea",
"Burger",
"Burmese",
"Cafe",
"Cantonese",
"Charcoal Chicken",
"Chettinad",
"Chinese",
"Coffee",
"Continental",
"Desserts",
"Ethiopian",
"European",
"Fast Food",
"Finger Food",
"French",
"Frozen Yogurt",
"German",
"Goan",
"Greek",
"Grocery",
"Gujarati",
"Healthy Food",
"Hot Pot",
"Hot dogs",
"Hyderabadi",
"Ice Cream",
"Indonesian",
"Iranian",
"Italian",
"Jamaican",
"Japanese",
"Juices",
"Kashmiri",
"Kebab",
"Kerala",
"Konkan",
"Korean",
"Lebanese",
"Lucknowi",
"Maharashtrian",
"Malaysian",
"Malwani",
"Mangalorean",
"Mediterranean",
"Mexican",
"Middle Eastern",
"Mishti",
"Mithai",
"Modern Indian",
"Momos",
"Mongolian",
"Mughlai",
"Nepalese",
"North Eastern",
"North Indian",
"Odia",
"Oriental",
"Pancake",
"Paan",
"Panini",
"Parsi",
"Pasta",
"Pizza",
"Rajasthani",
"Raw Meats",
"Roast Chicken",
"Rolls",
"Salad",
"Sandwich",
"Saoji",
"Seafood",
"Shake",
"Sindhi",
"Singaporean",
"South American",
"South Indian",
"Sri Lankan",
"Steak",
"Street Food",
"Sushi",
"Tea",
"Tex-Mex",
"Thai",
"Tibetan",
"Turkish",
"Vietnamese",
"Waffle",
"Wraps"
]
const cuisineList = document.querySelector(".cuisine-list")
var url_string = window.location.href;
var url = new URL(url_string);
const arrr = ["cuisine","type","popularity"];
const finalarr = [];
arrr.forEach((elem,index) =>{
    let c = url.searchParams.get(elem);

    
    if(c){
     
        finalarr.push(c)
    }

})


console.log(finalarr);

data.forEach(elem =>{
    let htmlData

   
        if(finalarr.includes(elem)){
            htmlData = `<li class="active-li" onclick="removeFilter(this)" data-tab-target="cuisine" value=${elem}>${elem} <i class="bi bi-x-lg"></i></li>`
    cuisineList.insertAdjacentHTML('afterbegin', htmlData);
           
            }else{
    
            htmlData = `<li onclick="filterRes(this)" data-tab-target="cuisine" value=${elem}>${elem}</li>`
            cuisineList.insertAdjacentHTML('beforeend', htmlData);
    
            }
    

   
  

})


const searchForCuisine = (e)=>{
    let regExp = new RegExp(e.value+'.*','i');
    cuisineList.innerHTML = '';
    data.forEach(elem =>{
        if(regExp.test(elem)){
            
            
                if(finalarr.includes(elem)){
                    htmlData = `<li class="active-li"  onclick="removeFilter(this)" data-tab-target="cuisine" value=${elem}>${elem} <i class="bi bi-x-lg"></i></li>`
    cuisineList.insertAdjacentHTML('afterbegin', htmlData);

                  
                    }else{
            
                        htmlData= `<li onclick="filterRes(this)" data-tab-target="cuisine" value=${elem}>${elem}</li>`

    cuisineList.insertAdjacentHTML('beforeend', htmlData);
                        
                    }
            
        }
    })
}

const restaurantTypeList = document.querySelector(".type-list")
restaurantType.forEach(elem =>{
    let htmlData
    
    
        if(finalarr.includes(elem)){

            htmlData = `<li class="active-li"  onclick="removeFilter(this)" data-tab-target="type" value=${elem}>${elem} <i class="bi bi-x-lg"></i></li>`
    restaurantTypeList.insertAdjacentHTML('afterbegin', htmlData);

            }else{
    
            htmlData = `<li onclick="filterRes(this)" data-tab-target="type" value=${elem}>${elem}</li>`
    restaurantTypeList.insertAdjacentHTML('beforeend', htmlData);
                
            }

})


const searchForRestaurantType = (e)=>{
    let regExp = new RegExp(e.value+'.*','i');
    restaurantTypeList.innerHTML = '';
    restaurantType.forEach(elem =>{
        if(regExp.test(elem)){
            if(finalarr.includes(elem)){
            htmlData = `<li class="active-li"  onclick="removeFilter(this)" data-tab-target="type" value=${elem}>${elem} <i class="bi bi-x-lg"></i></li>`
    restaurantTypeList.insertAdjacentHTML('afterbegin', htmlData);

            }else{
             htmlData = `<li onclick="filterRes(this)" data-tab-target="type" value=${elem}>${elem}</li>`
    restaurantTypeList.insertAdjacentHTML('beforeend', htmlData);

            }  
        }
    })
}
console.log(finalarr);
if(finalarr.includes("Low to High")){
    let htmlData = '<li class="active-li" onclick="removeFilter(this)" data-tab-target="popularity">Rating : Low to High <i class="bi bi-x-lg"></i></li>'
    document.querySelector('.popularity-list').insertAdjacentHTML('afterbegin', htmlData);


}else{
    let htmlData = '<li onclick="ratingLowToHigh(this)" data-tab-target="popularity">Rating : Low to High</li>'
    document.querySelector('.popularity-list').insertAdjacentHTML('afterbegin', htmlData);
}
const filterRes = async(e)=>{
  
       
        url.searchParams.set(e.dataset.tabTarget, e.innerHTML);
        

    window.location.href = url;
       
}
const removeFilter = (e)=>{
    url.searchParams.delete(e.dataset.tabTarget);
    window.location.href = url;

}

const ratingLowToHigh = (e)=>{
    url.searchParams.set(e.dataset.tabTarget,"Low to High");
    window.location.href = url;

}