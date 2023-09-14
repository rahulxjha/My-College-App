package com.mycollegeapp.rj.DAO;

import com.mycollegeapp.rj.entity.Student;

public interface StudentDao {
    List<Student> findAll();
    Student findById(long id);
    Student save(Student student);
    void deleteById(long id);
    List<Student> getByName(String name);
    String deleteByName(String name);
}
