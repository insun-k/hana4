package com.hana4.demo;

import java.util.Optional;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.hana4.demo.domain.User;
import com.hana4.demo.repository.UserRepository;

@Component
public class InitialDataLoader implements ApplicationRunner {
	private final UserRepository repository;

	public InitialDataLoader(UserRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(ApplicationArguments args) {
		Optional<User> user10 = repository.findByName("AA10");
		if (user10.isPresent()) {
			return;
		}

		repository.initialize();
		short s = 10;
		repository.addUser(new User("AA" + s, s++));
		repository.addUser(new User("AA" + s, s++));
		repository.addUser(new User("AA" + s, s++));

	}
}
