package com.ollama.ollama;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OllamaApplication {

	public static void main(String[] args) {
		// Load .env file from /backend directory
		Dotenv dotenv = Dotenv.configure()
				.directory("./") // relative to backend root where .env is
				.ignoreIfMissing()
				.load();

		// Inject each key-value into System environment
		dotenv.entries().forEach(entry ->
				System.setProperty(entry.getKey(), entry.getValue())
		);

		SpringApplication.run(OllamaApplication.class, args);
	}
}
