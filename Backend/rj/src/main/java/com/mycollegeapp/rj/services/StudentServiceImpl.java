package com.mycollegeapp.rj.services;

import com.mycollegeapp.rj.DAO.StudentDao;
import com.mycollegeapp.rj.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService{
    @Autowired
    private StudentDao studentDao;

    @Override
    public List<Student> getAllStudent() {
        try {
            return studentDao.findAll();
        } catch (Exception e){
            e.printStackTrace();
            return new ArrayList<>();
        }

    }

    @Override
    public Student getStudentById(long studentId) {
        try{
            return studentDao.findById(studentId);
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public Student addData(Student student) {
        try{
            return studentDao.save(student);
        } catch (Exception ex){
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public Student updateStudent(Student student) {
        try{
            return studentDao.save(student);
        } catch (Exception ex){
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean deleteData(long studentId) {
        try {
            studentDao.deleteById(studentId);
            return true;
        } catch (EmptyResultDataAccessException ex) {
            return false;
        }
    }

    @Override
    public List<Student> getByName(String name) {
        try {
            return studentDao.getByName(name);
        } catch (EmptyResultDataAccessException ex) {
            return new ArrayList<>();
        }
    }

    @Override
    public String deleteByName(String name) {
        try{
            return studentDao.deleteByName(name);
        } catch (Exception e){
            return e.getMessage();
        }
    }

}
