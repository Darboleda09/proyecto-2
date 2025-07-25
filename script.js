let carrito = [];
let total = 0;

let bglista = document.getElementById("listaul");
let bgcarrito = document.getElementById("carrito");
let boton = document.getElementById("boton");
let totalElement = document.getElementById("total");

// Mostrar carrito siempre
bgcarrito.style.display = "block";

// Recuperar datos del localStorage al cargar
window.onload = () => {
  const datos = JSON.parse(localStorage.getItem("carrito"));
  if (datos) {
    carrito = datos;
    total = carrito.reduce((acc, item) => acc + item.precio, 0);
    document.getElementById('cart-count').textContent = carrito.length;
    actualizarCarrito();
  }
};

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;
  localStorage.setItem("carrito", JSON.stringify(carrito));
  document.getElementById('cart-count').textContent = carrito.length;
  actualizarCarrito();
}

function eliminarItem(index) {
  total -= carrito[index].precio;
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  document.getElementById('cart-count').textContent = carrito.length;
  actualizarCarrito();
}

function actualizarCarrito() {
  bglista.innerHTML = "";

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre}<br>$${item.precio} USD 
      <span class="eliminar-item" onclick="eliminarItem(${index})">❌</span>
    `;
    bglista.appendChild(li);
  });

  if (carrito.length > 0) {
    boton.style.display = "block";
    totalElement.textContent = `Total: $${total} USD`;
  } else {
    totalElement.textContent = "";
    boton.style.display = "none";
  }
}

boton.addEventListener("click", () => {
  alert(`Gracias por su compra. Total: $${total} USD`);
  // Redirección futura:
  // window.location.href = "checkout.html";
});
