const  tabs = document.querySelectorAll('[data-tab-target]');

    const sideNav = document.querySelector('.side-nav');
    const  tabContents = document.querySelectorAll('[data-tab-content]');

    tabs.forEach(tab =>{
        
        
        
        tab.addEventListener('click', ()=>{
                
               tabs.forEach(tab =>{
                tab.classList.remove('active');
               })
             
               
                tab.classList.add('active');
        
            
            const target = document.querySelector(tab.dataset.tabTarget)
            
            tabContents.forEach(tabContent =>{
                tabContent.classList.remove('active');
            })

            target.classList.add('active')
            

        })

        
    })

    // sideNav.addEventListener('click',()=>{
    //     if(sideNav.style.width === '32rem'){
    //         sideNav.style.width = '6.5rem'
    //     }else{
    //         sideNav.style.width = '32rem'
    //     }
            
    // })