// Obtener elementos
const carritoContainer = document.getElementById("carrito-container");
const carritoDesplegable = document.getElementById("carrito-desplegable");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const verCarritoButton = document.getElementById("ver-carrito");
const vaciarCarritoButton = document.getElementById("vaciar-carrito");

const botonesAgregar = document.querySelectorAll(".agregar-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para actualizar la vista del carrito
function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio} x ${item.cantidad} 
      <button class="restar-cantidad" data-id="${item.id}">-</button> 
      <button class="sumar-cantidad" data-id="${item.id}">+</button>
      <button class="eliminar" data-id="${item.id}">Eliminar</button>
    `;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });

  totalCarrito.textContent = total.toFixed(2);
  verCarritoButton.textContent = `Carrito (${carrito.length})`;

  // Guardar en el localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para agregar al carrito
function agregarAlCarrito(e) {
  const producto = e.target.closest(".producto");
  const id = producto.dataset.id;
  const nombre = producto.querySelector("h3").textContent;
  const precio = parseFloat(
    producto.querySelector("p").textContent.replace("$", "")
  );

  // Verificar si el producto ya está en el carrito
  const productoEnCarrito = carrito.find((item) => item.id === id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }

  actualizarCarrito();
}

// Función para restar cantidad
function restarCantidad(e) {
  const id = e.target.dataset.id;
  const producto = carrito.find((item) => item.id === id);

  if (producto) {
    producto.cantidad--;
    if (producto.cantidad === 0) {
      carrito = carrito.filter((item) => item.id !== id);
    }
  }

  actualizarCarrito();
}

// Función para sumar cantidad
function sumarCantidad(e) {
  const id = e.target.dataset.id;
  const producto = carrito.find((item) => item.id === id);

  if (producto) {
    producto.cantidad++;
  }

  actualizarCarrito();
}

// Función para eliminar producto del carrito
function eliminarProducto(e) {
  const id = e.target.dataset.id;
  carrito = carrito.filter((item) => item.id !== id);
  actualizarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

// Mostrar/ocultar el carrito desplegable
verCarritoButton.addEventListener("click", () => {
  carritoDesplegable.classList.toggle("show");
});

// Asignar los eventos de agregar productos al carrito
botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", agregarAlCarrito);
});

// Asignar eventos a los botones de "restar", "sumar" y "eliminar"
listaCarrito.addEventListener("click", (e) => {
  if (e.target.classList.contains("restar-cantidad")) {
    restarCantidad(e);
  }

  if (e.target.classList.contains("sumar-cantidad")) {
    sumarCantidad(e);
  }

  if (e.target.classList.contains("eliminar")) {
    eliminarProducto(e);
  }
});

// Vaciar el carrito
vaciarCarritoButton.addEventListener("click", vaciarCarrito);

// Inicializar el carrito al cargar la página
actualizarCarrito();
