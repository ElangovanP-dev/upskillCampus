package com.smartjob.portal.service;

import com.smartjob.portal.dto.ApplicationDto;
import com.smartjob.portal.entity.Application;
import com.smartjob.portal.entity.Job;
import com.smartjob.portal.entity.User;
import com.smartjob.portal.repository.ApplicationRepository;
import com.smartjob.portal.repository.JobRepository;
import com.smartjob.portal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public ApplicationDto applyForJob(Long jobId, String email, String coverLetter, String resumeUrl) {
        User candidate = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (applicationRepository.existsByJobAndCandidate(job, candidate)) {
            throw new RuntimeException("You have already applied for this job");
        }

        Application application = Application.builder()
                .job(job)
                .candidate(candidate)
                .coverLetter(coverLetter)
                .resumeUrl(resumeUrl)
                .status(Application.ApplicationStatus.PENDING)
                .build();

        application = applicationRepository.save(application);
        return mapToDto(application);
    }

    public List<ApplicationDto> getApplicationsForCandidate(String email) {
        User candidate = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
        return applicationRepository.findByCandidate(candidate).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ApplicationDto> getApplicationsForJob(Long jobId, String recruiterEmail) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        
        // Verify if the recruiter requesting is the owner of the job
        if (!job.getRecruiter().getEmail().equals(recruiterEmail)) {
            throw new RuntimeException("Not authorized to view these applications");
        }

        return applicationRepository.findByJob(job).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private ApplicationDto mapToDto(Application application) {
        return ApplicationDto.builder()
                .id(application.getId())
                .jobId(application.getJob().getId())
                .jobTitle(application.getJob().getTitle())
                .candidateId(application.getCandidate().getId())
                .candidateName(application.getCandidate().getName())
                .resumeUrl(application.getResumeUrl())
                .coverLetter(application.getCoverLetter())
                .status(application.getStatus())
                .appliedAt(application.getAppliedAt())
                .build();
    }
}
