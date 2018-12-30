package id1212.se.kth.projectx.application;

import id1212.se.kth.projectx.authentication.Role;
import id1212.se.kth.projectx.authentication.RoleRepository;
import id1212.se.kth.projectx.authentication.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    public void run(ApplicationArguments args) {
        try{
        roleRepository.save(new Role("ROLE_ADMIN"));
        userDetailsService.saveUser("admin", "admin", "ROLE_ADMIN");
        }
        catch(Exception e){
            System.out.println(e);
        }
    }
}