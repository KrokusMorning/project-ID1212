package id1212.se.kth.projectx.controllers;

import id1212.se.kth.projectx.data.User;
import id1212.se.kth.projectx.sevices.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    @Autowired
    UserDetailsService userDetailsService;

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public String createNewUser(String username, String password, String role) {
        return userDetailsService.saveUser(username, password, role).getUsername();
    }

    @RequestMapping(value="/roles", method = RequestMethod.GET)
    public User getRoles(){
        return userDetailsService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
