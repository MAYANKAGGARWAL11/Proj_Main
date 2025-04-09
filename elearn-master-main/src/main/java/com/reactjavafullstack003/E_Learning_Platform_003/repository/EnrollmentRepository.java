package com.reactjavafullstack003.E_Learning_Platform_003.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.reactjavafullstack003.E_Learning_Platform_003.model.Enrollment;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {

    /**
     * Find an enrollment by course ID and student ID.
     */
    Optional<Enrollment> findByCourseIDAndStudentid(int courseID, int studentid);
    List<Enrollment> findByCourseID(int courseID);
}
