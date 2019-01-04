package id1212.se.kth.projectx.repositories;

import id1212.se.kth.projectx.data.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends CrudRepository<Role, String> {

    Role findByName(String role);
}
