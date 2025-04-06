const inventario = [];
function agregarProducto(){
  const nombre = document.getElementById("nombreProducto").value.trim();
  const cantidad = parseInt(document.getElementById("cantidadProducto").value);
  const precio = parseFloat(document.getElementById("precioProducto").value);
  if(!nombre || isNaN(cantidad) || isNaN(precio)){
    alert("Completa todos los campos correctamente.");
    return;
  }
  const existente = inventario.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
  if(existente){
    existente.cantidad += cantidad;
    existente.precio = precio; 
  }else{
    inventario.push({ nombre, cantidad, precio });
  }
  alert("Producto añadido.");
  limpiarInputs(["Nombre", "Cantidad", "Precio"]);
}
function mostrarInventario(){
  const div = document.getElementById("inventario");
  if(inventario.length === 0){
    div.innerHTML = "<p>No hay productos en el inventario.</p>";
    return;
  }
  let html = "<table><tr><th>Nombre:</th> <th>Cantidad:</th> <th>Precio:</th></tr>";
  inventario.forEach(p => {
    html += `<tr><td>${p.nombre}</td><td>${p.cantidad}</td><td>$${p.precio.toFixed(2)}</td></tr>`;
  });
  html += "</table>";
  div.innerHTML = html;
}
function venderProducto(){
  const nombre = document.getElementById("nombreVenta").value.trim();
  const cantidad = parseInt(document.getElementById("cantidadVenta").value);
  if(!nombre || isNaN(cantidad)){
    alert("Completa correctamente los campos de venta.");
    return;
  }
  const producto = inventario.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
  if(!producto) {
    alert("Producto no encontrado.");
    return;
  }
  if(producto.cantidad < cantidad){
    alert("Cantidad insuficiente en el inventario.");
    return;
  }
  producto.cantidad -= cantidad;
  alert(`Se vendieron ${cantidad} unidades de ${producto.nombre}.`);
  limpiarInputs(["nombreVenta", "cantidadVenta"]);
}
function buscarProducto(){
  const nombre = document.getElementById("buscarNombre").value.trim();
  const resultado = document.getElementById("resultadoBusqueda");
  if(!nombre){
    alert("Escribe el nombre del producto a buscar.");
    return;
  }
  const producto = inventario.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
  if(!producto){
    resultado.innerHTML = `<p>Producto <strong>${nombre}</strong> no encontrado.</p>`;
  }else{
    resultado.innerHTML = `
      <p><strong>Nombre:</strong> ${producto.nombre}</p>
      <p><strong>Cantidad:</strong> ${producto.cantidad}</p>
      <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
    `;
  }
}
function limpiarInputs(ids){
  ids.forEach(id => document.getElementById(id).value = "");
}