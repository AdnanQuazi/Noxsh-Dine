const tl4 = new TimelineLite()

// const animateButton = document.querySelectorAll('[data-tab-target]');



// animateButton.forEach(elem =>{

    

//     elem.addEventListener('click', ()=>{

      

//     })
// })
try {
    const menuWrapCon2 = document.querySelector('.menu-wrap-con-takeaway');

menuWrapCon2.addEventListener('click', (e)=>{
    console.log(e.target);
    if(e.target.classList.contains('specify-head')){
        const animateDiv = menuWrapCon2.querySelectorAll('.menu-inner-wrap-con');
        
        let target;
        
        animateDiv.forEach(element =>{

            if(e.target.dataset.tabTarget == element.dataset.tabContent){
                target = element
            }

        })

        if(e.target.dataset.tabStatus == "open"){
            let tab = document.getElementById(e.target.dataset.tabTarget);
            
           
               
           
             tl4.to(target,0.5, {height:"0", opacity : "0"},);
                let targetBtn = e.target.closest('button');
                let btnData = targetBtn.innerHTML.split('<');
                e.target.closest('button').innerHTML = `${btnData[0]} <i class="bi bi-caret-up-fill"></i>`
               
               
                
                
                

            

           
            e.target.dataset.tabStatus = "close"
        }else if(e.target.dataset.tabStatus == "close"){
            let tab = document.getElementById(e.target.dataset.tabTarget);

           
            
            tl4.to(target,0.5,{
                    height : "auto",
                    opacity : "1"
            })
            let targetBtn = e.target.closest('button');
            let btnData = targetBtn.innerHTML.split('<');
            e.target.closest('button').innerHTML = `${btnData[0]} <i class="bi bi-caret-down-fill" ></i>`
           
           
            e.target.dataset.tabStatus = "open"

        }

    }
})
    
} catch (error) {
    
}


try {
    
    const menuWrapCon3 = document.querySelector('.menu-wrap-con');

    menuWrapCon3.addEventListener('click', (e)=>{
    console.log(e.target);
    if(e.target.classList.contains('specify-head')){
        const animateDiv = menuWrapCon3.querySelectorAll('.menu-inner-wrap-con');
        
        let target;
        
        animateDiv.forEach(element =>{

            if(e.target.dataset.tabTarget == element.dataset.tabContent){
                target = element
            }

        })

        if(e.target.dataset.tabStatus == "open"){
            let tab = document.getElementById(e.target.dataset.tabTarget);
           
            console.log(tab);
             tl4.to(target,0.5, {height:"0", opacity : "0"},);
                let targetBtn = e.target.closest('button');
                let btnData = targetBtn.innerHTML.split('<');
                e.target.closest('button').innerHTML = `${btnData[0]} <i class="bi bi-caret-up-fill"></i>`
                
                
                

            

           
            e.target.dataset.tabStatus = "close"
        }else if(e.target.dataset.tabStatus == "close"){
            let tab = document.getElementById(e.target.dataset.tabTarget);

           

            tl4.to(target,0.5,{
                    height : "auto",
                    opacity : "1"
            })
            let targetBtn = e.target.closest('button');
            let btnData = targetBtn.innerHTML.split('<');
            e.target.closest('button').innerHTML = `${btnData[0]} <i class="bi bi-caret-down-fill" ></i>`
           
           
            e.target.dataset.tabStatus = "open"

        }

    }
})


} catch (error) {
    
}


    
    


