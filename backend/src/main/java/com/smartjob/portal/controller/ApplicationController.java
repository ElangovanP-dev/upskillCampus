package com.smartjob.portal.controller;

import com.smartjob.portal.dto.ApplicationDto;
import com.smartjob.portal.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;
    private final String UPLOAD_DIR = "uploads/resumes/";

    @PostMapping("/apply/{jobId}")
    public ResponseEntity<ApplicationDto> applyForJob(
            @PathVariable Long jobId,
            @RequestParam("coverLetter") String coverLetter,
            @RequestParam(value = "resume", required = false) MultipartFile resume,
            Authentication authentication
    ) {
        String resumeUrl = null;
        if (resume != null && !resume.isEmpty()) {
            try {
                // Ensure directory exists
                File dir = new File(UPLOAD_DIR);
                if (!dir.exists()) dir.mkdirs();

                // Generate unique file name
                String fileName = UUID.randomUUID() + "_" + resume.getOriginalFilename();
                Path path = Paths.get(UPLOAD_DIR + fileName);
                Files.write(path, resume.getBytes());
                
                // Fallback local URL
                resumeUrl = "/resumes/" + fileName; 
            } catch (IOException e) {
                throw new RuntimeException("Failed to store file", e);
            }
        }

        return ResponseEntity.ok(applicationService.applyForJob(jobId, authentication.getName(), coverLetter, resumeUrl));
    }

    @GetMapping("/my-applications")
    public ResponseEntity<List<ApplicationDto>> getMyApplications(Authentication authentication) {
        return ResponseEntity.ok(applicationService.getApplicationsForCandidate(authentication.getName()));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<ApplicationDto>> getJobApplications(
            @PathVariable Long jobId,
            Authentication authentication
    ) {
        return ResponseEntity.ok(applicationService.getApplicationsForJob(jobId, authentication.getName()));
    }
}
