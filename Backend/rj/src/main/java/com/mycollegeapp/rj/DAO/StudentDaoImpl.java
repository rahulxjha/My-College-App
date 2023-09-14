package com.mycollegeapp.rj.DAO;

import com.mycollegeapp.rj.entity.Student;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentDaoImpl implements StudentDao{

    @Autowired
    private EntityManager entityManager;

    public StudentDaoImpl(EntityManager entityManager){
        this.entityManager = entityManager;
    }
    @Override
    public List<Student> findAll() {
        TypedQuery<Student> query = entityManager.createQuery("SELECT s FROM Student s", Student.class);
        return query.getResultList();
    }

    @Override
    public Student findById(long id) {
        return entityManager.find(Student.class, id);
    }

    @Override
    @Transactional
    public Student save(Student student) {
        entityManager.persist(student);
        return student;
    }

    @Override
    @Transactional
    public void deleteById(long id) {
        Student student = entityManager.find(Student.class,id);
        if (student != null) {
            entityManager.remove(student);
        }
    }

    @Override
    public List<Student> getByName(String name) {
        TypedQuery query = entityManager.createQuery("FROM Student WHERE name=:theData", Student.class);
        query.setParameter("theData", name);
        return query.getResultList();
    }

    @Override
    @Transactional
    public String deleteByName(String name) {
        try {
            Query query = entityManager.createQuery("DELETE FROM Student WHERE name=:theData");
            query.setParameter("theData", name);
            int deletedCount = query.executeUpdate();
            return "Deleted " + deletedCount + " record(s)!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred: " + e.getMessage();
        }
    }


}
