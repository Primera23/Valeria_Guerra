package com.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Usuario usuario;

    @Column(name = "amount")
    private BigDecimal monto;

    @Column(name = "status")
    private String estadoPago;

    @Column(name = "payment_provider")
    private String proveedorPago;

    @Column(name = "payment_id")
    private String idPago;

    @Column(name = "payment_receipt_url")
    private String urlReciboPago;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> items;

    // Getters y Setters
    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getMonto() {
        return monto;
    }

    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }

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

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
}
