const heartBtn = document.querySelector('.heart-btn');
const heartIcon = document.querySelector('i.fa-heart');
heartBtn.addEventListener ('click',()=>{
    heartIcon.classList.toggle('fa-solid');

})