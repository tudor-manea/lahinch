package com.lahinchgallery.lahinch_art_gallery_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;

@Service
public class StorageServiceImpl implements StorageService {

    private final RestTemplate supabaseRestTemplate;
    private final String supabaseUrl;

    @Autowired
    public StorageServiceImpl(@Qualifier("supabaseRestTemplate") RestTemplate supabaseRestTemplate,
                              @Qualifier("supabaseUrl") String supabaseUrl) {
        this.supabaseRestTemplate = supabaseRestTemplate;
        this.supabaseUrl = supabaseUrl;
    }

    @Override
    public String uploadFile(String bucketName, String filePath, MultipartFile file) throws IOException {
        String uploadUrl = supabaseUrl + "/storage/v1/object/" + bucketName + "/" + filePath;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        // The apikey and Authorization headers are already added by the RestTemplate interceptor in SupabaseConfig

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        // Spring's RestTemplate needs a Resource that can describe the content length for multipart.
        // A ByteArrayResource is suitable here.
        ByteArrayResource fileResource = new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename(); // Important for Supabase to recognize the file
            }
        };
        body.add("file", fileResource); // "file" is the typical field name, Supabase might just take the raw body if Content-Type is set

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        try {
            // Setting upsert to true by default using x-upsert header for Supabase Storage
            headers.set("x-upsert", "true");
            ResponseEntity<String> response = supabaseRestTemplate.exchange(
                    uploadUrl,
                    HttpMethod.POST,
                    requestEntity,
                    String.class
            );

            if (response.getStatusCode().is2xxSuccessful()) {
                // The response body for a successful upload might contain information like the key or path.
                // For simplicity, we'll assume success if 2xx and return the filePath.
                // Supabase often returns a JSON like {"Key": "bucket/path/to/file.png"}
                return filePath;
            } else {
                throw new IOException("Failed to upload file: " + response.getStatusCode() + " " + response.getBody());
            }
        } catch (HttpClientErrorException e) {
            throw new IOException("Failed to upload file: " + e.getStatusCode() + " - " + e.getResponseBodyAsString(), e);
        } catch (Exception e) {
            throw new IOException("Failed to upload file: " + e.getMessage(), e);
        }
    }

    @Override
    public void deleteFile(String bucketName, String filePath) throws IOException {
        String deleteUrl = supabaseUrl + "/storage/v1/object/" + bucketName; // Note: path is in the body

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        // apikey and Authorization headers are added by the interceptor

        Map<String, Object> body = Collections.singletonMap("prefixes", Collections.singletonList(filePath));
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = supabaseRestTemplate.exchange(
                    deleteUrl,
                    HttpMethod.DELETE,
                    requestEntity,
                    String.class
            );
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new IOException("Failed to delete file: " + response.getStatusCode() + " " + response.getBody());
            }
        } catch (HttpClientErrorException e) {
            throw new IOException("Failed to delete file: " + e.getStatusCode() + " - " + e.getResponseBodyAsString(), e);
        } catch (Exception e) {
            throw new IOException("Failed to delete file: " + e.getMessage(), e);
        }
    }

    @Override
    public String getFileUrl(String bucketName, String filePath) {
        // This method might be intended for signed URLs if RLS is restrictive.
        // For now, let's make it return the same as public URL, consistent with your interface update.
        return getPublicFileUrl(bucketName, filePath);
    }

    @Override
    public String getPublicFileUrl(String bucketName, String filePath) {
        // Construct the public URL. Access is controlled by Supabase Storage RLS policies.
        return supabaseUrl + "/storage/v1/object/public/" + bucketName + "/" + filePath;
    }
}