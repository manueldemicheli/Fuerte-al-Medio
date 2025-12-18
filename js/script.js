// VARIABLES GLOBALES

// Recuperar carrito desde localStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let totalCompra = JSON.parse(localStorage.getItem("totalCompra")) || 0;

console.log("Carrito cargado desde LocalStorage:", carrito);
console.log("Total inicial:", totalCompra);

// CATÁLOGO DE REMERAS

const remerasDisponibles = [
  { id: 1, nombre: "Real Madrid Titular 2025/2026", precio: 125000, img: "RMTIT2025.avif" },
  { id: 2, nombre: "Real Madrid Alternativa 2025/2026", precio: 125000, img: "RMALT2025.avif" },

  { id: 3, nombre: "Barcelona Titular 2025/2026", precio: 120000, img: "BRCTIT2025.jpg" },
  { id: 4, nombre: "Barcelona Alternativa 2025/2026", precio: 120000, img: "BRCALT2025.webp" },

  { id: 5, nombre: "Boca Juniors Titular 2025", precio: 125000, img: "BOCTIT2025.avif" },
  { id: 6, nombre: "Boca Juniors Alternativa 2025", precio: 125000, img: "BOCALT2025.avif" },

  { id: 7, nombre: "River Plate Titular 2025", precio: 120000, img: "RIVTIT2025.avif" },
  { id: 8, nombre: "River Plate Alternativa 2025", precio: 120000, img: "RIVALT2025.avif" },

  { id: 9, nombre: "Manchester United Titular 2025/2026", precio: 125000, img: "MANTIT2025.avif" },
  { id: 10, nombre: "Manchester United Alternativa 2025/2026", precio: 125000, img: "MANALT2025.avif" },

  { id: 11, nombre: "Liverpool Titular 2025/2026", precio: 125000, img: "LIVTIT2025.avif" },
  { id: 12, nombre: "Liverpool Alternativa 2025/2026", precio: 125000, img: "LIVALT2025.avif" },

  { id: 13, nombre: "Milan Titular 2025/2026", precio: 125000, img: "MILTIT2025.jpg" },
  { id: 14, nombre: "Milan Alternativa 2025/2026", precio: 125000, img: "MILALT2025.jpg" },

  { id: 15, nombre: "Inter de Milan Titular 2025/2026", precio: 125000, img: "INTTIT2025.jpg" },
  { id: 16, nombre: "Inter de Milan Alternativa 2025/2026", precio: 125000, img: "INTALT2025.jpg" },

  { id: 17, nombre: "Inter de Miami Titular 2025/2026", precio: 140000, img: "INTMIATIT2025.avif" },
  { id: 18, nombre: "Inter de Miami Alternativa 2025/2026", precio: 140000, img: "INTMIAALT2025.avif" },

  { id: 19, nombre: "Flamengo Titular 2025", precio: 120000, img: "FLATIT2025.jpg" },
  { id: 20, nombre: "Flamengo Alternativa 2025", precio: 120000, img: "FLAALT2025.jpg" }
];

// RENDER DINÁMICO DEL CATÁLOGO

const catalogo = document.getElementById("catalogo");

function mostrarRemeras(lista) {
  console.log(" Renderizando catálogo con:", lista.length, "remeras");

  catalogo.innerHTML = "";

  lista.forEach((remera) => {
    const card = document.createElement("div");
    card.classList.add("producto");

    card.innerHTML = `
      <img src="./assets/${remera.img}" alt="${remera.nombre}">
      <h3>${remera.nombre}</h3>
      <p>$${remera.precio}</p>
      <button class="boton-agregar btn-agregar" data-id="${remera.id}">Agregar</button>
    `;

    catalogo.appendChild(card);
  });
}

// Llamada inicial
mostrarRemeras(remerasDisponibles);

// EVENTOS PARA AGREGAR / ELIMINAR

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-agregar")) {
    const id = parseInt(e.target.dataset.id);
    console.log("Click en AGREGAR - ID:", id);
    agregarAlCarrito(id);
  }

  if (e.target.classList.contains("btn-eliminar")) {
    const id = parseInt(e.target.dataset.id);
    console.log("Click en ELIMINAR - ID:", id);
    eliminarProducto(id);
  }
});

// AGREGAR PRODUCTO AL CARRITO

function agregarAlCarrito(id) {
  const producto = remerasDisponibles.find(p => p.id === id);
  const existente = carrito.find(item => item.id === id);

  if (existente) {
    existente.cantidad++;
    console.log(`Se aumentó cantidad de ${producto.nombre}. Cantidad:`, existente.cantidad);
  } else {
    carrito.push({ ...producto, cantidad: 1 });
    console.log(`Producto agregado al carrito: ${producto.nombre}`);
  }

  totalCompra += producto.precio;
  console.log("Total actualizado:", totalCompra);

// Notificacion de agregado

  Toastify({
    text: `${producto.nombre} agregado al carrito`,
    duration: 2000,
    gravity: "top",
    position: "left",
    style: {
      background: "green",
      color: "white",
    }
  }).showToast();


  guardarEnLocalStorage();
  actualizarCarrito();
}

// RENDER DEL CARRITO

function actualizarCarrito() {
  console.log("Renderizando carrito. Cantidad de items:", carrito.length);

  const divCarrito = document.getElementById("carrito");
  divCarrito.innerHTML = "";

  carrito.forEach(item => {
    const fila = document.createElement("div");
    fila.classList.add("item-carrito");

    fila.innerHTML = `
      <span>${item.nombre} x${item.cantidad}</span>
      <span>$${item.precio * item.cantidad}</span>
      <button class="btn-eliminar" data-id="${item.id}">X</button>
    `;

    divCarrito.appendChild(fila);
  });

  document.getElementById("total").textContent = `Total: $${totalCompra}`;
}

// ELIMINAR PRODUCTO DEL CARRITO

function eliminarProducto(id) {
  const producto = carrito.find(p => p.id === id);

  if (!producto) return;

  console.log(`Eliminando ${producto.nombre}`);

  totalCompra -= producto.precio;

  if (producto.cantidad > 1) {
    producto.cantidad--;
    console.log(`Se redujo cantidad de ${producto.nombre}. Nueva cantidad:`, producto.cantidad);
  } else {
    carrito = carrito.filter(p => p.id !== id);
    console.log(`Producto eliminado del carrito: ${producto.nombre}`);
  }

  console.log("Total actualizado:", totalCompra);

  guardarEnLocalStorage();
  actualizarCarrito();
}

// LOCAL STORAGE

function guardarEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("totalCompra", JSON.stringify(totalCompra));
  console.log("Guardado en LocalStorage");
}

// CARGAR CARRITO AL INICIAR

actualizarCarrito();

// BUSCADOR / FILTRO

const buscador = document.getElementById("buscador");
const btnBuscar = document.getElementById("btnBuscar");

// Buscar al hacer clic en el botón
btnBuscar.addEventListener("click", () => {
  ejecutarBusqueda();
});

// Buscar al presionar Enter dentro del input
buscador.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    ejecutarBusqueda();
  }
});

function ejecutarBusqueda() {
  const texto = buscador.value.toLowerCase().trim();

  console.log("Buscando:", texto);

  const resultado = remerasDisponibles.filter(remera =>
    remera.nombre.toLowerCase().includes(texto)
  );

  console.log("Resultados encontrados:", resultado.length);

  mostrarRemeras(resultado);
}


// POPUP INSTAGRAM A LOS 3 SEGUNDOS
setTimeout(() => {
  const popup = document.getElementById("popup-instagram");
  popup.classList.remove("popup-oculto");
}, 3000);

// CERRAR POPUP 
document.addEventListener("click", (e) => {
  if (e.target.id === "cerrar-popup") {
    document.getElementById("popup-instagram").classList.add("popup-oculto");
  }
});


// POPUP DE INACTIVIDAD

// Frases futboleras aleatorias
const frasesInactividad = [
  "¿Qué hacés? ¡No te quedés mirando, esto no es la platea!",
  "¡No te vayas que sos nuestra figura!",
  "Se fueron todos al vestuario… ¿No me digas que vos también?"
];

let timerInactividad;
let intervaloFrases;
const tiempoParaMostrar = 15000; // 15 segundos

// Elementos del popup
const popupInactividad = document.getElementById("popup-inactividad");
const mensajeInactividad = document.getElementById("mensaje-inactividad");
const cerrarInactividad = document.getElementById("cerrar-inactividad");

// Función para mostrar frase aleatoria 
const mostrarFraseAleatoria = () => {
  const random = Math.floor(Math.random() * frasesInactividad.length);
  mensajeInactividad.textContent = frasesInactividad[random];
};

// Mostrar popup
const mostrarPopupInactividad = () => {
  mostrarFraseAleatoria();
  popupInactividad.style.display = "flex";

  // Cambiar frase cada 5 segundos
  intervaloFrases = setInterval(() => mostrarFraseAleatoria(), 5000);
};

// Ocultar popup
const ocultarPopupInactividad = () => {
  popupInactividad.style.display = "none";
  clearInterval(intervaloFrases);
  reiniciarInactividad();
};

// Reiniciar contador
const reiniciarInactividad = () => {
  clearTimeout(timerInactividad);
  timerInactividad = setTimeout(() => mostrarPopupInactividad(), tiempoParaMostrar);
};

// Eventos que resetean inactividad
document.addEventListener("mousemove", () => reiniciarInactividad());
document.addEventListener("keypress", () => reiniciarInactividad());
document.addEventListener("click", () => reiniciarInactividad());

// Botón cerrar
cerrarInactividad.addEventListener("click", () => ocultarPopupInactividad());

// Iniciar contador al cargar 
reiniciarInactividad();

//Notificaciones

document.getElementById("btn-finalizar").addEventListener("click", () => {
  Swal.fire({
    title: "¡Gracias por tu compra!",
    text: "Tu pedido está siendo procesado.",
    icon: "success",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "green"
  });
});

