const tagUl = document.querySelector(".lista-cards");
const tagMain = document.querySelector(".main");
let cartDiv = document.querySelector(".cart");
const ulCart = document.getElementsByClassName("cart-ul");
const cartSession = document.querySelector(".total")
const showValue = document.createElement("p")

let cartData = [];
let filtered = [];

function createList(array) {
  tagUl.innerHTML = ""
  array.forEach((elem) => {
    const list = createCards(elem);
    tagUl.append(list);
  });
}
createList(data);

function createCards(object){
  const img = document.createElement("img");
  const divImg = document.createElement("div");
  const category = document.createElement("p");
  const name = document.createElement("h3");
  const description = document.createElement("p");
  const price = document.createElement("p");
  const button = document.createElement("button");
  const content = document.createElement("div");
  const li = document.createElement("li");

  img.src = object.img;
  divImg.appendChild(img);
  category.innerText = object.tag;
  name.innerText = object.nameItem;
  description.innerText = object.description;
  price.innerText = object.value.toLocaleString("pt-br", {style: "currency", currency: "BRL"});
  button.innerText = object.addCart;

  divImg.classList.add("div-img");
  category.classList.add("product-category");
  name.classList.add("product-name");
  description.classList.add("product-description");
  price.classList.add("product-price");
  content.classList.add("card-content");
  li.classList.add("card-style");
  button.classList.add("add-to-cart-button");

  button.addEventListener("click", function () {
    const search = cartData.find(elem => elem.id === object.id);
    if(!search) filtered.push(object);
    cartData.push(object);
    sum(cartData);
    return createMiniCards(filtered, object, 1);
  });
  
  li.append(divImg, category, name, description, price, button);
  return li;
}

function sum(arr) {
  let valor = 0;
  const total = arr.forEach((elem) => (valor += elem.value));
  createTotal(valor)
}

function createTotal(value) {
  if(value === 0){
   return cartSession.innerHTML = ""
  }
  cartSession.innerHTML = ""
  
  const text = document.createElement('p')
  const total = document.createElement('p')
  
  text.innerHTML = "Total"
  total.innerHTML = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  
  total.classList.add('value')
 
  cartSession.append(text, total)

}
function createMiniCards(cart, object, key) {
  const ul = document.createElement("ul");
  ul.classList.add("cart-ul", "radius");
  cart.forEach((elem) => {
    const li = document.createElement("li");
    li.classList.add("cart-li");
    li.innerHTML = `
    <img class="img-cart-card" src="${elem.img}">
    <div class="cart-card-content">
      <p class="title1">${elem.nameItem}</p>
      <div class="price-and-trash">
        <p class="price">${elem.value.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</p>
        <p class="quantity">${key === 1 && object.id === elem.id ? (elem.repeat += 1) : elem.repeat}</p>
        <img src="./img/trash.png" onclick="removeItem(event, ${elem.id}, ${elem.repeat})">
      </div>
    </div>
    `;
    ul.appendChild(li);
  });
  cartDiv.innerHTML = "";
  cartDiv.appendChild(ul);
}

function removeItem(event, id, repeat) {
  if (repeat === 1) {
    const index = filtered.findIndex((el) => el.id === id);
    filtered.splice(index, 1);
    const index2 = cartData.findIndex((el) => el.id === id);
    cartData.splice(index2, 1);
    sum(cartData);
    createMiniCards(filtered, filtered[0], 0);
  } else {
    const elem = filtered.find((el) => el.id === id);
    elem.repeat--;
    const index2 = cartData.findIndex((el) => el.id === id);
    cartData.splice(index2, 1);
    sum(cartData);
  }
}

// SECTIONS 

const list = document.querySelector(".lista")

list.addEventListener("click", (event)=>{
  event.preventDefault()
  
  const clickEvent = event.target.innerText
 
  if(clickEvent === "Todos"){
    return createList(data)
  }
  if(clickEvent === "Calçados"){
   return searchError()
  }
  const sections = data.filter(elem => elem.tag[0] === clickEvent)
  return createList(sections)
})

const searchError = () =>{
  tagUl.innerHTML = ""
  const divMessage = document.createElement("div")
  const message = document.createElement("h2")

  divMessage.classList.add("message")

  message.innerText = "Produto não encontrado!"

  divMessage.append(message)
 return tagUl.append(divMessage)
} 

// SEARCH BAR

const formDesktop = document.querySelector(".form")
const formMobile = document.querySelector(".form-mobile")
const inputs = document.querySelectorAll('.input, .input-mobile');

inputs.forEach(input => {
input.addEventListener("submit", event => {
event.preventDefault();
callbackSearch(event.target);
});
});

function callbackSearch(form) {
const inputValue = form.value;
if(!inputValue){
return createList(data);
}
const filter = data.filter(elem => elem.nameItem.toLowerCase().includes(inputValue) || elem.tag[0].toLowerCase().includes(inputValue));
if(!filter || !filter[0]){
return searchError();
}
return createList(filter);
}





