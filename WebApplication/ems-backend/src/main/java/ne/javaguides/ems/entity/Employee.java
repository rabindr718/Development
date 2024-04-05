package ne.javaguides.ems.entity;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Employee")
public class Employee {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY) //For Primary Key AutoIncrement
	private long id;
	
	@Column(name="First_Name")
	private String firstname;
	
	@Column(name="Last_Name")
	private String lastname;
	
	@Column(name="Email_id", nullable=false ,unique=true)
	private String email;

}
//This is First Class Where I coding after that build every packages 
//After Write this code and Execution of this class database is Database Table is Created
//Before setup create this class , i am setup the database at application.properties and then write 
//Write this class and developed and configure the database;