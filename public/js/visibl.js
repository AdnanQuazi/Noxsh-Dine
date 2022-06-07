const visible = document.querySelector('#visible');
const invisible = document.querySelector('#invisible');
const icons = document.querySelector('.eye-icons');


icons.addEventListener('click',()=>{
     
    if(visible.style.display == 'none' && invisible.style.display == 'inline'){
         visible.style.display = 'inline';
         invisible.style.display = 'none';
         password.setAttribute("type","password");
    }else{
         visible.style.display = 'none';
         invisible.style.display = 'inline';
         password.setAttribute("type","text");
    }
})

