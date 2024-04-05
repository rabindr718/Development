package com.springrest.springrest.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.springrest.springrest.entities.Course;
import com.springrest.springrest.services.CourseServices;

@RestController
@RequestMapping("/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class MyController {

	@Autowired //This is used for Create Object of CourseServices;
	private CourseServices courseServices;
	
	@GetMapping("/home") //Used for Map the Client request then called this function
	public String home() {
		return "Rabindra Sharma";
	}
//	@RequestMapping(path="/courses", method=RequestMethod.GET)
	// Also above methods are valid
	
	@GetMapping("/courses")
	public List<Course>getCourses() {
		return this.courseServices.getCourses();
	}
	
	@GetMapping("/courses/{courseId}")
	public Course getCourse(@PathVariable String courseId) {
		return this.courseServices.getCourse(Long.parseLong(courseId));
	}
//	@PostMapping(path="/courses", consumes="/application/json")
	@PostMapping("/courses")
	public Course addCourse(@RequestBody Course course) {
		return this.courseServices.addCourse(course);
	}
	@PutMapping("/courses")
	public Course updateCourse(@RequestBody Course course) {
		return this.courseServices.updateCourse(course);
	}
//	@DeleteMapping("/courses/{courseId}")
//	public Course deleteCourse(@PathVariable String courseId) {
//		return this.courseServices.deleteCourse(Long.parseLong(courseId));
//	}
	@DeleteMapping("/courses/{curseId}")
	public ResponseEntity<HttpStatus> deleteCourse(@PathVariable String courseId){
		try {
			this.courseServices.deleteCourse(Long.parseLong(courseId));
			return new ResponseEntity<>(HttpStatus.OK);
		}catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
