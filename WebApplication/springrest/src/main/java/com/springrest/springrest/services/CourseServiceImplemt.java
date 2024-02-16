package com.springrest.springrest.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.springrest.springrest.entities.Course;

//Worked on Service Layer so, provide implementation
@Service 
public class CourseServiceImplemt implements CourseServices {

	List<Course> list;
	
	public CourseServiceImplemt() {
		list=new ArrayList<>();
		list.add(new Course(145, "Advance Java","SpringBoot First Project"));
		list.add(new Course(137, "Basic Programming","The Engineering"));

	}
	@Override
	public List<Course> getCourses() {
		// TODO Auto-generated method stub
		return list;
	}
	@Override
	public Course getCourse(long courseId) {
		Course c=null;
		for(Course course : list) {
			if(course.getId()==courseId) {
				c=course;
				break;
			}
		}
		return null;
	}
	@Override
	public Course addCourse(Course course) {
		// TODO Auto-generated method stub
		list.add(course);
		return course;
	}

}
