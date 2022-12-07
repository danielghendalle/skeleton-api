package com.algosoft.cadastroUsuario.model.service;

import com.algosoft.cadastroUsuario.model.dto.RegisterDTO;
import com.algosoft.cadastroUsuario.model.entity.Financial;
import com.algosoft.cadastroUsuario.model.entity.User;
import com.algosoft.cadastroUsuario.model.enums.Rules;
import com.algosoft.cadastroUsuario.model.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Não foi possível encontrar o usuário!"));
        Collection<SimpleGrantedAuthority> auths = this.mapAuthorities(user);
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), auths);
    }

    private Collection<SimpleGrantedAuthority> mapAuthorities(User user) {
        Collection<SimpleGrantedAuthority> auths = new ArrayList<>();
        auths.add(new SimpleGrantedAuthority(user.getRules().toString()));
        return auths;
    }

    public User register(RegisterDTO registerDTO) {
        this.validateExists(registerDTO);
        User user = this.mapNewUser(registerDTO);
        return this.userRepository.save(user);
    }

    private void validateExists(RegisterDTO registerDTO) {
        if (this.userRepository.findByUsername(registerDTO.getUsername()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
    }

    private User mapNewUser(RegisterDTO registerDTO) {
        User user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setPassword(this.passwordEncoder.encode(registerDTO.getPassword()));
        user.setRules(Rules.COMMON_CLIENT);
        return user;
    }

    public User findById(Long id) {
        return this.userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(id.toString()));
    }

    public void deleteById(Long id) {
        this.validateExistsById(id);
        this.userRepository.deleteById(id);
    }

    private void validateExistsById(Long id) {
        if (!this.userRepository.existsById(id)) {
            throw new IllegalArgumentException(id.toString());
        }
    }

    public User update(Long id, RegisterDTO registerDTO) {
        User user = this.findById(id);
        user.setUsername(registerDTO.getUsername());
        this.updatePassword(registerDTO, user);
        return this.userRepository.save(user);
    }

    private void updatePassword(RegisterDTO registerDTO, User user) {
        if (StringUtils.hasLength(registerDTO.getPassword()) && !Objects.equals(user.getPassword(), registerDTO.getPassword())) {
            user.setPassword(this.passwordEncoder.encode(registerDTO.getPassword()));
        }
    }

    public User findByUsername(String username) {
        return getByUsername(username);

    }

    private User getByUsername(String username) {
        Optional<User> usernameFinded = userRepository.findByUsername(username);

        if (usernameFinded.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        return usernameFinded.get();
    }
}
