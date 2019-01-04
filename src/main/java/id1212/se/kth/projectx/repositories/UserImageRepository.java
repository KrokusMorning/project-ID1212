package id1212.se.kth.projectx.repositories;

import id1212.se.kth.projectx.data.UserImage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface UserImageRepository extends CrudRepository<UserImage, Integer> {

    public String deleteByName(String name);

    UserImage findByName(String userName);
}
