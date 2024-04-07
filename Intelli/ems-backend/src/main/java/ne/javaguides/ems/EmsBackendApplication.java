package ne.javaguides.ems;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmsBackendApplication {

	public static void main(String[] args) {
		
		System.out.println("Is this Working ");
		SpringApplication.run(EmsBackendApplication.class, args);
	}

}
