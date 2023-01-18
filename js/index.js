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

  img.src = `${object.img}`;
  category.innerText = object.tag;
  name.innerText = object.nameItem;
  description.innerText = object.description;
  price.innerText = object.value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  button.innerText = object.addCart;

  divImg.classList.add("div-img");
  category.classList.add("product-category");
  name.classList.add("product-name");
  description.classList.add("product-description");
  price.classList.add("product-price");
  button.classList.add("add-to-cart-button");

  content.classList.add("card-content");
  li.classList.add("card-style");

  button.addEventListener("click", function () {
    const search = cartData.find((elem) => elem.id === object.id)
    
   if(!search){
      filtered.push(object)
      cartData.push(object)
      sum(cartData) 
     return createMiniCards(filtered, object, 1)
   }
      cartData.push(object)
      createMiniCards(filtered,object,1)
      sum(cartData);
     
  });

  divImg.append(img);
  content.append(category, name, description, price);
  li.append(divImg, content, button);

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

function createMiniCards(cart, object, key){

  const ul = document.createElement("ul");
  ul.innerHTML = "";
  cartDiv.innerHTML = "";
  ul.classList.add("cart-ul", "radius");

  cart.forEach((elem) => {
    const trash = document.createElement("img");
    const price = document.createElement("p");
    const quantity = document.createElement("p");
    const div2 = document.createElement("div");
    const name = document.createElement("p");
    const div1 = document.createElement("div");
    const img = document.createElement("img");
    const li = document.createElement("li");

    img.src = `${elem.img}`;
    name.innerHTML = elem.nameItem;
    price.innerHTML = elem.value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    
    trash.src = "./img/trash.png";
   
    if (key === 1 && object.id === elem.id){
    
      elem.repeat = elem.repeat + 1
      quantity.innerHTML = elem.repeat
      
      quantity.innerHTML = elem.repeat
    }
    else{
      quantity.innerHTML = elem.repeat
    }
    

    li.classList.add("cart-li");
    img.classList.add("img-cart-card");
    div1.classList.add("cart-card-content");
    name.classList.add("title1");
    div2.classList.add("price-and-trash");
    price.classList.add("price");
    quantity.classList.add("quantity");

    trash.addEventListener("click", function () {
      if(elem.repeat === 1){
        elem.repeat = 0
        
        const index = filtered.findIndex((el) => el.id === elem.id);
          filtered.splice(index, 1);

        const index2 = cartData.findIndex((el) => el.id === elem.id);
          cartData.splice(index2, 1);
         
      
      sum(cartData);
      createMiniCards(filtered, filtered[0],0)
      }
      else{
        
        elem.repeat--
        quantity.innerHTML = elem.repeat
        const index2 = cartData.findIndex((el) => el.id === elem.id);
        cartData.splice(index2, 1);
         
      sum(cartData);
      }
      
    });

    div2.append(price, quantity, trash);
    div1.append(name, div2);
    li.append(img, div1);

    ul.appendChild(li);
    cartDiv.appendChild(ul);
  });
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

const inputDesktop = document.querySelector(".input")
const inputMobile = document.querySelector(".input-mobile")

formDesktop.addEventListener("submit", (event)=>{
  event.preventDefault()
  callbackSearch(formDesktop)
})
formMobile.addEventListener("submit", (event)=>{
  event.preventDefault()
  callbackSearch(formMobile)
})
function callbackSearch(form) {
  const values = [...form]
  const inputValue = values[0].value
  if(!inputValue){
    return createList(data)
  }
  const filter = data.filter(
  (elem) => elem.nameItem.toLowerCase().includes(inputValue) || elem.tag[0].toLowerCase().includes(inputValue))
  if(!filter){
    return searchError()
  }
  return createList(filter)
}
