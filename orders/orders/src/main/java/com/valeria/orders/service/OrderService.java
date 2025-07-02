package com.valeria.orders.service;

import com.valeria.orders.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public long obtenerTotalOrdenesAprobadas() {
        return orderRepository.contarOrdenesAprobadas();
    }
}
