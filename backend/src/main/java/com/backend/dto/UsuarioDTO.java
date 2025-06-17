package com.backend.dto;

import java.util.List;

public class UsuarioDTO {
    private Integer id;
    private String nombre;
    private String apellido;
    private List<OrderDTO> ordenes;

    // Constructor vacío (por defecto)
    public UsuarioDTO() {
    }

    // Constructor con todos los campos
    public UsuarioDTO(Integer id, String nombre, String apellido, List<OrderDTO> ordenes) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.ordenes = ordenes;
    }

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public List<OrderDTO> getOrdenes() {
        return ordenes;
    }

    public void setOrdenes(List<OrderDTO> ordenes) {
        this.ordenes = ordenes;
    }
}

