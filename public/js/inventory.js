

 const getData = async()=>{
  
document.querySelector('.bi-arrow-clockwise').style.transform = "rotate(90deg)"

let itemsWrapper = document.querySelector('.items-wrapper');
itemsWrapper.innerHTML = `<div class="item skeleton">
                            
                    

</div>
<div class="item skeleton">


            
</div>
<div class="item skeleton">


            
</div>`

    const data = await fetch('/inventory',{
        method : 'POST'
    })

    const finalData = await data.json();
    itemsWrapper.innerHTML = ''
    
    
    finalData.forEach(element => {

        let qtyData = ``
        element.quantityDetails.forEach(elem =>{
            qtyData += `<div class="input-group-inventory">
            <label for="quantity">${elem.quantity} ${elem.quantityUnit}</label>   
            <input type="number" data-tab-quantity="${elem._id}" name="quantity" value=${elem.stock ? elem.stock : 0}>
            
            </div>`
        })
         let htmlData = `<div class="item">
                            
         <div class="img-div">
             <img src="/uploads/${element.cuisineImg ? element.cuisineImg : 'file-1643559975093.jpg'}" alt="" srcset="">

         </div>
     

     <div class="item-details-div">
         
             <span class="item-name">${element.cuisinename}</span>
     </div>
     ${qtyData}
      <button class="update-btn" onclick="updateStock('${element._id}',this)">Update</button>

</div>`
        itemsWrapper.insertAdjacentHTML("beforeend",htmlData);
    });
    

}



getData()

let tl = new TimelineLite()

 const hideToast = ()=>{
    let toast = document.querySelector('.my-toast')

    tl.to(toast,0.5,{
        opacity : "0",
        display : "none",
        top : window.scrollY
    })

    
    
}
 const showToast = (data,color)=>{
    let toast = document.querySelector('.my-toast')
    color ? toast.querySelector('span').style.backgroundColor = color : toast.querySelector('span').style.backgroundColor = 'rgb(202, 29, 29)'
    
    toast.querySelector('span').innerHTML = data    
    tl.to(toast,0.5,{
        opacity : "1",
        display : "flex",
        top : window.scrollY + 100

    })
    
    setTimeout(hideToast,4000);

}   



const updateStock = async(id,e)=>{
    const findel = e.closest('.item')
    const stockInputs = findel.querySelectorAll('[data-tab-quantity]');
    let stockValues = [];
    
    stockInputs.forEach(elem =>{
        stockValues.push({
            qId : elem.dataset.tabQuantity,
            stock : elem.value
        })
    })


    const sendStockData = await fetch('/update-stock',{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({payload: stockValues,id : e})


    })
    
    if(await sendStockData.json()){
        showToast('Updated Successfully',"#3ea055");
    }
    
}

const searchInventory = async(e)=>{
    console.log(e.value)
    let itemsWrapper = document.querySelector('.items-wrapper');
   
        itemsWrapper.innerHTML = `<div class="item skeleton">
                                    
                            

        </div>
        <div class="item skeleton">


                    
        </div>
        <div class="item skeleton">


                    
        </div>`
    const data = await fetch('/inventory',{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({payload : e.value})
    })

    const finalData = await data.json();
    console.log(finalData)
    itemsWrapper.innerHTML = '';
    let regExp = new RegExp(e.value+'.*','i');

    if(finalData.length >= 1){
        finalData.forEach(element => {
            if(regExp.test(element.cuisinename)){

                let qtyData = ``
                element.quantityDetails.forEach(elem =>{
                    qtyData += `<div class="input-group-inventory">
                    <label for="quantity">${elem.quantity} ${elem.quantityUnit}</label>   
                    <input type="number" data-tab-quantity="${elem._id}" name="quantity" value=${elem.stock ? elem.stock : 0}>
                    
                    </div>`
                })
                let htmlData = `<div class="item">
                                
             <div class="img-div">
                 <img src="/uploads/${element.cuisineImg ? element.cuisineImg : 'file-1643559975093.jpg'}" alt="" srcset="">
    
             </div>
         
    
         <div class="item-details-div">
             
                 <span class="item-name">${element.cuisinename}</span>
         </div>
         ${qtyData}
          <button class="update-btn" onclick="updateStock('${element._id}',this)">Update</button>
    
    </div>`
            itemsWrapper.insertAdjacentHTML("beforeend",htmlData);
            }
             
        });
    }
   
    

}