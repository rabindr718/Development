import java.util.ArrayList;
import java.util.List;

class EmployeeData {
    private int id;
    private String name;
    private double salary;

    public EmployeeData(int id, String name, double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    public void displayDetails() {
        System.out.println("ID: " + id + ", Name: " + name + ", Salary: $" + salary);
    }
}

// Main class
public class EmployeeManagement {
    public static void main(String[] args) {
        List<EmployeeData> employees = new ArrayList<>();
        employees.add(new EmployeeData(101, "RABINDRA SHARMA", 50000));
        employees.add(new EmployeeData(102, "STEVE SMITH", 60000));
        employees.add(new EmployeeData(103, "King Kohli", 55000));

        System.out.println("Employee Details:");
        for (EmployeeData emp : employees) {
            emp.displayDetails();
        }
    }
}
