package com.mycollegeapp.rj.services;

import com.mycollegeapp.rj.entity.Student;

import java.util.List;

public interface StudentService {
    List<Student> getAllStudent();
    Student getStudentById(long studentId);
    Student addData(Student student);
    Student updateStudent(Student student);
    boolean deleteData(long studentId);
    List<Student> getByName(String name);
    String deleteByName(String name);
}
