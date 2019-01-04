package id1212.se.kth.projectx.repositories;

import id1212.se.kth.projectx.data.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {


    User findByUsername(String userName);
}
