// Variables globales
let nombreUsuario;
let carrito = [];
let totalCompra = 0;

// Catálogo de camisetas disponibles
const remerasDisponibles = [
  { id: 1, nombre: "Real Madrid Titular 2025/2026", precio: 125000 },
  { id: 2, nombre: "Real Madrid Alternativa 2025/2026", precio: 125000 },
  { id: 3, nombre: "Barcelona Titular 2025/2026", precio: 120000 },
  { id: 4, nombre: "Barcelona Alternativa 2025/2026", precio: 120000 },
  { id: 5, nombre: "Boca Juniors Titular 2025", precio: 125000 },
  { id: 6, nombre: "Boca Juniors Alternativa 2025", precio: 125000 },
  { id: 7, nombre: "River Plate Titular 2025", precio: 120000 },
  { id: 8, nombre: "River Plate Alternativa 2025", precio: 120000 },
  { id: 9, nombre: "Manchester United Titular 2025/2026", precio: 125000 },
  { id: 10, nombre: "Manchester United Alternativa 2025/2026", precio: 125000 },
  { id: 11, nombre: "Liverpool Titular 2025/2026", precio: 125000 },
  { id: 12, nombre: "Liverpool Alternativa 2025/2026", precio: 125000 },
  { id: 13, nombre: "Milan Titular 2025/2026", precio: 125000 },
  { id: 14, nombre: "Milan Alternativa 2025/2026", precio: 125000 },
  { id: 15, nombre: "Inter de Milan Titular 2025/2026", precio: 125000 },
  { id: 16, nombre: "Inter de Milan Alternativa 2025/2026", precio: 125000 },
  { id: 17, nombre: "Inter de Miami Titular 2025/2026", precio: 140000 },
  { id: 18, nombre: "Inter de Miami Alternativa 2025/2026", precio: 140000 },
  { id: 19, nombre: "Flamengo Titular 2025", precio: 120000 },
  { id: 20, nombre: "Flamengo Alternativa 2025", precio: 120000 }
];

// Función para solicitar el nombre del usuario
const solicitarNombre = () => {
  alert("¡Bienvenido a Fuerte al Medio! ⚽\nTu tienda de camisetas de fútbol.");

  nombreUsuario = prompt("Ingresá tu nombre para comenzar:");

  // Si el usuario cancela antes de ingresar
  if (nombreUsuario === null) {
    alert("Has cancelado el ingreso. ¡Hasta pronto!");
    console.log("El usuario canceló el ingreso antes de ingresar nombre.");
    return false;
  }

  // Validación: no permitir vacío o solo espacios
  while (nombreUsuario.trim() === "") {
    alert("El nombre no puede estar vacío. Por favor, ingresalo nuevamente.");
    nombreUsuario = prompt("Por favor, escribí tu nombre:");

    if (nombreUsuario === null) {
      alert("Has cancelado el ingreso. ¡Hasta pronto!");
      console.log("El usuario canceló el ingreso durante la validación.");
      return false;
    }
  }

  // Si pasa la validación
  alert(`Hola ${nombreUsuario}, vamos a ver las camisetas disponibles.`);
  console.log("Usuario ingresado:", nombreUsuario);
  return true;
};

// Función para ver las camisetas y comprar 
const mostrarCatalogoYComprar = () => {
  let seguirComprando = true;

  // Bucle principal de compra
  while (seguirComprando) {
    
    let mensajeCatalogo = "Catálogo de camisetas disponibles:\n\n";
    for (let producto of remerasDisponibles) {
      mensajeCatalogo += `${producto.id}. ${producto.nombre} - $${producto.precio}\n`;
    }
    mensajeCatalogo += "\nElegí el número de la camiseta que querés comprar:";
    
    let entrada = prompt(mensajeCatalogo);

    if (entrada === null) {
      alert("Has cancelado la selección. Volvé pronto a Fuerte al Medio ⚽");
      console.log("El usuario canceló la compra durante el catálogo.");
      return;
    }

    // Convertir texto a número
    let idSeleccion = parseInt(entrada);

    //Si no es número válido
    if (isNaN(idSeleccion)) {
      alert("Por favor, ingresá un número válido.");
      continue;
    }

    // Para Buscar el producto
    const productoSeleccionado = remerasDisponibles.find(p => p.id === idSeleccion);

    // Lo agrego
    if (productoSeleccionado) {
      carrito.push(productoSeleccionado);
      totalCompra += productoSeleccionado.precio;
      alert(`Agregaste "${productoSeleccionado.nombre}" al carrito.\nTotal actual: $${totalCompra}`);
      console.log(`Producto agregado: ${productoSeleccionado.nombre} - $${productoSeleccionado.precio}`);
      console.log(`Total actualizado: $${totalCompra}`);
    } else {
      alert("No existe un producto con ese número.");
    }

    //Pregunto si quiere seguir o terminar
    let opcion = prompt("¿Qué querés hacer ahora?\n1 - Seguir comprando\n2 - Finalizar compra");

    //Si elige 2 o cancela, salir
    if (opcion === "2" || opcion === null) {
      seguirComprando = false;
    }
  }

  //Se ejecuta al finalizar el bucle
  if (carrito.length > 0) {
    let eliminar = prompt("¿Querés eliminar algún producto del carrito antes de finalizar? (sí / no)").toLowerCase();

    while (eliminar === "sí" || eliminar === "si") {
      let resumen = "Productos en tu carrito:\n\n";
      carrito.forEach((item, index) => {
        resumen += `${index + 1}. ${item.nombre} - $${item.precio}\n`;
      });

      let eliminarIndex = parseInt(prompt(resumen + "\nIndicá el número del producto que querés eliminar:")) - 1;

      if (eliminarIndex >= 0 && eliminarIndex < carrito.length) {
        let productoEliminado = carrito.splice(eliminarIndex, 1)[0];
        totalCompra -= productoEliminado.precio;
        alert(`Se eliminó "${productoEliminado.nombre}".\nNuevo total: $${totalCompra}`);
      } else {
        alert("Número inválido.");
      }

      eliminar = prompt("¿Querés eliminar otro producto? (sí / no)").toLowerCase();
    }

    let resumen = "Resumen final de tu compra:\n\n";
    for (let item of carrito) {
      resumen += `- ${item.nombre} ($${item.precio})\n`;
    }
    resumen += `\nTotal final: $${totalCompra}`;
    alert(resumen);
    alert(`Gracias por tu compra, ${nombreUsuario}. ¡Volvé pronto a Fuerte al Medio! ⚽`);
    console.log("Compra finalizada por:", nombreUsuario);
    console.log("Productos comprados:", carrito);
    console.log("Total final:", totalCompra);
  } else {
    alert("No agregaste ningún producto al carrito.");
  }
};

// Flujo principal
if (solicitarNombre()) {
  mostrarCatalogoYComprar();
}