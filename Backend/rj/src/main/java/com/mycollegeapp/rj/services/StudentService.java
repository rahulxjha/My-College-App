package com.mycollegeapp.rj.services;

import com.mycollegeapp.rj.entity.Student;

import java.util.List;

public interface StudentService {
    List<Student> getAllStudent();
    Student getStudentById(long studentId);
    Student addData(Student student);
    boolean deleteData(long studentId);

}
