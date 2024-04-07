package ne.javaguides.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ne.javaguides.ems.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
