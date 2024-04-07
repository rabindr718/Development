package ne.javaguides.ems.services.implement;
import ne.javaguides.ems.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import ne.javaguides.ems.dto.EmployeeDto;
import ne.javaguides.ems.entity.Employee;
import ne.javaguides.ems.mapper.EmployeeMapper;
import ne.javaguides.ems.repository.EmployeeRepository;
import ne.javaguides.ems.services.EmployeeServices;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImplements implements EmployeeServices{

	private EmployeeRepository employeeRepository;

		@Override
		public EmployeeDto createEmployee(EmployeeDto employeeDto) {
			
			//
			Employee employee= EmployeeMapper.mapToEmployee(employeeDto);
			Employee savedemployee=employeeRepository.save(employee);
			// TODO Auto-generated method stub
			return EmployeeMapper.mapToEmployeeDto(savedemployee);
		}

		//Employee EmployeeController Get Request Below method is Implemented
	@Override
	public EmployeeDto getEmployeeById(Long emplyeeId) {

			Employee employee=employeeRepository.findById(emplyeeId)
		.orElseThrow(()-> new ResourceNotFoundException("Employee is Unavailable by Given Id"+ emplyeeId));
		return EmployeeMapper.mapToEmployeeDto(employee);
	}

	//getAllEmployees Returns Jpa entity during return converted in dto
	@Override
	public List<EmployeeDto> getAllEmployees() {
		List<Employee>employees=employeeRepository.findAll();
		return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
				.collect(Collectors.toList());
	}

	@Override
	public EmployeeDto updatedEmployee(Long employeeId, EmployeeDto updatedEmployee) {
		Employee employee=	employeeRepository.findById(employeeId).orElseThrow(
					() ->new ResourceNotFoundException("Given Employee ID Employee is not Found"+employeeId)
			);
		//updatedEmployee it contains updated value
		employee.setFirstname(updatedEmployee.getFirstname());
		employee.setLastname(updatedEmployee.getLastname());
		employee.setEmail(updatedEmployee.getEmail());

		//Save perform Save and Update operation also if primary key not find Insert Operation
		Employee updatedEmployeeObj=employeeRepository.save(employee);

		return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);

		//After Creating here methods go to EmployeeController for Build RestApi
	}

	@Override
	public void deleteEmployee(Long employeeId) {
		Employee employee=	employeeRepository.findById(employeeId).orElseThrow(
				() ->new ResourceNotFoundException("Given Employee ID Employee is not Found"+employeeId)
		);
		employeeRepository.deleteById(employeeId);

	}


}
