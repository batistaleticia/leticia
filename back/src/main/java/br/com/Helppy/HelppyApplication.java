package br.com.Helppy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

// @SpringBootApplication
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })  // tentativa

public class HelppyApplication {

	public static void main(String[] args) {
		SpringApplication.run(HelppyApplication.class, args);
	}

}
