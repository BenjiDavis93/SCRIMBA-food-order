export const menu = [
    {
        name: 'Pizza',
        image: './resources/pizza.png',
        composition: 'pepperoni,mushrom,mozarella',
        price: 14,
        currency: '$'
    },
    {
        name: 'Hamburger',
        image: './resources/hamburger.png',
        composition: 'beef, cheese, lettuce',
        price: 12,
        currency: '$'
    },
    {
        name: 'Beer',
        image: './resources/beer.png',
        composition: 'grain, hops, yeast, water',
        price: 12,
        currency: '$'
    },
    
];

function getTotalPrice(orderArr){
    let sum=0;
    orderArr.forEach((row)=>{
        sum+=row.price;
    })
    return sum;
}

export function getBackgroundElem(){
    const backgroundElem = document.createElement('div');
    backgroundElem.id = 'dark-background';
    backgroundElem.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    backgroundElem.style.position = 'fixed';
    backgroundElem.style.top = '0';
    backgroundElem.style.left = '0';
    backgroundElem.style.width = '100%';
    backgroundElem.style.height = '100%';
    document.body.appendChild(backgroundElem);
    backgroundElem.addEventListener('click',()=>{
        document.querySelectorAll('#consent-form>input').forEach((inp) => {
            inp.value='';
        })
        document.getElementById('modal-window').style.display = 'none';
        document.getElementById('dark-background').remove();
    })
}

export function renderDishes(elemToRenderIn){
    let btnCount = 1;
    menu.forEach((dish)=>{
        let dishHTMLString = `
        <article class="dish" data-dish="${dish.name}">
            <img src="${dish.image}" class="dish-img">
            <div class="dish-text">
                <p class="p-dish-name">${dish.name}</p>
                <p class="p-dish-composition">${dish.composition}</p>
                <p class="p-dish-price">${dish.currency + dish.price}</p>
                </div>
            <button id="${'dish-btn'+btnCount}"class="add-btn">+</button>
        </article>`;
        elemToRenderIn.innerHTML+=dishHTMLString;
        btnCount++;
    })
}

export function renderOrderList(elemToRenderIn, orderArr){
    if(orderArr.length === 0){
        elemToRenderIn.innerHTML='';
        return;
    }
    let removeBtnInd = 0;
    let orderHTMLString = '<h3>Your order</h3>';
    orderArr.forEach((row)=>{
        orderHTMLString += `
        <div class="order-row">
            <div class="order-positions"><h4>${row.name + ''}</h4><span id="remove-button-span${removeBtnInd}" class="remove-button-span"> remove</span></div>
            <span class="price-span">${row.currency+row.price}</span>
        </div>`
        removeBtnInd++;
    })

    orderHTMLString+=`
    <div class="total-price-row">
            <h3>Total price: </h3>
            <span class="price-span">${'$' + getTotalPrice(orderArr)}</span>
        </div>
        <div class="complete-order-btn-container">
            <button id="complete-order-btn" class="complete-order-btn">Complete order</button>
        </div>`;
    
    elemToRenderIn.innerHTML=orderHTMLString;

}

export function renderThanks(elemToRenderIn, fullName){
    const thanks = document.createElement('div');
    thanks.style.width = '450px';
    thanks.style.margin = '20px auto';
    thanks.style.backgroundColor = '#ECFDF5';
    thanks.style.padding = '25px 20px';
    thanks.style.color = '#065F46';
    thanks.style.fontSize = '32px';
    thanks.style.textAlign = 'center';
    thanks.textContent = `Thanks, ${fullName}! Your order is on its way!`;
    elemToRenderIn.innerHTML = '';
    elemToRenderIn.appendChild(thanks);
}