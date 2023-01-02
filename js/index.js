const tagUl = document.querySelector(".lista-cards");
const tagMain = document.querySelector(".main");
let cartDiv = document.querySelector(".cart");
const ulCart = document.getElementsByClassName("cart-ul");
const cartSession = document.querySelector(".total")
let cartData = [];
let filtered = [];
function createList(array) {
  array.forEach((elem) => {
    const list = createCard(elem);
    tagUl.append(list);
  });
}
createList(data);

function createCard(object) {
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
    cartData.push(object);
    filtered = [...new Set(cartData)];
    createMiniCards(filtered);
    sum(cartData);
  });

  divImg.append(img);
  content.append(category, name, description, price);
  li.append(divImg, content, button);

  return li;
}
const showValue = document.createElement("p")

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

function createMiniCards(cart) {
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
    quantity.innerHTML = "1x";
    trash.src = "./img/trash.png";

    var id = elem.id;

    li.classList.add("cart-li");
    img.classList.add("img-cart-card");
    div1.classList.add("cart-card-content");
    name.classList.add("title1");
    div2.classList.add("price-and-trash");
    price.classList.add("price");
    quantity.classList.add("quantity");

    trash.addEventListener("click", function () {
      const index = filtered.findIndex((elem) => elem.id === id);
      filtered.splice(index, 1);
      const index2 = cartData.findIndex((elem) => elem.id === id);

      cartData.splice(index2, 1);

      sum(cartData);
      createMiniCards(filtered);
    });

    div2.append(price, quantity, trash);
    div1.append(name, div2);
    li.append(img, div1);

    ul.appendChild(li);
    cartDiv.appendChild(ul);
  });
}
