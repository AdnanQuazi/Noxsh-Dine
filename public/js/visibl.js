const visible = document.querySelector('#visible');
const invisible = document.querySelector('#invisible');
const icons = document.querySelector('.eye-icons');
const passwordd = document.querySelector('#password');  

icons.addEventListener('click',()=>{
     
    if(visible.style.display == 'none' && invisible.style.display == 'inline'){
         visible.style.display = 'inline';
         invisible.style.display = 'none';
         passwordd.setAttribute("type","password");
    }else{
         visible.style.display = 'none';
         invisible.style.display = 'inline';
         passwordd.setAttribute("type","text");
    }
})

