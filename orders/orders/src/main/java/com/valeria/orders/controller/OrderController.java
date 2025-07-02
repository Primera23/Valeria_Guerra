package com.valeria.orders.controller;
import java.util.Map;
import java.util.HashMap;

import com.valeria.orders.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"https://localhost:3000", "https://localhost:3001"}) // 👈 Permite solicitudes CORS desde tu frontend
@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping("/cuentas")
    public Map<String, Object> contarOrdenesAprobadas() {
        long totalVentas = orderRepository.contarOrdenesAprobadas();

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("totalVentas", totalVentas);
        return response;
    }
}

