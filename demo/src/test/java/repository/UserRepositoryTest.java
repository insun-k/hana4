package repository;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

import java.util.Optional;


import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


import com.hana4.demo.repository.UserRepository;
import com.hana4.demo.repository.VolatileUserRepository;

import domain.User;

public class UserRepositoryTest {

	final UserRepository repository = new VolatileUserRepository();

	@BeforeEach
	public void beforeEach(){  // 테스트를 위해 초기화
		repository.initialize();
	}

	@Test
	public void addUser(){
		int preCount = repository.findAll().size();
		User user = new User(0L, "Hong");
		Long newerId = repository.addUser(user);
		assertEquals(2,newerId);  // Assertions. 생략 -> import에 static 붙이기

		Optional<User> newer = repository.findById(newerId);
		newer.ifPresent(a -> Assertions.assertThat(a).isEqualTo(user));

	}

	@Test
	public void saveUser() {
		String name = "Kim22";
		// 방법 1
		// Optional<User> user = repository.findById(1L);
		// user.ifPresent(a -> {
		// 	a.setName(name);
		// 	User tmpUser = respository.saveUser(a);
		// 	assertThat(tmpUser.getName()).isEqualTo(name);
		// });

		// 방법 2
		User user1 = new User(1L, name);  // 이름 수정
		User savedUser = repository.saveUser(user1);
		assertThat(savedUser).isEqualTo(user1);
	}

	@Test
	public void deleteUser(){
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
