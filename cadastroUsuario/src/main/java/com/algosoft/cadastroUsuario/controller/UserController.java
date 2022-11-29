package com.algosoft.cadastroUsuario.controller;

import com.algosoft.cadastroUsuario.model.dto.RegisterDTO;
import com.algosoft.cadastroUsuario.model.entity.User;
import com.algosoft.cadastroUsuario.model.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(UserController.PATH)
public class UserController {

    public static final String PATH = "/users";

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public User register(@RequestBody @Valid RegisterDTO registerDTO) {
        return this.userService.register(registerDTO);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody @Valid RegisterDTO registerDTO) {
        return this.userService.update(id, registerDTO);
    }

    @PreAuthorize("hasAuthority('USER_ROLE')")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public User findById(@PathVariable Long id) {
        return this.userService.findById(id);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        this.userService.deleteById(id);
    }

    @PreAuthorize("hasAuthority('USER_ROLE')")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<User> findAll() {
        return this.userService.findAll();
    }
}
