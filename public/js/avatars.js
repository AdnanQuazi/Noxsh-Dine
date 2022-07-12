let tl = new TimelineLite()

const hideToast = ()=>{
    let toast = document.querySelector('.my-toast')

    tl.to(toast,0.5,{
        opacity : "0",
        display : "none",
        top : "0"
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


const recAvatars = async()=>{
    console.log('Running');
    const avatars = await fetch('/avatars',{
        method : 'POST',
        
    })
    let avatarsData = await avatars.json()
    console.log(avatarsData);
    avatarsData.avatarsTitle.forEach((elem,i )=> {  


            let imgBody = ``; 
            let header = ``;
            avatarsData.avatars[i].forEach((element ,index)=>{

                header = `<h2>${avatarsData.avatars[i][avatarsData.avatars[i].length - 1]}</h2>`
                if(avatarsData.avatars[i].length - 1 == index){
                    
                }else{
                    imgBody = imgBody + `<img onclick="selectedImage(this)" loading="lazy" src="/avatars/${avatarsData.avatars[i][avatarsData.avatars[i].length - 1]}/${element}" alt="">`
                }   

            })

            document.querySelector('.avatars-wrap-con').insertAdjacentHTML('beforeend',` <div class="avatars-con">
            ${header}
            <div class="images-wrap-con">
                 ${imgBody}

            </div>
           
            

        </div>`)
    })
   

}

recAvatars()


function colorSelected (e){
    document.querySelector('.profileImageLabel').style.backgroundColor = e.value
}
function selectedImage(e){
  
    document.querySelector('.profileImg').src = e.getAttribute("src")
}


const changeImg = async()=>{

    let profileImg = document.querySelector('.profileImg').getAttribute("src")
    let profileColor = document.querySelector('input[name=backgroundColor]').value;


    const sendData = await fetch('/edit-profile-img',{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({profileImg,profileColor})       
    })

    const result = await sendData.json()
    if(result){
        showToast("Profile picture changed","#3ea055")
    }else{
        showToast("Failed")
    }
    console.log(profileImg,profileColor)
}