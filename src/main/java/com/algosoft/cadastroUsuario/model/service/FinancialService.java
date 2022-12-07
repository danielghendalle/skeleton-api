package com.algosoft.cadastroUsuario.model.service;

import com.algosoft.cadastroUsuario.model.entity.Financial;
import com.algosoft.cadastroUsuario.model.repository.FinancialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FinancialService {

    private final FinancialRepository financialRepository;

    private final UserService userService;


    public List<Financial> findAll() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return financialRepository.findAllByOwner(userService.findByUsername(user.getUsername()).getId());
    }


    public Financial findById(Long id) {

        Optional<Financial> financialId = financialRepository.findById(id);

        if (financialId.isPresent()) {
            return financialId.get();
        }
        throw new NotFoundException("Não foi possível encontrar o Valor!");

    }

    public Financial saveFinancial(Financial financial) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        financial.setOwner(userService.findByUsername(user.getUsername()).getId());
        return financialRepository.save(financial);
    }

    public Financial updateFinancial(Long id, Financial financial) {

        Optional<Financial> financialSaved = financialRepository.findById(id);

        if (financialSaved.isPresent()) {
            Financial financialUpdate = financialSaved.get();
            financialUpdate.setIdentificator(financial.getIdentificator());
            financialUpdate.setValue(financial.getValue());

            return financialRepository.save(financialUpdate);
        }
        throw new NotFoundException("Não foi possível encontrar o Valor");
    }

    public void delete(Long id) {

        Optional<Financial> financial = financialRepository.findById(id);
        if (financial.isPresent()) {
            financialRepository.deleteById(id);
            return;
        }
        throw new NotFoundException("Não foi possível encontrar o Valor");
    }


}
