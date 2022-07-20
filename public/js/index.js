

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

function submitForm() {
     // Get the first form with the name
     // Usually the form name is not repeated
     // but duplicate names are possible in HTML
     // Therefore to work around the issue, enforce the correct index
     var frm = document.getElementsByName('reviewForm')[0];
     
     frm.submit(); // Submit the form
     frm.reset();  // Reset all form data
     return false; // Prevent page refresh
  }

let elemCount;

let latitude = "" ;
let longitude = "";



   function locPermDenied(err) {
     console.warn(`ERROR(${err.code}): ${err.message}`);
   }

   
   
   

const today = new Date();

const currentTime = today.getHours() + (today.getMinutes() / 100);


let successfulLookup = async (position) =>{

     latitude  = position.coords.latitude;
     longitude  = position.coords.longitude;
     
 
        const result = await fetch (`https://apis.mapmyindia.com/advancedmaps/v1/e7612078b869209107db1aaecda2495d/rev_geocode?lat=${latitude}&lng=${longitude}`);
        
 
    
     const data = await result.json();
     console.log(data);
 
 
     if (typeof(Storage) !== "undefined") {
     
          localStorage.setItem("clientLatitude", latitude );
          localStorage.setItem("clientLongitude", longitude);
          localStorage.setItem("clientLocality", data.results[0].locality);
          localStorage.setItem("clientCity", data.results[0].city);
        }
     
 
    
 
 
    const locName = document.querySelectorAll('.location')
    locName.forEach(elem=>{
         elem.innerHTML = data.results[0].locality;
    })
     
     try {
          const headchng = document.querySelector('.top-restaurant-con-head');
          headchng.innerHTML = `Top Restaurant in ${localStorage.getItem('clientLocality')}`;
     } catch (error) {
          
     }
     
    
   
     
 
 
 }
 
 if(localStorage.getItem('clientLatitude')){
     
     const locName = document.querySelectorAll('.location')
    locName.forEach(elem=>{
         elem.innerHTML = localStorage.getItem("clientLocality");
    })
    
    try {
     const headchng = document.querySelector('.top-restaurant-con-head');
     headchng.innerHTML = `Top Restaurant in ${localStorage.getItem('clientLocality')}`;
} catch (error) {
    
}

 }else{
          localStorage.setItem("clientLatitude", 21.1790883);
          localStorage.setItem("clientLongitude", 79.0359017);
          localStorage.setItem("clientLocality", "Kranti Surya Nagar");
          localStorage.setItem("clientCity", "Nagpur");
          try {
               const locName = document.querySelectorAll('.location')
               locName.forEach(elem=>{
                    elem.innerHTML = localStorage.getItem("clientLocality");
               })
               const headchng = document.querySelector('.top-restaurant-con-head');
               headchng.innerHTML = `Top Restaurant in ${localStorage.getItem('clientLocality')}`;
          } catch (error) {
              
          }
     navigator.geolocation.getCurrentPosition(successfulLookup,locPermDenied);
 }






     



     



let toogleCounter = 0;


let distance;

const removeElem = ()=>{



     if(elemCount > 0){

          for(var x = elemCount; x > 1; x--){

               const parentCard = document.querySelector(`.elem${x}`);
               
               parentCard.remove();
                    
          }
          const parentCard = document.querySelector(`.elem${1}`).childNodes;
          
          if(parentCard.length > 0){

          for(var y = parentCard.length - 1; y >= 0 ; y--){

               parentCard[y].remove();
               
          }
          
          
          }
         
          elemCount = 1;
     }

}

const nearbyRestaurants = async () =>{

     try {
          const nearRestaurantsData = await fetch('nearbyRestaurants',{

               method : 'POST',
               headers: {'Content-Type': 'application/json'},
               body : JSON.stringify({payload : [
                    {
                         lat : localStorage.getItem("clientLatitude"),
                         long : localStorage.getItem("clientLongitude")
                    }
               ]})

             
          });

          const result = await nearRestaurantsData.json()
          const finalResult = await result.nearbyrestaurants
          
          let totalCardLength = 0;

          
          let toRemove;
          let removeCounter = 1;

          
          
          removeElem();
          

          
          

          finalResult.forEach((item, index) => {
               
               const restCount = document.getElementsByClassName('restaurant-list-con').length;
               
               elemCount = restCount;
               defaultRestaurantData = document.querySelector(`.elem${elemCount}`);
               const id = item._id;
               
               distance = haversine(localStorage.getItem('clientLatitude'),localStorage.getItem('clientLongitude'),item.location.coordinates[0],item.location.coordinates[1]);

               if(distance < 1.0){
                    distance = distance * 1000 + " m";
               }else{

                    distance = distance + " km";
               }

               if(defaultRestaurantData.childElementCount <= 2){
                   
                    console.log();

                    defaultRestaurantData.innerHTML += `<div class="restaurant-card" onclick= "restaurantPageRedirect('${id}')">
               <span class="distance">${distance}</span>
               <img src="/images/rest-demo.jpg" alt="">
               <div class="restaurant-details-wrap-div">
                   <div class="restauran-details-name-cuisne">
                   <span class="restaurant-name">${item.restaurantname}</span>
                   <span class="cuisine-name">Cafe,Fast-Food,Shake</span>
                   <span class="restaurant-address">${item.address}</span>
                   </div>
                   <div class="restaurant-rating-price-con">
                       <span class="rating">4.9 <i class="fas fa-star"></i> </span>
                       <span class="price">₹500</span>
                   </div>
               </div>

           </div>
                    
            `;

               }else{
                    
                    elemCount += 1;
                    const defaultRestaurantDataCon = document.querySelector('.top-restaurant-con');
                    const newItem = document.createElement("DIV");
                    defaultRestaurantDataCon.appendChild(newItem);
                    newItem.classList.add("restaurant-list-con");
                    newItem.classList.add(`elem${elemCount}`);
                    defaultRestaurantData = document.querySelector(`.elem${elemCount}`);


                    defaultRestaurantData.innerHTML += `<div class="restaurant-card" onclick= "restaurantPageRedirect('${id}')">
               <span class="distance">${distance}</span>
               <img src="/images/rest-demo.jpg" alt="">
               <div class="restaurant-details-wrap-div">
                   <div class="restauran-details-name-cuisne">
                   <span class="restaurant-name">${item.restaurantname}</span>
                   <span class="cuisine-name">Cafe,Fast-Food,Shake</span>
                   <span class="restaurant-address">${item.address}</span>
                   </div>
                   <div class="restaurant-rating-price-con">
                       <span class="rating">4.9 <i class="fas fa-star"></i> </span>
                       <span class="price">₹500</span>
                   </div>
               </div>

           </div>`;

                  


                    
               }
               
           })
          
          
          toggleCounter = 1;
          


     } catch (error) {

          console.log(error);
          
     }
     
     


}

     const restaurantPageRedirect = async (_id)=>{

         window.location.href = `/restaurants/${_id}`
     }


     const defaultRestaurantFetch = async ()=>{
          elemCount = 1;
          
          let defaultRestaurantData = document.querySelector(`.elem${elemCount}`);
          const defaultRestaurantDataCon = document.querySelector('.top-restaurant-con');
          const result = fetch('defaultRestaurants',{

               method: 'POST',
                        headers: {'Content-Type': 'application/json'},
               body : JSON.stringify({payload :
                    {
                         city : localStorage.getItem("clientCity")
                    }
               })
          }).then(res => res.json()).then(data => {

               
               
          
         
          // const data = await result.json();
           const finalData = data.restaurants;
          

          finalData.forEach((item, index) => {
               
               // try {
               //      if(currentTime > item.workingHours.hours[0] && currentTime < item.workingHours.hours[1]){
               //           console.log(`${item.restaurantname} is open`);
               //      }else{
               //           console.log(`${item.restaurantname} is close`);
               //      }
               // } catch (error) {
                    
               // }

               const restCount = document.getElementsByClassName('restaurant-list-con').length;
               
               elemCount = restCount;
               defaultRestaurantData = document.querySelector(`.elem${elemCount}`);
               const id = item._id;

               distance = haversine(localStorage.getItem('clientLatitude'),localStorage.getItem('clientLongitude'),item.location.coordinates[0],item.location.coordinates[1]);

               if(distance < 1.0){
                    distance = distance * 1000 + " m";
               }else{

                    distance = distance + " km";
               }


               if(defaultRestaurantData.childElementCount <= 2){
                    
                    defaultRestaurantData.innerHTML += `<div class="restaurant-card" onclick= "restaurantPageRedirect('${id}')">
               <span class="distance">${distance}</span>
               <img src="/images/rest-demo-3.jpg" alt="">
               <div class="restaurant-details-wrap-div">
                   <div class="restauran-details-name-cuisne">
                   <span class="restaurant-name">${item.restaurantname}</span>
                   <span class="cuisine-name">Cafe,Fast-Food,Shake</span>
                   <span class="restaurant-address">${item.address}</span>
                   </div>
                   <div class="restaurant-rating-price-con">
                       <span class="rating">4.9 <i class="fas fa-star"></i> </span>
                       <span class="price">₹500</span>
                   </div>
               </div>

           </div>`;

               }else{
                    
                    elemCount += 1;
                    
                    const newItem = document.createElement("DIV");
                    defaultRestaurantDataCon.appendChild(newItem);
                    newItem.classList.add("restaurant-list-con");
                    newItem.classList.add(`elem${elemCount}`);
                    defaultRestaurantData = document.querySelector(`.elem${elemCount}`);

                    
                    
                    defaultRestaurantData.innerHTML += `<div class="restaurant-card" onclick= "restaurantPageRedirect('${id}')">
               <span class="distance">${distance}</span>
               <img src="/images/rest-demo.jpg" alt="">
               <div class="restaurant-details-wrap-div">
                   <div class="restauran-details-name-cuisne">
                   <span class="restaurant-name">${item.restaurantname}</span>
                   <span class="cuisine-name">Cafe,Fast-Food,Shake</span>
                   <span class="restaurant-address">${item.address}</span>
                   </div>
                   <div class="restaurant-rating-price-con">
                       <span class="rating">4.9 <i class="fas fa-star"></i> </span>
                       <span class="price">₹500</span>
                   </div>
               </div>

           </div>`;

                  


                    
               }
               toggleCounter = 0;
           })
           
           
     }
  )}
     
     if(window.location.href == "https://www.noxshdine.com/"){
          defaultRestaurantFetch();

     }
       
    
     
     

     const checkStateForDistance = ()=>{

          if(toggleCounter == 0){


               nearbyRestaurants();
               
               const filterDist = document.querySelector('.filter-dist');
               filterDist.style.backgroundColor = 'black';
               filterDist.style.border = 'black';
               filterDist.style.color = 'white';
               

          }else{

               removeElem();

               defaultRestaurantFetch();

               const filterDist = document.querySelector('.filter-dist');
               filterDist.style.backgroundColor = '';
               filterDist.style.border = '0.1rem solid #afafaf';
               filterDist.style.color = '#afafaf';
               

               }
     }

     const restaurantSearch = async (arr)=>{

          const imgElm = document.querySelector(".nothing-found");

          if(arr.length < 1) {
               
               imgElm.style.display = "flex";
               return
          }

          imgElm.style.display = "none";
          
          arr.forEach((item, index) => {
               
               const restCount = document.getElementsByClassName('restaurant-list-con').length;
               
               elemCount = restCount;
               defaultRestaurantData = document.querySelector(`.elem${elemCount}`);
               const id = item._id;
               
               distance = haversine(localStorage.getItem('clientLatitude'),localStorage.getItem('clientLongitude'),item.location.coordinates[0],item.location.coordinates[1]);

               if(distance < 1.0){
                    distance = distance * 1000 + " m";
               }else{

                    distance = distance + " km";
               }

               if(defaultRestaurantData.childElementCount <= 2){
                   
                    

                    defaultRestaurantData.innerHTML += `<div class="restaurant-card" onclick= "restaurantPageRedirect('${id}')">
               <span class="distance">${distance}</span>
               <img src="/images/rest-demo.jpg" alt="">
               <div class="restaurant-details-wrap-div">
                   <div class="restauran-details-name-cuisne">
                   <span class="restaurant-name">${item.restaurantname}</span>
                   <span class="cuisine-name">Cafe,Fast-Food,Shake</span>
                   <span class="restaurant-address">${item.address}</span>
                   </div>
                   <div class="restaurant-rating-price-con">
                       <span class="rating">4.9 <i class="fas fa-star"></i> </span>
                       <span class="price">₹500</span>
                   </div>
               </div>

           </div>`;

               }else{
                    
                    elemCount += 1;
                    const defaultRestaurantDataCon = document.querySelector('.top-restaurant-con');
                    const newItem = document.createElement("DIV");
                    defaultRestaurantDataCon.appendChild(newItem);
                    newItem.classList.add("restaurant-list-con");
                    newItem.classList.add(`elem${elemCount}`);
                    defaultRestaurantData = document.querySelector(`.elem${elemCount}`);


                    defaultRestaurantData.innerHTML += `<div class="restaurant-card" onclick= "restaurantPageRedirect('${id}')">
               <span class="distance">${distance}</span>
               <img src="/images/rest-demo.jpg" alt="">
               <div class="restaurant-details-wrap-div">
                   <div class="restauran-details-name-cuisne">
                   <span class="restaurant-name">${item.restaurantname}</span>
                   <span class="cuisine-name">Cafe,Fast-Food,Shake</span>
                   <span class="restaurant-address">${item.address}</span>
                   </div>
                   <div class="restaurant-rating-price-con">
                       <span class="rating">4.9 <i class="fas fa-star"></i> </span>
                       <span class="price">₹500</span>
                   </div>
               </div>

           </div>`;

                  


                    
               }
               
           })
          }
     

     let clickedData = {
          distance : "",
          rating : "" 

     };
    
     const checkClikedDat = (e)=>{
          
          if(e.rating){
               if(!clickedData.rating){
                    clickedData.rating = 1
               }else{
                    clickedData.rating = ""
               }
          }

          if(e.distance){
               if(!clickedData.distance){
                    clickedData.distance = 1
               }else{
                    clickedData.distance = ""
               }
     }}
     
     const filterSort = async (data)=>{
          try {
               var url = new URL("http://localhost:3000/ovrall")
               const filterDist = document.querySelector('.filter-dist');
               const filterRating = document.querySelector('.filter-rate');
               

               // if(!clickedData.distance && data.distance){

               //      params = {lat: localStorage.getItem('clientLatitude'), long: localStorage.getItem('clientLongitude')}
               //      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
               //      console.log(url);
                   

               // }
               // if(!clickedData.rating && data.rating){

               //      params = {rating : 1}
               //      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
               //      console.log(url);
               //      const ratingSorted = await fetch(url,{

               //           method : 'POST',
     
                         
                       
               //      });
     
          
               //      const result = await ratingSorted.json()
               //      const finalResult = await result.restaurants

               // }
               checkClikedDat(data)


               if(clickedData.distance && clickedData.rating){
                    params = {lat: localStorage.getItem('clientLatitude'), long: localStorage.getItem('clientLongitude'), rating : 1}
                    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

                    const ratingSorted = await fetch(url,{
                         method : 'POST'
                    });
     
          
                    const result = await ratingSorted.json()
                    const finalResult = await result.restaurants;
                    
                    removeElem();
                    restaurantSearch(finalResult);
                  

                    filterDist.style.backgroundColor = "black";
                    filterDist.style.border = "0.1rem solid black";
                    filterDist.style.color = "white";

                    filterRating.style.backgroundColor = "black";
                    filterRating.style.border = "0.1rem solid black";
                    filterRating.style.color = "white";
                    
                   
                    
                    


               }


               if(clickedData.distance && !clickedData.rating){
                    params = {lat: localStorage.getItem('clientLatitude'), long: localStorage.getItem('clientLongitude')}
                    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
                    const ratingSorted = await fetch(url,{
                        method : 'POST',
                    });
     
          
                    const result = await ratingSorted.json()
                    
                    const finalResult = await result.restaurants;
                   
                    removeElem();
                   
                    restaurantSearch(finalResult);
                    
                    filterDist.style.backgroundColor = "black";
                    filterDist.style.border = "0.1rem solid black";
                    filterDist.style.color = "white";

                    
                    filterRating.style.backgroundColor = "";
                    filterRating.style.border = "0.1rem solid #afafaf";
                    filterRating.style.color = "#afafaf"
               }


               if(!clickedData.distance && clickedData.rating){

                    params = {rating : 1}
                    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
                    const ratingSorted = await fetch(url,{
                         method : 'POST',
                    });
     
                    
                    const result = await ratingSorted.json()
                    const finalResult = await result.restaurants
                   
                    removeElem();
                    restaurantSearch(finalResult);

                    filterDist.style.backgroundColor = "";
                    filterDist.style.border = "0.1rem solid #afafaf";
                    filterDist.style.color = "#afafaf";

                    filterRating.style.backgroundColor = "black";
                    filterRating.style.border = "0.1rem solid black";
                    filterRating.style.color = "white";
                         
                        
               }


               if(!clickedData.distance && !clickedData.rating){
                    params = {}
                    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
                    const ratingSorted = await fetch(url,{
                         method : 'POST', 
                    });
     
                    
                    const result = await ratingSorted.json()
                    const finalResult = await result.restaurants

                    removeElem();
                    defaultRestaurantFetch();

                    filterDist.style.backgroundColor = "";
                    filterDist.style.border = "0.1rem solid #afafaf";
                    filterDist.style.color = "#afafaf";

                    filterRating.style.backgroundColor = "";
                    filterRating.style.border = "0.1rem solid #afafaf";
                    filterRating.style.color = "#afafaf";
                    
               }    
              
               
               
               
               

               
               
               
          } catch (error) {
               console.log(error);
          }
     }

    

     document.addEventListener('mouseup', function(e) {

          try {

               const searchRes = document.querySelector('.search-res-con');
          if (!searchRes.contains(e.target)) {
              searchRes.style.display = 'none';
              
          }

          const dec_loc_con= document.querySelector('.dec-loc-con');
          const loccaret = document.querySelector('.loc-arr');
          if (!loccaret.contains(e.target) && !dec_loc_con.contains(e.target)) {
               dec_loc_con.style.display = 'none';
               loccaret.style .transform = "rotate(0deg)";  
          }
          
          } catch (error) {
               
          }
          
          
      });
      
     
    





const detectUsingGps = ()=>{
    document.querySelector('.location').innerHTML = 'Loading...' 
    navigator.geolocation.getCurrentPosition(((position) => {
     successfulLookup(position);
     removeElem();
     defaultRestaurantFetch();
   }),locPermDenied);
     

}






const newLocation = async ()=>{

     const result = await fetch("testing");

     console.log(result);

}


var buttons = document.querySelectorAll('form button:not([type="submit"])');
for (i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function(e) {
    
    e.preventDefault();
  });
}


