package ne.javaguides.ems.services;
import ne.javaguides.ems.dto.EmployeeDto;

import java.util.List;

public interface EmployeeServices {
	EmployeeDto createEmployee(EmployeeDto employeeDto);

	EmployeeDto getEmployeeById(Long emplyeeId);

	List<EmployeeDto> getAllEmployees();

	EmployeeDto updatedEmployee(Long employeeId, EmployeeDto updatedEmployee);

	void deleteEmployee(Long employeeId);

}
