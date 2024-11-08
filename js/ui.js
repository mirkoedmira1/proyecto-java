import { getCartItems } from "./cart.js";

const products = [
  {
    id: 1,
    title: "Casa Aldea Zama",
    price: 36000.0,
    image:
      "https://plalla.com/wp-content/uploads/2023/08/fachada-kamau-tulum.webp",
  },
  {
    id: 2,
    title: "Casa Veleta",
    price: 29000.0,
    image:
      "https://img10.naventcdn.com/avisos/18/01/44/68/20/91/360x266/1488496944.jpg?isFirstImage=true",
  },
  {
    id: 3,
    title: "Casa Guerra de Castas",
    price: 23000.0,
    image:
      "https://images.homify.com/v1635791346/p/photo/image/4007525/ARVIZ_EBANO_C03.jpg",
  },
  {
    id: 4,
    title: "Casa Riviera Tulum",
    price: 30000.0,
    image:
      "https://i.pinimg.com/originals/20/b6/8e/20b68ef0feb00abded2ac3a4607d9a55.jpg",
  },
];
export const renderProducts = () => {
  const productList = document.getElementById("productList");

  products.forEach((product) => {
    const productCard = document.createElement("article");
    productCard.classList.add("product");
    productCard.setAttribute("data-id", product.id);

    productCard.innerHTML = `
        <div>
          <img class="product__image" src="${product.image}" alt="${
      product.title
    }" />
        </div>
        <div>
          <h5 class="product__title">${product.title}</h5>
          <p class="product__price">$${product.price.toFixed(2)}</p>
        </div>
        <button class="product__add">Agregar</button>
      `;

    productList.append(productCard);
  });
};

export const updateCartUi = () => {
  const cartContainer = document.querySelector(".cart__container");

  cartContainer.innerHTML = "";
  const cartItems = getCartItems();

  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart__item");
    cartItem.setAttribute("data-id", item.id);

    cartItem.innerHTML = `

          <div class="cart__item-title">${item.title}</div>
          <div>${item.price}</div>
          <div>
            <button class="cart__increase">+</button>
            <button class="cart__decrease">-</button>
            <button class="cart__remove">Eliminar</button>
          </div>

      
      `;

    cartContainer.appendChild(cartItem);
  });
};
