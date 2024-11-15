// Array de productos
const productosArray = [
  {
    id: 1,
    nombre: "Casa Selva Zama",
    precio: 30,
    imagen: "./assets/SALA_PLAFON_GRIS copia.jpg",
  },
  {
    id: 2,
    nombre: "Aldea Zama",
    precio: 15,
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkHcpbkFlDVA_UUcEjIdLsIhuuSFExa5i3Iw&s",
  },
  {
    id: 3,
    nombre: "Kamau Tulum",
    precio: 20,
    imagen:
      "https://plalla.com/wp-content/uploads/2023/08/terraza-exterior-kamau-tulum.webp",
  },
];

// Función para generar productos en el DOM
function generarProductos() {
  const productosContainer = document.querySelector(".productos-container");
  productosContainer.innerHTML = ""; // Limpiamos el contenedor

  productosArray.forEach((producto) => {
    // Crear elementos de la tarjeta
    const divProducto = document.createElement("div");
    divProducto.classList.add("producto");
    divProducto.setAttribute("data-id", producto.id);

    divProducto.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="info">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio} MXN</p>
        <button class="agregar-carrito">Agregar al Carrito</button>
      </div>
    `;

    // Añadir evento de agregar al carrito
    divProducto
      .querySelector(".agregar-carrito")
      .addEventListener("click", () => {
        agregarProductoAlCarrito(producto.id, producto.nombre, producto.precio);
      });

    // Insertar la tarjeta en el contenedor
    productosContainer.appendChild(divProducto);
  });
}

// Obtener los elementos del DOM para el carrito
const carritoContainer = document.getElementById("carrito-container");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const verCarritoButton = document.getElementById("ver-carrito");
const carritoDesplegable = document.getElementById("carrito-desplegable");
const vaciarCarritoButton = document.getElementById("vaciar-carrito");

// Función para obtener el carrito desde el localStorage
function obtenerCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  if (!carrito) {
    carrito = [];
  }
  return carrito;
}

// Función para guardar el carrito en el localStorage
function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarritoUI(carrito);
}

// Función para actualizar el carrito en la interfaz de usuario
function actualizarCarritoUI(carrito) {
  listaCarrito.innerHTML = ""; // Limpiar lista de carrito
  let total = 0;

  // Recorrer los productos en el carrito y agregarlos al HTML
  carrito.forEach((producto) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</span>
      <button class="eliminar-producto" data-id="${producto.id}">Eliminar</button>
    `;
    listaCarrito.appendChild(li);
    total += producto.precio * producto.cantidad;
  });

  // Actualizar el total
  totalCarrito.textContent = total.toFixed(2);

  // Actualizar el número de productos en el carrito
  verCarritoButton.textContent = `Carrito (${carrito.length})`;
}

// Función para agregar productos al carrito
function agregarProductoAlCarrito(id, nombre, precio) {
  const carrito = obtenerCarrito();

  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find((producto) => producto.id === id);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({
      id,
      nombre,
      precio,
      cantidad: 1,
    });
  }

  guardarCarrito(carrito);
}

// Función para eliminar productos del carrito
function eliminarProductoDelCarrito(id) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter((producto) => producto.id !== id);
  guardarCarrito(carrito);
}

// Función para vaciar el carrito
function vaciarCarrito() {
  guardarCarrito([]); // Limpiar el carrito
}

// Evento para mostrar el carrito
verCarritoButton.addEventListener("click", () => {
  carritoDesplegable.classList.toggle("show");
});

// Evento para eliminar productos del carrito
listaCarrito.addEventListener("click", (event) => {
  if (event.target.classList.contains("eliminar-producto")) {
    const id = event.target.getAttribute("data-id");
    eliminarProductoDelCarrito(id);
  }
});

// Evento para vaciar el carrito
vaciarCarritoButton.addEventListener("click", () => {
  vaciarCarrito();
});

// Al cargar la página, actualizar el carrito y los productos desde el array
document.addEventListener("DOMContentLoaded", () => {
  generarProductos();
  const carrito = obtenerCarrito();
  actualizarCarritoUI(carrito);
});
