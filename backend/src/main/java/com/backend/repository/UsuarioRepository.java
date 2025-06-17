package com.backend.repository;

import com.backend.entity.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {

    @Query("SELECT DISTINCT u FROM Usuario u JOIN u.ordenes o")
    List<Usuario> findUsuariosConOrdenes();
}
