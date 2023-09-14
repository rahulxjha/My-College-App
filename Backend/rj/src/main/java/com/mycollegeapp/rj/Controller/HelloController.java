package com.mycollegeapp.rj.Controller;

import com.mycollegeapp.rj.entity.Student;
import com.mycollegeapp.rj.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/helloApi")
public class HelloController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/helloStudents/{studentName}")
    public List<Student> getByName(@PathVariable String studentName){
        return studentService.getByName(studentName);
    }

    @DeleteMapping("/helloStudents/{studentName}")
    public String deleteByName(@PathVariable String studentName){
        return studentService.deleteByName(studentName);
    }
}
