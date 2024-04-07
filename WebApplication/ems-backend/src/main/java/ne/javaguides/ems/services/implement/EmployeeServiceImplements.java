package ne.javaguides.ems.services.implement;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import ne.javaguides.ems.dto.EmployeeDto;
import ne.javaguides.ems.entity.Employee;
import ne.javaguides.ems.mapper.EmployeeMapper;
import ne.javaguides.ems.repository.EmployeeRepository;
import ne.javaguides.ems.services.EmployeeServices;

@Service
@AllArgsConstructor
public class EmployeeServiceImplements implements EmployeeServices{

	private EmployeeRepository employeeRepository;

		@Override
		public EmployeeDto createEmployee(EmployeeDto employeeDto) {
			
			
			Employee employee= EmployeeMapper.mapToEmployee(employeeDto);
			Employee savedemployee=employeeRepository.save(employee);
			// TODO Auto-generated method stub
			return EmployeeMapper.mapToEmployeeDto(savedemployee);
		}

}
