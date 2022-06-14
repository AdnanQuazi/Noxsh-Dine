
let tl = new TimelineLite()

export const hideToast = ()=>{
    let toast = document.querySelector('.my-toast')

    tl.to(toast,0.5,{
        opacity : "0",
        display : "none",
        top : window.scrollY
    })

    
    
}
export const showToast = (data)=>{
    let toast = document.querySelector('.my-toast')
    toast.querySelector('span').innerHTML = data
    tl.to(toast,0.5,{
        opacity : "1",
        display : "flex",
        top : window.scrollY + 100

    })
    
    setTimeout(hideToast,4000);

}   

