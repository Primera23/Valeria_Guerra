package com.backend.controller;

import com.backend.dto.UsuarioDTO;
import com.backend.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }
    @CrossOrigin(origins = "https://https://localhost:3000")
    @GetMapping("/con-ordenes")
    public List<UsuarioDTO> getUsuariosConOrdenes() {
        return usuarioService.obtenerUsuariosConOrdenes();
    }
}
