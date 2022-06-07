const tl4 = new TimelineLite()

// const animateButton = document.querySelectorAll('[data-tab-target]');



// animateButton.forEach(elem =>{

    

//     elem.addEventListener('click', ()=>{

      

//     })
// })


const menuWrapCon2 = document.querySelector('.menu-wrap-con');

menuWrapCon2.addEventListener('click', (e)=>{

    if(e.target.classList.contains('specify-head')){
        console.log("sdas");
        const animateDiv = document.querySelectorAll('[data-tab-content]');
        let target;
        
        animateDiv.forEach(element =>{

            if(e.target.dataset.tabTarget == element.dataset.tabContent){
                target = element
            }

        })

        if(e.target.dataset.tabStatus == "open"){
            let tab = document.getElementById(e.target.dataset.tabTarget);
            
           
             tl4.to(tab,0.5, {height:"0", opacity : "0"},);
                let targetBtn = e.target.closest('button');
                let btnData = targetBtn.innerHTML.split('<');
                e.target.closest('button').innerHTML = `${btnData[0]} <i class="bi bi-caret-up-fill"></i>`
                
                
                

            

           
            e.target.dataset.tabStatus = "close"
        }else if(e.target.dataset.tabStatus == "close"){
            let tab = document.getElementById(e.target.dataset.tabTarget);

           

            tl4.to(tab,0.5,{
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