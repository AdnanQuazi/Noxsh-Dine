
        const windowContent = document.querySelectorAll('[data-tab-windowContent]');

        const fetchEditData = async (id)=>{
            const editData = await fetch('/edit-food-data',{
                method : 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({payload: id})
            })

                console.log(await editData.json());;
        }

        const popEditWindow2 = async(e)=>{
            console.log(windowContent);
            windowContent.forEach(elem =>{
                if(elem.dataset.tabWindowcontent == e.dataset.tabWindow){
                   document.querySelector('.edit-data-outer-div-2').style.display = "flex";
                   document.querySelector('.edit-data-outer-div-2').style.top =  `${window.scrollY}px`
                   
                    document.body.classList.add('ovf');
                }   
            })
        
        
                fetchEditData(e.id);
        }

        const closeEditWindow2 = async()=>{

            document.querySelector('.edit-data-outer-div-2').style.display = "none"
            document.body.classList.remove('ovf');
            
        
        }


const popEditWindow = async(e)=>{
    console.log(windowContent);
    windowContent.forEach(elem =>{
        if(elem.dataset.tabWindowcontent == e.dataset.tabWindow){
           document.querySelector('.edit-data-outer-div').style.display = "flex";
           document.querySelector('.edit-data-outer-div').style.top =  `${window.scrollY}px`
           
            document.body.classList.add('ovf');
        }   
    })


    
}

const closeEditWindow = async()=>{

    document.querySelector('.edit-data-outer-div').style.display = "none"
    document.body.classList.remove('ovf');
    

}













const fetchRestData = async()=>{
    const getRestData = await fetch("/business/send-data",{
        method : "POST"
    })

    const finalData = await getRestData.json();
    console.log(finalData.activeOffers);
    //Active Offers
    const offersDivCon = document.querySelector('.offers-div-con');
    finalData.activeOffers.forEach(elem =>{
        console.log(elem);
        let htmlData = `<div class="offer">
        <div class="hov-btn-con">
                        <button class="edit-btn" onclick="popEditWindow2(${elem.offerId})" data-tab-window="offer-items"><i class="bi bi-pencil-fill"></i></button>
                        <button class="delete-btn"><i class="bi bi-trash3-fill"></i></button>
                        </div>
        <div class="img"><img src="/uploads/${elem.cuisineImg}" alt="" srcset=""></div>
        <div class="offer-det-div">
            <div class="offer-name-price-con">
                <p class="food-name">${elem.cuisinename}</p>
            <p class="offer-before ruppee">₹${elem.price}</p>
            </div>
            
            <p class="offer-after ruppee">Offer Price - ₹${elem.offerPrice}</p>

        </div>
    </div>`

    offersDivCon.insertAdjacentHTML("afterbegin" , htmlData)
    })

    //Food Items
    const foodItemsDiv = document.querySelector('.food-items-div-con');
    finalData.foodItems.forEach(elem =>{
        let htmlData = `<div class="food">
        <div class="hov-btn-con">
                        <button class="edit-btn" onclick="popEditWindow2(this)" id="${elem._id}" data-tab-window="food-items"><i class="bi bi-pencil-fill"></i></button>
                        <button class="delete-btn"><i class="bi bi-trash3-fill"></i></button>
                        </div>
        <div class="img"><img loading="lazy" src="/uploads/${elem.cuisineImg}" alt="" srcset=""></div>
        <div class="food-det-div">
            <div class="offer-name-price-con">
                <p class="food-name">${elem.cuisinename}</p>
            <p class="food-price ruppee">₹ ${elem.price}</p>
            </div>
            

        </div>
    </div>`
    foodItemsDiv.insertAdjacentHTML("afterbegin",htmlData);
    })

    //Menu
    const menuDiv = document.querySelector('.menu-div-con');
    finalData.menu.forEach(elem =>{
        let htmlData = ` <div class="menu">
        <div class="hov-btn-con">
                        <button class="edit-btn" onclick="popEditWindow2(${elem._Id})" data-tab-window="Menu-items"><i class="bi bi-pencil-fill"></i></button>
                        <button class="delete-btn"><i class="bi bi-trash3-fill"></i></button>
                        </div>
        <div class="menu-img"><img src="/uploads/${elem.img}" alt="" srcset=""></div>
        
            

        </div>
`

        menuDiv.insertAdjacentHTML("afterbegin",htmlData)

    })

    //Gallery
    const galleryDiv = document.querySelector('.gallery-div-con');
    finalData.gallery.forEach(elem =>{
        let htmlData = `<div class="gallery">
        <div class="hov-btn-con">
                        <button class="delete-btn"><i class="bi bi-trash3-fill"></i></button>
                        </div>
        <div class="gallery-img"><img src="/uploads/${elem}" alt="" srcset=""></div>
        
            

        </div>`

        galleryDiv.insertAdjacentHTML("afterbegin",htmlData)

    })
}

fetchRestData()