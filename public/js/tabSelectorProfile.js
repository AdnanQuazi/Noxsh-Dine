const  tabs = document.querySelectorAll('[data-tab-target]');
    
    
    const  tabContents = document.querySelectorAll('[data-tab-content]');

    const tabContainer = document.querySelector('.options-dis-con');
    const profilePageCon = document.querySelector('.profile-page-con');
    const tl = new TimelineLite();

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

            if(screen.width < 481){

                document.body.classList.toggle("ovf");
            
            
          
                tl.to(tabContainer, 1, {opacity: 1,
                     display : "flex",
                     bottom : -window.scrollY - 75,
                       
                });

               
            }


           
        })

        
    })

const backIcon = document.querySelectorAll('.bi-chevron-left');

    backIcon.forEach(btn =>{

        btn.addEventListener('click',()=>{
            
            if(screen.width < 481){
                document.body.classList.toggle("ovf");  
                tl.to(tabContainer, 1, {opacity: 0,
                    display : "none",
                    bottom : "-100%",
                    ease : Power2.easeinout
                      
               });
               
            }
    
            
        
        })
    })
    
    

    