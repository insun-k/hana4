package com.hana4.demo.repository;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.hana4.demo.domain.User;

public class UserRepositoryTest {

	final UserRepository repository = new VolatileUserRepository();

	@BeforeEach
	public void beforeEach() {  // 테스트를 위해 초기화
		repository.initialize();
	}

	@Test
	public void addUser() {
		int preCount = repository.findAll().size();
		User user = new User(0L, "Hong");

		Long newerId = repository.addUser(user);
		assertEquals(2, newerId);  // Assertions. 생략 -> import에 static 붙이기

		Optional<User> newer = repository.findById(newerId);
		assertThat(newer.isPresent()).isTrue();
		// newer.ifPresent(a -> Assertions.assertThat(a).isEqualTo(user));
		assertThat(newer.get()).isEqualTo(user);  // get을 빼면 newer = Optional<User> != user = User

		//assertThat(newer.get()).isEqualTo(new User(newerId, "Hong")); // 주소 다름
		// assertThat(newer.get()).usingRecursiveComparison().isEqualTo(new User(newerId, "Hong"));
	}

	@Test
	public void saveUser() {
		String name = "Kim22";
		String name1 = "Kim11";
		// 방법 1
		Optional<User> user = repository.findById(1L);
		user.ifPresent(a -> {
			a.setName(name);
			User tmpUser = repository.saveUser(a);
			assertThat(tmpUser.getName()).isEqualTo(name);
		});

		// 방법 2
		User user1 = new User(1L, name1);  // 이름 수정
		User savedUser = repository.saveUser(user1);
		assertThat(savedUser).isEqualTo(user1);
	}

	@Test
	public void deleteUser() {
		int preCount = repository.findAll().size();
		// 1번 유저 삭제
		Long delId = 1L;
		Optional<User> toDeleteUser = repository.findById(delId);
		User deletedUser = repository.deleteUser(delId);
		toDeleteUser.ifPresent(a -> {
			assertThat(a.getId()).isEqualTo(delId);
			assertThat(a).isEqualTo(deletedUser);
		});

		int afterCount = repository.findAll().size();
		assertThat(afterCount).isEqualTo(preCount - 1);
	}

}
