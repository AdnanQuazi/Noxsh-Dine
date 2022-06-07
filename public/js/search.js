function sendData(e){

    const searchRes = document.querySelector('.search-res-con');
     searchRes.style.display = "flex";
    
    
    
    let match = e.value.match(/^[a-zA-Z ]*/);
    let match2 = e.value.match(/\s*/);
    let regExp = new RegExp(e.value+'.*','i');

    if(match2[0] === e.value){

        searchRes.innerHTML = "";
        searchRes.style.border = "none";
        return;
    }
    if(match[0] === e.value){
     
        fetch('/getRestaurants',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({payload: e.value})
        }).then(res => res.json()).then(data => {
             
        

            let payload = data.payload;
            searchRes.innerHTML= ``;
            data.searchFood.forEach(elem =>{
                
                elem.menu.forEach(element =>{
                    if(regExp.test(element.cuisinename)){
                       

                        searchRes.innerHTML += ` <div class="search-result" onclick= "restaurantPageRedirect()">
                <div class="search-result-res-img" style="backgroundImage = url('/uploads/${element.cuisineImg}')"></div>
                <div class="search-result-res-data">
                
                <span>${element.cuisinename}</span>
                
                
                <span class="restaurant-address">Dish</span>
                </div>
                
                
            </div>`
                    }
                })
            })
            
           
            if(payload.length < 1 && data.searchFood.length < 1){
               
                searchRes.innerHTML = ` <div class="search-result">
                <span>Nothing Found</span>
            </div>`;
            return;
            }
            payload.forEach((item, index) => {

               distance = haversine(localStorage.getItem('clientLatitude'),localStorage.getItem('clientLongitude'),item.location.coordinates[0],item.location.coordinates[1]);
               if(distance < 1.0){
                    distance = distance * 1000 + " m";
               }else{

                    distance = distance + " km";
               }

               
                
                searchRes.innerHTML += ` <div class="search-result" onclick= "restaurantPageRedirect('${item._id}')">
                <div class="search-result-res-img"></div>
                <div class="search-result-res-data">
                
                <span>${item.restaurantname}</span>
                
                <span class="cuisine-name">Cafe,Fast-Food,Shake</span>
                <span class="restaurant-address">${item.address}</span>
                </div>
                <div class="search-result-res-stats-mas-con">
                <div class="search-result-res-stats">
                <span class="distance">${distance}</span>
                <hr>
                <span class="rating">4.9 <i class="fas fa-star"></i> </span>
                
                </div>
                <span class="book-now">Book Now<i class="bi bi-caret-right-fill"></i></span>
                
               </div>
                
            </div>`


            })
        })
        return;
    }
    searchRes.innerHTML = "";
}