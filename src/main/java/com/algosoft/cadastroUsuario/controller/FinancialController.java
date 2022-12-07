package com.algosoft.cadastroUsuario.controller;


import com.algosoft.cadastroUsuario.model.entity.Financial;
import com.algosoft.cadastroUsuario.model.service.FinancialService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "financials")
public class FinancialController {

    private final FinancialService financialService;

    public FinancialController(FinancialService financialService) {
        this.financialService = financialService;
    }

    @GetMapping
    public ResponseEntity<List<Financial>> getAll() {
        return ResponseEntity.ok(financialService.findAll());
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<Financial> getById(@PathVariable Long id) {
        return ResponseEntity.ok(financialService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Financial> post(@Valid @RequestBody Financial financial) {
        return ResponseEntity.status(HttpStatus.CREATED).body(financialService.saveFinancial(financial));
    }

    @PutMapping(value = "{id}")
    public ResponseEntity<Financial> put(@PathVariable Long id, @Valid @RequestBody Financial financial) {
        return ResponseEntity.status(HttpStatus.OK).body(financialService.updateFinancial(id, financial));

    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        financialService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
