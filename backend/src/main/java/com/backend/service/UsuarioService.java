package com.backend.service;

import com.backend.dto.OrderDTO;
import com.backend.dto.OrderItemDTO;
import com.backend.dto.UsuarioDTO;
import com.backend.repository.UsuarioRepository;
import com.backend.entity.Usuario;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<UsuarioDTO> obtenerUsuariosConOrdenes() {
        List<Usuario> usuarios = usuarioRepository.findUsuariosConOrdenes();

        return usuarios.stream().map(usuario -> {
            List<OrderDTO> ordenesDTO = usuario.getOrdenes().stream().map(order -> {
                List<OrderItemDTO> itemsDTO = order.getItems().stream().map(item ->
                        new OrderItemDTO(item.getNombreProducto(), item.getCantidad(), item.getPrecioUnitario())
                ).collect(Collectors.toList());

                return new OrderDTO(
                        order.getEstadoPago(),
                        order.getProveedorPago(),
                        order.getIdPago(),
                        order.getUrlReciboPago(),
                        itemsDTO
                );
            }).collect(Collectors.toList());

            return new UsuarioDTO(usuario.getId(), usuario.getNombre(), usuario.getApellido(), ordenesDTO);
        }).collect(Collectors.toList());
    }

}
