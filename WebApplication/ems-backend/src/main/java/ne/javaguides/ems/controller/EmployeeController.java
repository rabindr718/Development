package ne.javaguides.ems.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import ne.javaguides.ems.dto.EmployeeDto;
import ne.javaguides.ems.services.EmployeeServices;

@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
	
	private EmployeeServices employeeService;

	//Build Add Employee RestAPI
	
	public ResponseEntity<EmployeeDto> createEmployee(EmployeeDto employeeDto){
		
		EmployeeDto savedEmployee=employeeService.createEmployee(employeeDto);
		return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);

	}
}
