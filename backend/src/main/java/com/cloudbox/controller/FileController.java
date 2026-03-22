package com.cloudbox.controller;

import com.cloudbox.model.FileEntity;
import com.cloudbox.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<FileEntity> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "root") String folder,
            Authentication auth
    ) throws Exception {

        String email = auth.getName();
        return ResponseEntity.ok(fileService.uploadFile(file, email, folder));
    }

    @GetMapping
    public ResponseEntity<List<FileEntity>> getFiles(Authentication auth) {
        return ResponseEntity.ok(fileService.getUserFiles(auth.getName()));
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<ByteArrayResource> download(
            @PathVariable Long id,
            Authentication auth
    ) throws Exception {

        byte[] data = fileService.downloadFile(id, auth.getName());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=file")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new ByteArrayResource(data));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Long id,
            Authentication auth
    ) throws Exception {

        fileService.deleteFile(id, auth.getName());
        return ResponseEntity.ok("File deleted");
    }
}