package com.hana4.demo.service;

import static org.assertj.core.api.Assertions.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.hana4.demo.domain.User;
import com.hana4.demo.repository.UserRepository;
import com.hana4.demo.repository.VolatileUserRepository;

class UserServiceTest {
	private UserRepository repository;
	private UserService service;

	@BeforeEach
	void beforeEach() {
		repository = new VolatileUserRepository();
		service = new UserService(repository);
	}

	@Test
	void registUser() {
		User user = new User("Hong");
		Long newerId = service.regist(user);

		Optional<User> user1 = service.getUser(newerId);
		assertThat(user1.isPresent()).isTrue();
		assertThat(user1.get()).usingRecursiveComparison().isEqualTo(user);

		// 이름 중복 테스트
		User userDup = new User("Hong");
		assertThatThrownBy(() -> {
			service.regist(userDup);
		}).isInstanceOf(IllegalStateException.class).hasMessageContaining("Duplicate");

	}

	@Test
	void getUser() {
		Long id = 1L;
		Optional<User> user = service.getUser(id);
		assertThat(user.isPresent()).isTrue();
		assertThat(user.get()).usingRecursiveComparison().isEqualTo(new User(id, "Kim"));
	}
}
