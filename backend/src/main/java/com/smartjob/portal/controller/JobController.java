package com.smartjob.portal.controller;

import com.smartjob.portal.dto.JobDto;
import com.smartjob.portal.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    // Public endpoint
    @GetMapping("/public")
    public ResponseEntity<List<JobDto>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }
    
    @GetMapping("/public/search")
    public ResponseEntity<List<JobDto>> searchJobs(@RequestParam String keyword) {
        return ResponseEntity.ok(jobService.searchJobs(keyword));
    }

    // Protected: Recruiter only (ideally secure via WebSecurity config or @PreAuthorize)
    @PostMapping
    public ResponseEntity<JobDto> createJob(@RequestBody JobDto jobDto, Authentication authentication) {
        return ResponseEntity.ok(jobService.createJob(jobDto, authentication.getName()));
    }

    // Protected: Recruiter only
    @GetMapping("/my-jobs")
    public ResponseEntity<List<JobDto>> getMyJobs(Authentication authentication) {
        return ResponseEntity.ok(jobService.getJobsByRecruiter(authentication.getName()));
    }
}
