package com.smartjob.portal.service;

import com.smartjob.portal.dto.JobDto;
import com.smartjob.portal.entity.Job;
import com.smartjob.portal.entity.User;
import com.smartjob.portal.repository.JobRepository;
import com.smartjob.portal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public JobDto createJob(JobDto jobDto, String recruiterEmail) {
        User recruiter = userRepository.findByEmail(recruiterEmail)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));

        Job job = Job.builder()
                .title(jobDto.getTitle())
                .description(jobDto.getDescription())
                .location(jobDto.getLocation())
                .requirements(jobDto.getRequirements())
                .salaryRange(jobDto.getSalaryRange())
                .recruiter(recruiter)
                .build();

        job = jobRepository.save(job);
        return mapToDto(job);
    }

    public List<JobDto> getAllJobs() {
        return jobRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    
    public List<JobDto> searchJobs(String keyword) {
        return jobRepository.findByTitleContainingIgnoreCase(keyword).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<JobDto> getJobsByRecruiter(String recruiterEmail) {
        User recruiter = userRepository.findByEmail(recruiterEmail)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        return jobRepository.findByRecruiter(recruiter).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private JobDto mapToDto(Job job) {
        return JobDto.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .location(job.getLocation())
                .requirements(job.getRequirements())
                .salaryRange(job.getSalaryRange())
                .recruiterId(job.getRecruiter().getId())
                .recruiterName(job.getRecruiter().getName())
                .postedAt(job.getPostedAt())
                .build();
    }
}
