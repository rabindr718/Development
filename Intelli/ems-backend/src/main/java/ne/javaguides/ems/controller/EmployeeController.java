package ne.javaguides.ems.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.AllArgsConstructor;
import ne.javaguides.ems.dto.EmployeeDto;
import ne.javaguides.ems.services.EmployeeServices;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
	
	private EmployeeServices employeeService;

	//Build Add/Post Employee RestAPI

	@PostMapping
	public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
		
		EmployeeDto savedEmployee=employeeService.createEmployee(employeeDto);
		return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);

	}
	//Build Get/Fetch Employee RestAPI
	//PathVariable used for bind the GetMapping
	@GetMapping("{id}")
	public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId){
		EmployeeDto employeeDto=employeeService.getEmployeeById(employeeId);
		return ResponseEntity.ok(employeeDto);
	}

	@GetMapping
	public ResponseEntity<List<EmployeeDto>> getAllEmployee(){
		List<EmployeeDto> employees=employeeService.getAllEmployees();
		return ResponseEntity.ok(employees);
	}

	@PutMapping("{id}")
	//@PathVariable("id") For Binding Process to PutMapping
	public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId,
													  @RequestBody EmployeeDto updatedEmployee){
		EmployeeDto employeeDto=employeeService.updatedEmployee(employeeId,updatedEmployee);

		return ResponseEntity.ok(employeeDto);
	}


	//Build delete Employee RestAPi

	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
		employeeService.deleteEmployee(employeeId);
		return  ResponseEntity.ok("Employee deleted Successfully.");

	}
}
