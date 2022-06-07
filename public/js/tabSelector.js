    const  tabs = document.querySelectorAll('[data-tab-target]');
    const liRev = document.querySelector('#lirev');
    
    const  tabContents = document.querySelectorAll('[data-tab-content]');

    tabs.forEach(tab =>{
        

        
        tab.addEventListener('click', ()=>{
                
               tabs.forEach(tab =>{
                tab.classList.remove('active');
               })
              
            if(tab.dataset.tabTarget == "#reviews"){
              
                liRev.classList.add('active');
            }else{
                tab.classList.add('active');
            }
            
            const target = document.querySelector(tab.dataset.tabTarget)
            
            tabContents.forEach(tabContent =>{
                tabContent.classList.remove('active');
            })
            target.classList.add('active')


        })

        
    })
     
    const revForm = document.getElementsByName('reviewForm');
    const btnSub = document.querySelector('#btnSubmit');
    const _id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    const resPcon = document.querySelector('.restaurant-profile-con');
    
    const errorData =  `<div aria-live="polite" aria-atomic="true" class="bg-dark position-relative bd-example-toasts" >
    <div class="toast-container position-absolute p-3 top-0 start-50 translate-middle-x" id="toastPlacement">
      <div class="toast bg-white border-0">
        
        <div class="toast-body display-6 text-center text-white rounded d-flex justify-content-evenly bg-danger">
         <i class="bi bi-exclamation-circle-fill text-white"></i> Please give a rating 
        </div>
      </div>
    </div>
  </div>`

  const successData =   `<div aria-live="polite" aria-atomic="true" class="bg-dark position-relative bd-example-toasts" >
<div class="toast-container position-absolute p-3 top-0 start-50 translate-middle-x" id="toastPlacement">
  <div class="toast bg-white border-0">
    
    <div class="toast-body display-6 text-center text-white rounded d-flex justify-content-evenly bg-success">
     <i class="bi bi-exclamation-circle-fill text-white"></i>Posted Successfully 
    </div>
  </div>
</div>
</div>`

    btnSub.addEventListener('click',async ()=>{

        const revData = revForm[0].reviewData.value
        const revRating = revForm[0].rating.value

        if(!revRating){
            console.log("ee");

            resPcon.insertAdjacentHTML('beforebegin', errorData);

            var toastElList = [].slice.call(document.querySelectorAll('.toast'))
                var toastList = toastElList.map(function (toastEl) {
                return new bootstrap.Toast(toastEl)
                
                })
            var myToastEl = document.querySelector('.toast')
            var myToast = bootstrap.Toast.getInstance(myToastEl) // Returns a Bootstrap toast instance
            console.log(myToast);
            myToast.show();
        }else{
            
            const pushReview = await fetch(`./${_id}`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({revData,revRating})
            })

            if(await pushReview.json()){
                
                resPcon.insertAdjacentHTML('beforebegin', successData);

                var toastElList = [].slice.call(document.querySelectorAll('.toast'))
                var toastList = toastElList.map(function (toastEl) {
                return new bootstrap.Toast(toastEl)
                
                })
            var myToastEl = document.querySelector('.toast')
            var myToast = bootstrap.Toast.getInstance(myToastEl) // Returns a Bootstrap toast instance
            console.log(myToast);
            myToast.show();
            }
        }

        
    })