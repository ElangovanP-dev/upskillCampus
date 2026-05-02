# Internship Project Report: Smart Job Portal

## 1. Candidate Information
- **Name**: Elangovan P
- **Email**: elangovanp222@gmail.com
- **Mobile No.**: 9344496604
- **Domain**: Java Full Stack Development
- **Institute / College Name**: Mahendra Engineering College
- **Internship Start Date**: 1st Jan 2026
- **Internship End Date**: 1st Feb 2026
- **LinkedIn Profile Link**: https://www.linkedin.com/in/elangovan-p-2a4567251
- **Project Name**: SmartJobPortal
- **GitHub Repository Link**: https://github.com/elangovanp/upskillCampus (To be created)

## 2. Short Summary of Implementation
The Smart Job Portal is a full-stack web application designed to bridge the gap between job seekers and recruiters. 
The backend is built using **Java Spring Boot**, featuring secure JWT-based authentication, Role-Based Access Control (RBAC) for Candidates and Recruiters, and seamless RESTful APIs for managing job postings and applications. The database is managed using **MySQL** with Spring Data JPA for object-relational mapping.

The frontend is a dynamic, responsive Single Page Application (SPA) built with **React.js** and **Vite**. It features a modern, glassmorphism-inspired UI with smooth animations, custom CSS, and state management. The integration of backend APIs allows candidates to browse, search, and apply for jobs, while recruiters can securely post jobs and track applications in real-time.

## 3. Project Architecture and Modules
### Backend Modules (Spring Boot)
1. **Authentication & Security**: Utilizes Spring Security and JSON Web Tokens (JWT) for stateless authentication. Passwords are encrypted using BCrypt.
2. **User Management Module**: Handles registration and login for two roles: `CANDIDATE` and `RECRUITER`.
3. **Job Management Module**: Allows recruiters to create, view, and manage job listings. Includes a public search functionality for candidates.
4. **Application Module**: Enables candidates to apply for jobs by uploading their resumes and submitting cover letters. Recruiters can view applications for their posted jobs.

### Frontend Modules (React.js)
1. **Auth Context**: Global state management for user sessions and JWT storage.
2. **Dashboard**: Role-specific dashboards presenting relevant metrics and actions.
3. **Job Feed**: A dynamic feed displaying available jobs with filtering and search capabilities.
4. **Responsive UI**: A fully responsive, modern design with custom color palettes and interactive hover states.

## 4. Key Learnings and Takeaways
- Mastery of creating secure RESTful APIs using Spring Boot and Spring Security.
- Implementation of JWT for stateless user authentication.
- Designing responsive, modern user interfaces using React and Vanilla CSS.
- Connecting a Java backend with a React frontend using Cross-Origin Resource Sharing (CORS).
- Managing relational databases effectively using Hibernate and MySQL.

## 5. Conclusion
The Smart Job Portal successfully demonstrates the practical application of full-stack development skills. The system is robust, secure, and user-friendly, providing a scalable foundation for future enhancements such as AI-based resume parsing and real-time chat between recruiters and candidates.
