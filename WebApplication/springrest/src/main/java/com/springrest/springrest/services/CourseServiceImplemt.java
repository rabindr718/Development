package com.springrest.springrest.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springrest.springrest.dao.CourseDao;
import com.springrest.springrest.entities.Course;

//Worked on Service Layer so, provide implementation
@Service 
public class CourseServiceImplemt implements CourseServices {
	//List<Course> list;
	//After Comment above lines
	
	@Autowired
	private CourseDao courseDao;
	
	
	public CourseServiceImplemt() {
//		list=new ArrayList<>();
//		list.add(new Course(145, "Advance Java","SpringBoot First Project"));
//		list.add(new Course(137, "Basic Programming","The Engineering"));

	}
	@Override
	public List<Course> getCourses() {
		// TODO Auto-generated method stub
		return courseDao.findAll();
	}
	@Override
	public Course getCourse(long courseId) {
//		Course c=null;
//		for(Course course : list) {
//			if(course.getId()==courseId) {
//				c=course;
//				break;
//			}
//		}
		return courseDao.getOne(courseId);
	}
	@Override
	public Course addCourse(Course course) {
		// TODO Auto-generated method stub
//		list.add(course);
		courseDao.save(course);
		return course;
	}
//	@Override
//	public Course updateCourse(long courseId) {
//		Course c=null;
//		for(Course course : list) {
//			if(course.getId()==courseId) {
//				c=list.set(courseId, c);
//				break;
//			}
//		}		return null;
//	}
	
	//ORIGINAL
	@Override
	public Course updateCourse(Course course) {
//		list.forEach(e -> {
//			if(e.getId()==course.getId()) {
//				e.setTitle(course.getTitle());
//				e.setDescription(course.getDescription());
//						
//			}
//		});
		courseDao.save(course);
		return course;
	}
	@Override
//	public Course deleteCourse(long courseId) {
//		list.remove(courseId);
//		return courseId;		
//	}

	public void deleteCourse(long parseLong) {
		//list=this.list.stream().filter(e->e.getId()!=parseLong).collect(Collectors.toList());
	Course entity=courseDao.getOne(parseLong);
	courseDao.delete(entity);
	
	}
}
