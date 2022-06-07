

// Returns a Bootstrap toast instance
   
   let gallerySlide;
const id = window.location.href.substring(window.location.href.indexOf('/restaurant') + 1).split(['/'])[1];

function haversine(lat1, lon1, lat2, lon2)
{
    // distance between latitudes
    // and longitudes
    let dLat = (lat2 - lat1) * Math.PI / 180.0;
    let dLon = (lon2 - lon1) * Math.PI / 180.0;
       
    // convert to radiansa
    lat1 = (lat1) * Math.PI / 180.0;
    lat2 = (lat2) * Math.PI / 180.0;
     
    // apply formulae
    let a = Math.pow(Math.sin(dLat / 2), 2) +
               Math.pow(Math.sin(dLon / 2), 2) *
               Math.cos(lat1) *
               Math.cos(lat2);
    let rad = 6371;
    let c = 2 * Math.asin(Math.sqrt(a));

    let result = rad * c;
    return result.toFixed(1);
     
}

const fetcha =  async (id)=>{


    const restaurantData = await fetch(`/restaurants/${id}/renderRestaurants`,{

        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        
    
      
    });
    const finalData = await restaurantData.json();
    console.log(finalData);

    //NAME
    const restname = document.querySelector('.restaurant-name');
    restname.innerHTML = finalData.restaurant[0].restaurantname;

    //CUISINE
    // const cuisinesname = document.querySelector('.cuisine-name');
    // for(var i = 0; i <= finalData.restaurant[0].cuisines.length - 1; i++){
    //     cuisinesname.innerHTML += finalData.restaurant[0].cuisines[i] + ", "
    // }

    //ADDRESS
    const address = document.querySelector('.address');
    address.innerHTML = finalData.restaurant[0].address 


    //DISTANCE
    const distanceD = document.querySelector('.distance');
    let distance = haversine(localStorage.getItem('clientLatitude'),localStorage.getItem('clientLongitude'),finalData.restaurant[0].location.coordinates[0],finalData.restaurant[0].location.coordinates[1]);
    if(distance < 1.0){
        distance = distance * 1000 + " m";
   }else{

        distance = distance + " km";
   }

   distanceD.innerHTML = distance


   //OPEN STATUS
   const today = new Date();
   const openStatus = document.querySelector('.open-status');
        const currentTime = today.getHours() + (today.getMinutes() / 100);
     
                if(currentTime >finalData.restaurant[0].workingHours.hours[0] && currentTime < finalData.restaurant[0].workingHours.hours[1]){
                            openStatus.innerHTML = `<i class="bi bi-circle-fill"></i>Now Open`
                            openStatus.style.color = '#3ab757'
                        }else{
                            openStatus.innerHTML = `<i class="bi bi-circle-fill"></i>Now Closed`
                            openStatus.style.color = '#dc3545'
                        }

          //CURRENT STATUS

          const currentStatus = finalData.restaurant[0].currentStatus.status;
          const currentStatusTime = finalData.restaurant[0].currentStatus.opensOn;

          if(currentStatus == 'closed'){
            openStatus.innerHTML = `<i class="bi bi-circle-fill"></i>Closed till ${currentStatusTime}`
            openStatus.style.color = '#dc3545'
          }


    //RATING
    const ratingD = document.querySelector('.res-rating');
    ratingD.innerHTML = `${finalData.restaurant[0].averageRating} <i class="fas fa-star"></i>`
    if(finalData.restaurant[0].averageRating >= 4.5){
        ratingD.style.backgroundColor = "rgb(38, 126, 62)"
    }else if(finalData.restaurant[0].averageRating >= 4){
        ratingD.style.backgroundColor = "rgb(36, 150, 63)"
    }else if(finalData.restaurant[0].averageRating >= 3){
        ratingD.style.backgroundColor= "#3ab757"
    }else if(finalData.restaurant[0].averageRating >= 2){
        ratingD.style.backgroundColor= "#ffe234"
    }else{
        ratingD.style.backgroundColor= "#ffa5a5"
    }


    //FAVOURITES
    const favBtnPCon = document.querySelector('.fav-button-con');
    
    if(finalData.userDB && finalData.userDB.length == 1){
        
        
                
            let data = `<button class="fav-button" onclick="removeFav(this)" style="color: #FF4033;" ><i class="fas fa-heart"></i></button>`
            favBtnPCon.insertAdjacentHTML('afterbegin', data);
    
        
    }else{
        
        let data = `<button class="fav-button" onclick="addFav(this)" style="color: #333;"><i class="fas fa-heart"></i></button>`
        favBtnPCon.insertAdjacentHTML('afterbegin', data);
    }
    
        
    favBtnPCon.insertAdjacentHTML('beforeend', `<button class="dir-button" onclick=window.open("https://www.google.com/maps/dir//${finalData.restaurant[0].location.coordinates[0]},${finalData.restaurant[0].location.coordinates[1]}/@${finalData.restaurant[0].location.coordinates[0]},${finalData.restaurant[0].location.coordinates[1]}","_blank")><i class="bi bi-map-fill"></i> Get directions</button>`)


    //OVERVIEW MENU IMAGE
    
    const overMenuPCon = document.querySelector('.overview-menu-img-con');
    // const imgs = finalData.restaurant[0].menuimgs

    // imgs.forEach(element => {
    //    const data = `<div class="restaurant-menu-img" style="background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9)), url(/uploads/${element.img});">
    //     <h3>Browse Menu</h3>
    // </div>`
    //     overMenuPCon.insertAdjacentHTML('beforeend', data);
        
    // });
   

    //FACILITIES
    const overFacilitiesPCon = document.querySelector('.overview-facilities-con');
    const facilitiesList = finalData.restaurant[0].facilities

    facilitiesList.forEach(elem =>{
        let data;

        if(elem == "Noxsh Pay"){
            data = `<span><i class="bi bi-check-circle-fill"  style="color:#D4AF37;"></i>${elem}</span>`
        }else{
            data = `<span><i class="bi bi-check-circle-fill"></i>${elem}</span>`
        }
        
        overFacilitiesPCon.insertAdjacentHTML('beforeend', data);

    })

    //CUISINES
    const overCuisinesPCon = document.querySelector('.overview-cuisines');
    const cuisinesList = finalData.restaurant[0].cuisines

    cuisinesList.forEach(elem =>{
        let data = `<h3><i class="bi bi-check-circle-fill"></i>${elem}</h3>`

        overCuisinesPCon.insertAdjacentHTML('beforeend', data);
    })


    //POPULAR FOR

    //DISHES
    const overPopularDishesPCon = document.querySelector('.dishes-con');
    const dishesList = finalData.restaurant[0].popularfor[0].dishes
    dishesList.forEach(elem =>{
        let data = `<h3><i class="bi bi-check-circle-fill"></i>${elem}</h3>`

        overPopularDishesPCon.insertAdjacentHTML('beforeend', data);
    })

    //SERVICES
    const overPopularServicesPCon = document.querySelector('.service-con');
    const servicesList = finalData.restaurant[0].popularfor[0].services

    servicesList.forEach(elem =>{
        let data = `<h3><i class="bi bi-check-circle-fill"></i>${elem}</h3>`

        overPopularServicesPCon.insertAdjacentHTML('beforeend', data);
    })


    //REVIEWS

   
    

    // const overReviewsPCon = document.querySelector('.reviews-con');
    // const reviewsList =  finalData.restaurant[0].reviews;


    // for(var i = 0; i <= 2; i++){
    //    console.log("here");

    //     let date = reviewsList[i].time.split(",")[0];
    //     let tags = reviewsList[i].tags;
    //     console.log(date , tags);
    //     let tagsData = "";
        
    //     if(tags.length > 5 ){
    //         tags.slice(5).forEach(elem =>{
    //             tagsData += `<h3>${elem}</h3>`;
                 
    //          })
    //     }else{
    //         for(var j = 0; j < tags.length; j++){
    //             tagsData += `<h3>${tags[j]}</h3>`;
    //         }
    //     }
        

    //     let data = `<div class="reviews">
        
    //     <div class="reviewer-details">
    //     <img loading="lazy" src="/uploads/${reviewsList[i].userimg}" alt="">
    //     <h3 class="reviewer-name">${reviewsList[i].username}</h3>
    //     <h3 class="review-time">${date}</h3>
    //     </div>
    //      <div class="review-count">
    //         <span class="res-rating">${reviewsList[i].rating}<i class="fas fa-star"></i> </span>
            
    //     </div>
    //     <div class = "review-sep-tags-con">
    //         ${tagsData}
    //     </div>
    //     <div class="review-content">
    //        <h3 class="actaul-review">${reviewsList[i].description}</h3>
    //     </div>
    //    <hr>
    // </div>
  
    // `

    // overReviewsPCon.insertAdjacentHTML('beforeend', data);
    // }
    

    // reviewsList.forEach(elem =>{

        

        
       

        
    // })




    //REVIEW-SEC 

    const reviewAddrevPCon = document.querySelector('.add-review-con');
    const reviewCountDiv = document.querySelector('.review-count-div');

    const reviewsList2 = finalData.restaurant[0].reviews;
    let reviewCountData = `<span class="rev-count">${reviewsList2.length} Reviews</span>`
    reviewsList2.forEach(elem =>{

        let date = elem.time.split(",")[0];
        let tags = elem.tags;
        let tagsData = "";
        
        if(tags.length > 5 ){
            tags.slice(5).forEach(elem =>{
                tagsData += `<h3>${elem}</h3>`;
                 
             })
        }else{
            for(var i = 0; i < tags.length; i++){
                tagsData += `<h3>${tags[i]}</h3>`;
            }
        }
        

        
       

        let data = `<div class="reviews">
        
        <div class="reviewer-details">
        <img loading = "lazy" src="/uploads/${elem.userimg}" alt="">
        <h3 class="reviewer-name">${elem.username}</h3>
        <h3 class="review-time">${date}</h3>
        </div>
         <div class="review-count">
            <span class="res-rating">${elem.rating}<i class="fas fa-star"></i> </span>
            
        </div>
        <div class = "review-sep-tags-con">
            ${tagsData}
        </div>
        <div class="review-content">
           <h3 class="actaul-review">${elem.description}</h3>
        </div>
       <hr>
    </div>
  
    `

    reviewAddrevPCon.insertAdjacentHTML('beforeend', data);
    })
    
    reviewCountDiv.insertAdjacentHTML('beforebegin',reviewCountData);

    //MENU SEC
    // const menuImgPCon = document.querySelector(".overview-menu-img-con-2");
    // const menuList = finalData.restaurant[0].menuimgs
   
    // menuList.forEach(elem =>{
        
    //     let data = `<div loading="lazy" class="restaurant-menu-img food" style="background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9)), url(/uploads/${elem.img});">
    //     <h3>${elem.imgContent}</h3>
    // </div>`
    

    // menuImgPCon.insertAdjacentHTML('beforeend', data);
    // })


    //GALLERY
    const galleryPCon = document.querySelector(".rest-imgs-con");
    const galleryList = finalData.restaurant[0].gallery
    gallerySlide = finalData.restaurant[0].gallery

    
    galleryList.forEach((elem, index )=>{
       
        let data = `<img loading="lazy" onclick="openImageSlide(${index})" src="/uploads/${elem}" alt="">`
        

        galleryPCon.insertAdjacentHTML('beforeend', data);
    })


  

    const prevIcn = document.querySelectorAll('[data-tab-imageTarget]');
    const closeIcn = document.querySelector('[data-tab-imageTarget = "close"]');
    closeIcn.addEventListener('click', ()=>{
        document.querySelector('.slide-parent-div').style.display = "none";
        document.body.classList.remove('ovf');
    })
    console.log(galleryList);
    prevIcn.forEach(elem =>{


        elem.addEventListener('click', ()=>{
               

            const imgC = document.querySelector('.slide-img-con');
            if(elem.dataset.tabImagetarget === "prev"){ 
                
                if(imgC.dataset.tabIndex == 0){
                    return
                }else{
                    
                    imgC.style.backgroundImage = `url(/uploads/${galleryList[parseInt((imgC.dataset.tabIndex)) - 1]})`
                    imgC.dataset.tabIndex = parseInt(imgC.dataset.tabIndex) - 1;
                }
            }else if(elem.dataset.tabImagetarget === "next"){

                if(imgC.dataset.tabIndex >= galleryList.length - 1){
                    return
                }else{
                
                    imgC.style.backgroundImage = `url(/uploads/${galleryList[parseInt((imgC.dataset.tabIndex)) + 1]})`
                    imgC.dataset.tabIndex = parseInt(imgC.dataset.tabIndex) + 1;
                }
               
            }
            
        })

    })
   
    

    //FOOD ITEM
    const foodPCon = document.querySelector('.overview-menu-img-con-2');
    const foodList = finalData.restaurant[0].menu;
    console.log(foodList);
    foodList.forEach(elem =>{
        let catData;
        if(elem.category == "Veg"){

            catData = `<div class="food-category">
            <img loading="lazy" src="https://img.icons8.com/fluency/48/000000/vegetarian-food-symbol.png"/>
          </div>`
            
        }else{
            catData = `<div class="food-category" style="border-color: red;">
            <img loading="lazy" src="https://img.icons8.com/fluency/50/000000/non-vegetarian-food-symbol.png"/>
          </div>`
        }

        let data = ` <div class="food-item">

        <div class="img-con">
        ${catData}
        <img loading = "lazy" src="/uploads/${elem.cuisineImg}" alt="">
        </div>
        <div class="food-item-details">
          <h3 class="food-item-name">${elem.cuisinename}<span class="food-item-rating">${elem.cuisinevotes}<i class="bi bi-chevron-double-up"></i></span></h3>
         
           <h3 class="food-item-price ruppee">₹${elem.price} /${elem.quantity}</h3>
        </div>
        
      </div>`

      foodPCon.insertAdjacentHTML('beforeend', data);
    })

    
    
}

fetcha(id)




var toastHTMLElement = document.querySelector('.toast')
const favBtnPCon = document.querySelector('.fav-button-con');



const addFav = async (target)=>{
   
    const addToFav = await fetch(`${window.location.href}/addToFavourites`,{
            method: "POST"
    })
    

    if(await addToFav.json()){

            
        target.remove()
       
        let data = `<button class="fav-button" onclick="removeFav(this)" style="color: #FF4033;" ><i class="fas fa-heart"></i></button>`
        favBtnPCon.insertAdjacentHTML('afterbegin', data);
    
            toastHTMLElement.childNodes[0].innerHTML = `<i class="fas fa-heart text-white"></i>Added to favourites`;
             var toastElement = new bootstrap.Toast(toastHTMLElement)
           toastElement.show();
        
       
           


}

    
}

const removeFav = async (target)=>{
    const removeFromFav = await fetch(`${window.location.href}/removeFromFavourites`,{
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

function openImageSlide(i) {
    
    document.body.classList.add('ovf');
    document.querySelector('.slide-parent-div').style.display = "flex";
     document.querySelector('.slide-parent-div').style.top = window.scrollY + "px";
   
    const imgC = document.querySelector('.slide-img-con');
    imgC.dataset.tabIndex = i;
    imgC.style.backgroundImage = `url(/uploads/${gallerySlide[i]})`

}

setTimeout(popUp,6000);
function popUp (){

    if(!localStorage.getItem("user")){

        if(!localStorage.getItem("visited")){

            document.querySelector('.register-popup').style.display = "flex"
    document.querySelector('.register-popup').style.top =  `${window.scrollY}px`
    document.querySelector('.ghost-div').style.display = "flex"

    document.querySelector('.ghost-div').style.top = `${window.scrollY}px`

    document.body.classList.add('ovf')
        }


        

    }
    



}

function skipPopup (){

    document.querySelector('.register-popup').style.display = "none"
    document.querySelector('.register-popup').style.top = "0"
    document.querySelector('.ghost-div').style.display = "none"

    document.querySelector('.ghost-div').style.top = "0"


    localStorage.setItem("visited" , true)
    document.body.classList.remove('ovf')

}