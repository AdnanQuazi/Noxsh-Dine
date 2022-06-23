const scrollToView = (e)=>{
    console.log(e);
    tl3.to(catDiv,0,{
        display : "none"
    },)
     tl3.to(ovfDiv2,0,{
        display : "none",
        top : window.scrollY
    },)
    document.body.classList.remove('ovf');
    catBtn.innerHTML = "Categories"

    document.querySelector(`[data-tab-target='${e}']`).scrollIntoView(true)
}