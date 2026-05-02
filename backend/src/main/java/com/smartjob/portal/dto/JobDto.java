package com.smartjob.portal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobDto {
    private Long id;
    private String title;
    private String description;
    private String location;
    private String requirements;
    private String salaryRange;
    private Long recruiterId;
    private String recruiterName;
    private LocalDateTime postedAt;
}
