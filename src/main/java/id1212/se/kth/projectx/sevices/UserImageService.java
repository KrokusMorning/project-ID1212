package id1212.se.kth.projectx.sevices;

import id1212.se.kth.projectx.data.UserImage;
import id1212.se.kth.projectx.data.UserImageDTO;
import id1212.se.kth.projectx.repositories.UserImageRepository;
import id1212.se.kth.projectx.util.ImageAlreadyExistException;
import org.apache.commons.io.IOUtils;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class, propagation = Propagation.REQUIRES_NEW)
public class UserImageService {

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    UserImageRepository userImageRepository;

    @Autowired
    private HttpServletRequest request;

    public UserImage addUserImage(MultipartFile file) {
        if(userImageRepository.findByName(file.getOriginalFilename()) != null)
            throw new ImageAlreadyExistException(file.getOriginalFilename());

        String realPathToImages = request.getServletContext().getRealPath("WEB-INF/view/projectx/userImages/");
        String filePath = realPathToImages + file.getOriginalFilename();
        File dest = new File(filePath);
        try {
            file.transferTo(dest);
        } catch (IOException e) {
            e.printStackTrace();
        }
        UserImage userImage = new UserImage(file.getOriginalFilename(),
                userDetailsService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName()));
        return userImageRepository.save(userImage);
    }

    public List<UserImageDTO>  getAllImages() throws IOException {
        String realPathToImages = request.getServletContext().getRealPath("WEB-INF/view/projectx/userImages/");
        List<UserImageDTO> userImages = new ArrayList<>();
        for(UserImage image: userImageRepository.findAll()){
            String filePath = realPathToImages + image.getName();
            InputStream inputStream = new FileInputStream(filePath);
            userImages.add(new UserImageDTO(image.getName(), Base64.encodeBase64String(IOUtils.toByteArray(inputStream)), image.getUser().getUsername()));
        }


        return userImages;
    }

    public String deleteImage(String imageName) {
        String realPathToImages = request.getServletContext().getRealPath("WEB-INF/view/projectx/userImages/");
        File file = new File(realPathToImages + imageName);
        if(file.delete()){
            System.out.println(realPathToImages + imageName + " File deleted");
        }else System.out.println(realPathToImages + imageName +  " doesn't exists");

        return userImageRepository.deleteByName(imageName);
    }

}
