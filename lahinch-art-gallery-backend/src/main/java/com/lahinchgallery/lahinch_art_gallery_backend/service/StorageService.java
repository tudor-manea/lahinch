package com.lahinchgallery.lahinch_art_gallery_backend.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface StorageService {
    String uploadFile(String bucketName, String filePath, MultipartFile file) throws IOException;
    void deleteFile(String bucketName, String filePath) throws IOException;
    String getFileUrl(String bucketName, String filePath);
    String getPublicFileUrl(String bucketName, String filePath);
}