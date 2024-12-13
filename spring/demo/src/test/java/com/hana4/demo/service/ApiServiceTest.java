// package com.hana4.demo.service;
//
// import static org.assertj.core.api.Assertions.*;
//
// import java.util.Optional;
//
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
//
// import com.hana4.demo.domain.User;
// import com.hana4.demo.service.ApiService;
//
// @SpringBootTest
// public class ApiServiceTest {
// 	// @MockBean
// 	@Autowired
// 	ApiService apiService;
//
// 	@Test
// 	void getUserTest() {
// 		final Long ID = 1L;
// 		Optional<User> ouser = apiService.getUser(ID);
// 		assertThat(ouser.isPresent()).isTrue();
// 		User user = ouser.get();
//
// 		assertThat(user.getId()).isEqualTo(ID);
// 	}
// }
