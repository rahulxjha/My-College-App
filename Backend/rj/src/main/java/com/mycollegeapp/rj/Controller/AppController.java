package com.mycollegeapp.rj.Controller;

import com.mycollegeapp.rj.entity.Student;
import com.mycollegeapp.rj.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AppController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/students")
    public ResponseEntity<List<Student>> getStudentList(){
        List<Student> studentList = studentService.getAllStudent();

        if (!studentList.isEmpty()){
            return new ResponseEntity<>(studentList, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/students/{studentId}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long studentId) {
        Student student = studentService.getStudentById(studentId);

        if (student != null) {
            return ResponseEntity.ok(student);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/students")
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        if (student == null) {
            return ResponseEntity.badRequest().build();
        }

        Student addedStudent = studentService.addData(student);
        return ResponseEntity.ok(addedStudent);
    }

    @DeleteMapping("/students/{studentId}")
    public ResponseEntity<Boolean> deleteStudent(@PathVariable Long studentId) {
        boolean deleted = studentService.deleteData(studentId);

        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
