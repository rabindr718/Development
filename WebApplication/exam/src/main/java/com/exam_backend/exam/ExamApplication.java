package com.exam_backend.exam;
import com.exam_backend.exam.Models.Role;
import com.exam_backend.exam.Models.User;
import com.exam_backend.exam.Models.UserRole;
import com.exam_backend.exam.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamApplication implements CommandLineRunner {

	private UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(ExamApplication.class, args);
		System.out.println("RAM");
	}
@Override
	public void run(String...args) throws  Exception{
		System.out.println("Starting Code ...");
		User user=new User();

		user.setUsername("rabindr718");
		user.setFirstName("Rabindra");
		user.setLastName("Sharma");
		user.setEmail("rabindra0718@gmail.com");
		user.setPassword("abc");
		user.setPhone("7079121008");
		user.setProfile("default.jpg");
		Role role1 =new Role();
		role1.setRoleName("Admin");
		role1.setRoleId(44L);
	System.out.println("Executed h");

		Set<UserRole>userRoleSet=new HashSet<>();
		UserRole userRole=new UserRole();
		userRole.setRole(role1);
		userRole.setUser(user);
		userRoleSet.add(userRole);
		User user1=this.userService.createUser(user,userRoleSet);
		System.out.println(user1.getUsername());
	System.out.println("Executed");



	}

}
