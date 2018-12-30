package id1212.se.kth.projectx.imageUpload;

public class UserImageDTO {
    private String name;
    private String base64;
    private String uploader;

    public UserImageDTO(String name, String base64, String uploader) {
        this.name = name;
        this.base64 = base64;
        this.uploader = uploader;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBase64() {
        return base64;
    }

    public void setBase64(String base64) {
        this.base64 = base64;
    }

    public String getUploader() {
        return uploader;
    }

    public void setUploader(String uploader) {
        this.uploader = uploader;
    }
}
