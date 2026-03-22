package com.cloudbox.service;

import com.cloudbox.model.FileEntity;
import com.cloudbox.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class FileService {

    private final String uploadDir = "uploads/";

    @Autowired
    private FileRepository fileRepository;

    // =========================
    // 📤 UPLOAD FILE
    // =========================
    public FileEntity uploadFile(MultipartFile file, String userEmail, String folder) throws IOException {

        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        if (folder == null || folder.isEmpty()) {
            folder = "root";
        }

        File directory = new File(uploadDir + userEmail + "/" + folder);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String uniqueName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        Path filePath = Paths.get(directory.getAbsolutePath(), uniqueName);

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        FileEntity entity = new FileEntity();
        entity.setFileName(file.getOriginalFilename());
        entity.setFileType(file.getContentType());
        entity.setFilePath(filePath.toString());
        entity.setFileSize(file.getSize());
        entity.setOwnerEmail(userEmail);
        entity.setFolder(folder);
        entity.setUploadedAt(LocalDateTime.now());

        return fileRepository.save(entity);
    }

    // =========================
    // 📥 DOWNLOAD FILE
    // =========================
    public byte[] downloadFile(Long fileId, String userEmail) throws IOException {

        FileEntity file = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        if (!file.getOwnerEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized");
        }

        return Files.readAllBytes(Paths.get(file.getFilePath()));
    }

    // =========================
    // ❌ DELETE FILE
    // =========================
    public void deleteFile(Long fileId, String userEmail) throws IOException {

        FileEntity file = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        if (!file.getOwnerEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized");
        }

        Files.deleteIfExists(Paths.get(file.getFilePath()));
        fileRepository.delete(file);
    }

    // =========================
    // 📂 USER FILES
    // =========================
    public List<FileEntity> getUserFiles(String email) {
        return fileRepository.findByOwnerEmail(email);
    }

    // =========================
    // 📂 FILES BY FOLDER
    // =========================
    public List<FileEntity> getFilesByFolder(String email, String folder) {
        return fileRepository.findByFolderAndOwnerEmail(folder, email);
    }

    // =========================
    // 📊 USER STATS
    // =========================
    public long getUserFileCount(String email) {
        return fileRepository.countByOwnerEmail(email);
    }

    public long getUserStorage(String email) {
        return fileRepository.findByOwnerEmail(email)
                .stream()
                .mapToLong(FileEntity::getFileSize)
                .sum();
    }

    // =========================
    // 🧑‍💼 ADMIN STATS
    // =========================
    public long getTotalFiles() {
        return fileRepository.count();
    }

    public long getTotalStorage() {
        return fileRepository.findAll()
                .stream()
                .mapToLong(FileEntity::getFileSize)
                .sum();
    }
}