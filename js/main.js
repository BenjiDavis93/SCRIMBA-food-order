"use strict";
import { menu,renderDishes,renderOrderList, getBackgroundElem,renderThanks } from './menu.js';

const menuSectionElem = document.getElementById('menu-section');
const orderSectionElem = document.getElementById('order-section');
const payForm = document.getElementById("consent-form");
const submitBtn = document.getElementById('submit-btn');
const modalWindow = document.getElementById('modal-window');
const choosedDishes = [];

//Read click on Add button
menuSectionElem.addEventListener('click', (e)=>{
    if(e.target.parentElement.dataset.dish && e.target.className === "add-btn"){
        let dishObj = menu.filter(obj => obj.name===e.target.parentElement.dataset.dish)[0];
        choosedDishes.push(dishObj);
        renderOrderList(orderSectionElem,choosedDishes);
    }
})

//Read click on Remove button (span) and order button
orderSectionElem.addEventListener('click', (e)=>{
    if(e.target.className === 'remove-button-span'){
        const removeInd = parseInt(e.target.id[e.target.id.length-1]);
        choosedDishes.splice(removeInd,1);
        renderOrderList(orderSectionElem,choosedDishes);
    }

    if(e.target.id === 'complete-order-btn'){
        modalWindow.style.display = 'inline';
        getBackgroundElem();
    }
})

payForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    const consentFormData = new FormData(payForm)
    const fullName = consentFormData.get('fullName')
    document.querySelectorAll('#consent-form>input').forEach((inp) => {
        inp.value='';
    })
    modalWindow.style.display = 'none';
    document.getElementById('dark-background').remove();

    //HERE MAKE A ORDER COMING MESSAGE
    renderThanks(orderSectionElem,fullName);
    choosedDishes.length = 0; //clearing an array of ordered dishes after payment.
})

//MAIN ENTRY
renderDishes(menuSectionElem);

