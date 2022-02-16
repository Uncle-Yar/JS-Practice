'use strict';

//Define elements into variables for readability and lesser code
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.close-modal');
//multiple elements with tha same class = querySelectorAll
const btnsOpenModal = document.querySelectorAll('.show-modal');
//func for = add class 'hidden'
const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden')
}
//func for = remove class 'hiddem'
const showModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
//add event listener to 3 elements with the same class
for (let i = 0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener('click', showModal)
}
//event listener as func expression as variable
btnClose.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

//Key events added to the whole document| event object as parameter in func
document.addEventListener('keydown', function (event) {
    //events = objects & has properties| here i accessed property 'key'
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
        //func already defined, just call
        closeModal();
        //testing
        console.log(`${event.key} has been pressed`);
    }
})