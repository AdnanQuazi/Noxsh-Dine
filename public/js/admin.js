const getRes = async()=>{
    const restaurants = await fetch('/admin',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'}
        
    })
   const fData = await restaurants.json()
   console.log(fData.getRes)
   let overallCon = document.querySelector('.overall-con');
    fData.getRes.forEach(element => {
       let htmldata = `<div class="docs-div">
       <h2>Documents</h2>
       <div class="imgs-con">


       <div class="inner-img-holder">
       <img src="/documents/${element.panDetails.panImage}" alt="" srcset="" onclick="enlaregImg(this)">
       <span>PAN</span>
       </div>

       <div class="inner-img-holder">
       <img src="/documents/${element.fssaiDetails.fssaiImage}" alt="" srcset="" onclick="enlaregImg(this)">
       <span>FSSAI</span>
       </div>

       <div class="inner-img-holder">
       <img src="/documents/${element.gstDetails.gstImage}" alt="" srcset="" onclick="enlaregImg(this)">
       <span>GST</span>
       </div>
        
       </div>
       



   </div>
       <h2>Basic Details</h2>

   <div class="restaurant-details-con">
       <div class="basic-det">

       <div class="res-img-con">
           <img src="/documents/${element.restaurantimg}" alt="">
       </div>
       <div class="res-details-con">
           <div class="det-group">
               <span>Restaurant Name</span>
               <p>${element.restaurantname}</p>
           </div>
           <div class="det-group">
               <span>Restaurant Address</span>
               <p>${element.address}</p>
           </div>
           <div class="det-group">
               <span>Contact Number</span>
               <p class="doc-number">${element.phone}</p>
           </div>
            <div class="det-group">
               <span>Email</span>
               <p>${element.email}</p>
           </div>
           <div class="det-group">
               <span>Owner Name</span>
               <p>${element.ownerName}</p>
           </div>
           <div class="det-group">
               <span>Date</span>
               <p>${element.date}</p>
           </div>
       </div>
       </div>
       


   </div>
       <h2>Document Details</h2>
           <div class="documents-details">
               <div class="doc-det-con">
                   <h3>PAN Details</h3>
                   <div class="inner-det-con">
                       <div class="det-group">
                           <span>PAN Number</span>
                           <p class="doc-number">${element.panDetails.panNumber}</p>
                       </div>
                       <div class="det-group">
                           <span>Legal Entity Name</span>
                           <p >${element.panDetails.legalEntityName}</p>
                       </div>
                       <div class="det-group">
                           <span>Legal Entity Address</span>
                           <p>${element.panDetails.legalEntityAddress}</p>
                       </div>
                   </div>
               </div>
                <div class="doc-det-con">
                   <h3>FSSAI Details</h3>
                   <div class="inner-det-con">
                       <div class="det-group">
                           <span>FSSAI Number</span>
                           <p class="doc-number">${element.fssaiDetails.fssaiNumber}</p>
                       </div>
                       <div class="det-group">
                           <span>FSSAI Expiry</span>
                           <p >${element.fssaiDetails.fssaiExpiry}</p>
                       </div>
                       
                   </div>
               </div>
                <div class="doc-det-con">
                   <h3>GST Details</h3>
                   <div class="inner-det-con">
                       <div class="det-group">
                           <span>GST Number</span>
                           <p class="doc-number">${element.gstDetails.gstNumber}</p>
                       </div>
                       <div class="det-group">
                           <span>5% Charge on Service </span>
                           <p>${element.gstDetails.chargeOnMenu ? 'Yes' : 'No'}</p>
                       </div>
                       
                   </div>
                   </div>
                   <div class="doc-det-con">
                   <h3>Bank Details</h3>
                   <div class="inner-det-con">
                       <div class="det-group">
                           <span>Account Number</span>
                           <p class="doc-number">${element.bankDetails.bankNumber}</p>
                       </div>
                       <div class="det-group">
                           <span>Account Type</span>
                           <p>${element.bankDetails.accountType}</p>
                       </div>
                       <div class="det-group">
                           <span>IFSC Code</span>
                           <p>${element.bankDetails.ifscCode}</p>
                       </div>
                       
                   </div>
               </div>
               </div>
               </div>

               <div class="btn-con">
                   <button class="approve" id="${element.requestFrom}" onclick="approveRes('${element._id}')">Approve</button>
                   <button class="disapprove" id="${element.requestFrom}" onclick="disRes('${element._id}')">Disapprove</button>

               </div>




           <hr>
           <hr>`

        overallCon.insertAdjacentHTML('beforeend',htmldata)
    });
   

}

getRes()


const approveRes = async(i)=>{

const appRes = await fetch('/approve-restaurant',{
    method : 'POST',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify({id : i})
})
    window.location.reload()
}
const disRes = async(i)=>{
    const appRes = await fetch('/disapprove-restaurant',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({id : i})
    })
    window.location.reload()
}

const enlaregImg = (i)=>{
    document.querySelector('.doc-img-el').src = i.src

    document.querySelector('.en-img-con').style.display = 'flex'
    document.querySelector('.en-img-con').style.top =  window.scrollY + 'px'

    document.body.classList.add('ovf')

}

function closeCon (){
    document.querySelector('.doc-img-el').src = ''

    document.querySelector('.en-img-con').style.display = 'none'
    document.body.classList.remove('ovf')


}