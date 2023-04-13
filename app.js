let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

const products = [
    {
        name: 'Cadbury Dairy Milk Silk',
        price: 60,
        image: 'https://m.media-amazon.com/images/I/71L3jWSXHJL._SL1500_.jpg'
      },
      {
        name: 'Nestle KitKat',
        price: 20,
        image: 'https://m.media-amazon.com/images/I/71MZdEMSOaL._SL1500_.jpg'
      },
      {
        name: 'Munch Nuts',
        price: 10,
        image: 'https://m.media-amazon.com/images/I/81FkQamTSEL._SL1500_.jpg'
      },
      {
        name: 'Perk',
        price: 5,
        image: 'https://m.media-amazon.com/images/I/71ErF2P7ffL._SL1500_.jpg'
      },
      {
        name: 'Ferrero Rocher',
        price: 60,
        image: 'https://m.media-amazon.com/images/I/61dzR-ZrIIL.jpg'
      },
      {
        name: 'Amul Dark Chocolate',
        price: 10,
        image: 'https://m.media-amazon.com/images/I/71ay2NlCO3L._SL1200_.jpg'
      },
      {
        name: '5 Star',
        price: 10,
        image: 'https://m.media-amazon.com/images/I/51nx7CevGJL._SL1001_.jpg'
      },
      {
        name: 'Milkybar',
        price: 10,
        image: 'https://m.media-amazon.com/images/I/61+gWWEg66L._SL1000_.jpg'
      },
      {
        name: 'Cadbury Fuse',
        price: 20,
        image: 'https://m.media-amazon.com/images/I/71jjJVtqKKL._SL1500_.jpg'
      },
      {
        name: 'Hershey\'s Chocolate',
        price: 50,
        image: 'https://m.media-amazon.com/images/I/81iF3qPSl5L._SL1500_.jpg'
      }
  ];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price"> Rs. ${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        if(count===8)alert("only 8 items can be added");
        else{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    }
    })
    total.innerText = "Total Price : "+totalPrice.toLocaleString();
    quantity.innerText ="Cart- "+ count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}