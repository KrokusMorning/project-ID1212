package id1212.se.kth.projectx.data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class UserImage {

    @Id
    private String name;

    @ManyToOne
    private User user;

    public UserImage() {
        this.name = null;
        this.user = null;
    }

    public UserImage(String name, User user) {
        this.name = name;
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public User getUser() {
        return user;
    }
}
