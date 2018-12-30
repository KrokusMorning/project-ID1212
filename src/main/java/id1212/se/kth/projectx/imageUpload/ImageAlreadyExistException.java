package id1212.se.kth.projectx.imageUpload;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.CONFLICT)
public class ImageAlreadyExistException extends RuntimeException {

    public ImageAlreadyExistException(final String msg) {
        super("An image with filename " + msg + " already exists");
    }

}