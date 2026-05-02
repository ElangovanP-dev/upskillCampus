package com.smartjob.portal.dto;

import com.smartjob.portal.entity.Application.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationDto {
    private Long id;
    private Long jobId;
    private String jobTitle;
    private Long candidateId;
    private String candidateName;
    private String resumeUrl;
    private String coverLetter;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;
}
