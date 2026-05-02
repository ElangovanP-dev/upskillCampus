package com.smartjob.portal.repository;

import com.smartjob.portal.entity.Job;
import com.smartjob.portal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByRecruiter(User recruiter);
    List<Job> findByTitleContainingIgnoreCase(String keyword);
}
