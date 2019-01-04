package id1212.se.kth.projectx.controllers;

import id1212.se.kth.projectx.sevices.UserDetailsService;
import id1212.se.kth.projectx.data.UserImage;
import id1212.se.kth.projectx.data.UserImageDTO;
import id1212.se.kth.projectx.sevices.UserImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class ImageUploadController {
    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    UserImageService userImageService;

    @RequestMapping(value = "/uploadImage", method = RequestMethod.POST)
    public UserImage uploadUserImage(MultipartFile file) {
        return userImageService.addUserImage(file);
    }

    @RequestMapping(value = "/getAllImages")
    public List<UserImageDTO> getAllUserImages() throws IOException {
        return userImageService.getAllImages();
    }

    @RequestMapping(value = "/deleteImage/{imageName:.+}", method = RequestMethod.DELETE)
    public String deleteUserImage(@PathVariable String imageName) {
        return userImageService.deleteImage(imageName);
    }



}
