package com.backend.dto;

import java.util.List;

public class OrderDTO {
    private String estadoPago;
    private String proveedorPago;
    private String idPago;
    private String urlReciboPago;
    private List<OrderItemDTO> items;

    // Constructor
    public OrderDTO(String estadoPago, String proveedorPago, String idPago, String urlReciboPago, List<OrderItemDTO> items) {
        this.estadoPago = estadoPago;
        this.proveedorPago = proveedorPago;
        this.idPago = idPago;
        this.urlReciboPago = urlReciboPago;
        this.items = items;
    }

    // Getters y Setters
    public String getEstadoPago() {
        return estadoPago;
    }

    public void setEstadoPago(String estadoPago) {
        this.estadoPago = estadoPago;
    }

    public String getProveedorPago() {
        return proveedorPago;
    }

    public void setProveedorPago(String proveedorPago) {
        this.proveedorPago = proveedorPago;
    }

    public String getIdPago() {
        return idPago;
    }

    public void setIdPago(String idPago) {
        this.idPago = idPago;
    }

    public String getUrlReciboPago() {
        return urlReciboPago;
    }

    public void setUrlReciboPago(String urlReciboPago) {
        this.urlReciboPago = urlReciboPago;
    }

    public List<OrderItemDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }
}

