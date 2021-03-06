package id1212.se.kth.projectx.sevices;

import id1212.se.kth.projectx.data.Role;
import id1212.se.kth.projectx.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public Role findByName(String name){
        return roleRepository.findByName(name);
    }


}
