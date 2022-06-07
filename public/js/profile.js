import { haversine } from './haversine.js'







const recentlyViewedPCon  = document.querySelector('.recent-view-con');
const recentlyViewedTempCon  = document.querySelector('.recent-view-template'); 


for(var i =0; i < 3; i++){
    recentlyViewedPCon.append(recentlyViewedTempCon.content.cloneNode(true))
}


const profileDataFetch = async ()=>{
    const profileData = await fetch('/myprofile',{
        method : "POST",
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({payload: localStorage.getItem('user')})
    });
    const data = await profileData.json();
    

    //RECENTLY VIEWED
   
    const recentlyViewedList = data.data

    
    

    recentlyViewedPCon.innerHTML = '';
    recentlyViewedList.forEach((elem,i) => {


        let distance = haversine(localStorage.getItem('clientLatitude'),localStorage.getItem('clientLongitude'),elem[0].location.coordinates[0],elem[0].location.coordinates[1]);

        if(distance < 1.0){
            distance = distance * 1000 + " m";
       }else{
    
            distance = distance + " km";
       }
       


        let data = `<div class="restaurant-card" onclick= "restaurantPageRedirect('${elem[0]._id}')">
        <span class="distance">${distance}</span>
        <img loading = "lazy" class="skeleton" src="/images/rest-demo.jpg" alt="">
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

    recentlyViewedPCon.insertAdjacentHTML('beforeend', data);

    });


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
    
    const yourBookingsPCon = document.querySelector('.your-bookings-view-con');
    const yourBookingsList = data.bookingsData
    

    yourBookingsList.forEach((elem , i) =>{
       console.log(elem);
        let htmlData = `<div class="main-data-con">
        <div class="user-details-div">
            <img src="/uploads/${elem[1].restaurantimg}" alt="">
            <div class="name-username-div">
                <h4 class="name">${elem[1].restaurantname}</h4>
                <span class="username"></span>
            </div>
        </div>
        <div class="booking-details-con">
            <div class="date-con">
                <h4>Date</h4>
                <p>${elem[0].bookingDate}</p>
            </div>
            <div class="time-con">
                  <h4>Time</h4>
                <p>${elem[0].bookingTime}</p>
            </div>
            <div class="guest-name-con">
                  <h4>Guest Name</h4>
                <p>${elem[0].guestName}</p>
            </div>
            <div class="guest-count-con">
                  <h4>Guest Count</h4>
                <p>${elem[0].guestCount}</p>
            </div>
        </div>
        <div class="buttons-con">
            <button class="more-info" id="${elem[0]._id}" onclick="window.location.href = 'http://localhost:3000/restaurants/${elem[1]._id}/pre-cook-meal/${elem[0]._id}'"><img src="/images/preCook.png"></img>Pre Cook</button>
            
        </div>
        </div>`

        yourBookingsPCon.insertAdjacentHTML('beforeend', htmlData)
    })
    console.log(data.followingData.length);
    console.log(data);
    document.querySelector('.followers-count').textContent = data.followersData[0] ? data.followersData.length : 0 
    document.querySelector('.following-count').textContent = data.followingData[0] ? data.followingData.length : 0
    document.querySelector('.review-count').textContent = data.finalRevData[0] ? data.finalRevData.length : 0

}





profileDataFetch()




















































