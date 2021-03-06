package id1212.se.kth.projectx.sevices;

import id1212.se.kth.projectx.data.Role;
import id1212.se.kth.projectx.data.User;
import id1212.se.kth.projectx.util.UserAlreadyExistAuthenticationException;
import id1212.se.kth.projectx.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository repository;

    @Autowired
    private RoleService roleService;

    private final AccountStatusUserDetailsChecker detailsChecker = new AccountStatusUserDetailsChecker();

    @Override
    public final User loadUserByUsername(String username) throws UsernameNotFoundException {
        final User user = repository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        detailsChecker.check(user);
        return user;
    }


    public User saveUser(String username, String password, String role) throws UserAlreadyExistAuthenticationException {
        try {
            Set<Role> authorities = new HashSet<>(Arrays.asList(
                    roleService.findByName(role)
            ));
            User user = new User(username, passwordEncoder.encode(password), authorities);
            repository.save(user);
            return user;
        }
        catch (Exception e){
            throw new UserAlreadyExistAuthenticationException("User exists");
        }
    }
}
