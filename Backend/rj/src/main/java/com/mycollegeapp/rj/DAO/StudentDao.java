package com.mycollegeapp.rj.DAO;

import com.mycollegeapp.rj.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentDao extends JpaRepository<Student, Long> {

}
