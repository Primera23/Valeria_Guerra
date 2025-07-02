package com.valeria.orders.repository;

import com.valeria.orders.entity.Order;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Order, Integer> {

    @Query("SELECT COUNT(o) FROM Order o WHERE o.status = 'approved'")
    long contarOrdenesAprobadas();
}
