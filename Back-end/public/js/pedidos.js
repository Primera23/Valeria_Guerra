async function cargarPedidosAdmin() {
  try {
    const response = await fetch('/admin/pedidos'); // ruta que apunte al backend
    const pedidos = await response.json();

    const tbody = document.getElementById('pedidoTableBody');
    tbody.innerHTML = '';

    pedidos.forEach((pedido, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="px-6 py-4">${index + 1}</td>
        <td class="px-6 py-4">${new Date(pedido.fecha_pedido).toLocaleString('es-CO', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })}</td>
        <td class="px-6 py-4">${pedido.productos}</td>
        <td class="px-6 py-4">${pedido.estado === 'approved' ? 'Por entregar' : pedido.estado}</td>
        <td class="px-6 py-4">
          <strong>${Number(pedido.total_pagado).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</strong><br>
          <small>ID Pago: ${pedido.payment_id}</small><br>
          <small>Cliente: ${pedido.nombre_completo}</small><br>
          <small>Correo: ${pedido.correo_usuario}</small>
        </td>
      `;
      tbody.appendChild(row);
    });

  } catch (error) {
    console.error('Error al cargar pedidos:', error);
  }
}

document.addEventListener('DOMContentLoaded', cargarPedidosAdmin);