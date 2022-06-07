
let followBtn;
let unfollowBtn;

const getUsers = async(e)=>{
    const dataF = await fetch("/search-user",{
        method : "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({payload: e.value})
    })

    const fetchedData = await dataF.json()
    const usersCon =  document.querySelector('.users-con');
    usersCon.innerHTML = '';
    fetchedData.finalData.forEach(elem =>{
        let btn;
    try {
        if(elem.following[0]){
            btn = `<button class="unfollow"  data-tab-target="unfollow" id="${elem._id}">Unfollow</button>`
        }
    } catch (error) {
        btn = `<button class="follow" id="${elem._id}"  data-tab-target="follow">Follow</button>`
    } 
       
        let htmlData = `<div class="user" onclick="redirectToUser('${elem.username}')">
        <img loading="lazy" src="/images/profimg.jpg" alt="">
        <div class="user-det">
            <h4 class="user-name">${elem.name}</h4>
            <p class="user-username">${elem.username}</p>

        </div>
        ${btn}
    </div>`

   usersCon.insertAdjacentHTML('beforeend', htmlData);
    })

   
    followBtn = document.querySelectorAll('.follow');
    unfollowBtn = document.querySelectorAll('.unfollow');


    applyL();

}

   const followUser =  async(event)=>{
    event.stopPropagation();
    if(event.target.dataset.tabTarget == "follow"){

        event.target.dataset.tabTarget = "unfollow"
        event.target.innerHTML = "Unfollow"
        event.target.classList.remove('follow')
        event.target.classList.add('unfollow')

        const follow = await fetch(`/follow/${event.target.id}`, {
            method : "POST"
       })
      
    }else if(event.target.dataset.tabTarget == "unfollow"){
        event.target.dataset.tabTarget = "follow"
        event.target.innerHTML = "Follow"
        event.target.classList.remove('unfollow')
        event.target.classList.add('follow')
        const follow = await fetch(`/unfollow/${event.target.id}`, {
            method : "POST"
       })
       

    }
    
   

}

function applyL(){
    if(followBtn && unfollowBtn){
        unfollowBtn.forEach(elem =>{
            
            elem.addEventListener('click',followUser);
        
        })
        followBtn.forEach(elem =>{
            
            elem.addEventListener('click',followUser);
        
        })
    }else if(followBtn && !unfollowBtn){
        followBtn.forEach(elem =>{
            
            elem.addEventListener('click',followUser);
        
        })

    }else if(!followBtn && unfollowBtn){
        unfollowBtn.forEach(elem =>{
            
            elem.addEventListener('click',followUser);
        
        })
    }
}

applyL()

const redirectToUser = (e)=>{
    window.location.href = `/user/${e}`
}

