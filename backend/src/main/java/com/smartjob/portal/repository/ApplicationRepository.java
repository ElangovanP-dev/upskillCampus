package com.smartjob.portal.repository;

import com.smartjob.portal.entity.Application;
import com.smartjob.portal.entity.Job;
import com.smartjob.portal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByCandidate(User candidate);
    List<Application> findByJob(Job job);
    boolean existsByJobAndCandidate(Job job, User candidate);
}
