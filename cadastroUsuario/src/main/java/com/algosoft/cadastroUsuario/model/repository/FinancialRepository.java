package com.algosoft.cadastroUsuario.model.repository;


import com.algosoft.cadastroUsuario.model.entity.Financial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface FinancialRepository extends JpaRepository<Financial, Long> {
    List<Financial> findAllByOwner(Long owner);
}
