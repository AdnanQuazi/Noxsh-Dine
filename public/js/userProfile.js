const id = window.location.href.substring(window.location.href.indexOf('/user') + 1).split(['/'])[1];
import { haversine } from './haversine.js'

const fetchData = async()=>{
    const profileData = await fetch(`/user/${id}`,{
        method : "POST"
    });
    const data = await profileData.json();

    const favViewPCon  = document.querySelector('.fav-view-con');
    const favList = data.favData

   
   
    favList.forEach((elem,i) => {


        let distance = haversine(localStorage.getItem('clientLatitude'),localStorage.getItem('clientLongitude'),elem[0].location.coordinates[0],elem[0].location.coordinates[1]);

        if(distance < 1.0){
            distance = distance * 1000 + " m";
       }else{
    
            distance = distance + " km";
       }
       


        let data = `<div class="restaurant-card" onclick= "restaurantPageRedirect('${elem[0]._id}')">
        <span class="distance">${distance}</span>
        <img loading = "lazy" src="/images/rest-demo.jpg" alt="">
        <div class="restaurant-details-wrap-div">
            <div class="restaurant-details-name-cuisine">
            <span class="restaurant-name">${elem[0].restaurantname}</span>
            <span class="cuisine-name">${elem[0].cuisines[0]}</span>
            <span class="restaurant-address">${elem[0].address}</span>
            </div>
            <div class="restaurant-rating-price-con">
                <span class="rating">${elem[0].averageRating}<i class="fas fa-star"></i> </span>
                <span class="price">₹500</span>
            </div>
        </div>

    </div>`

    favViewPCon.insertAdjacentHTML('beforeend', data);

    });



    const revViewPCon  = document.querySelector('.review-view-con');
    const revList = data.finalRevData
    
    revList.forEach(elem =>{
        
      

        let data = ` <div class="reviews">
        
        <div class="reviewer-details">
        <img loading="lazy" src="/uploads/${elem.restaurantimg}" alt="">
        <h3 class="reviewer-name">${elem.restaurantname}</h3>
        <h3 class="review-time">${elem.time}</h3>
        </div>
        <div class="review-count">
            <span class="res-rating">${elem.rating}<i class="fas fa-star"></i> </span>
            
        </div>
        <div class = "review-sep-tags-con">
           
        </div>
        <div class="review-content">
        <h3 class="actaul-review">${elem.description ? elem.description : ''}</h3>
        </div>
    <hr>
    </div>`

    revViewPCon.insertAdjacentHTML('beforeend', data)
    })

    document.querySelector('.followers-count').textContent = data.followersData[0] ? data.followersData.length : 0 
    document.querySelector('.following-count').textContent = data.followingData[0] ? data.followingData.length : 0
    document.querySelector('.review-count').textContent = data.finalRevData[0] ? data.finalRevData.length : 0   

}

fetchData()