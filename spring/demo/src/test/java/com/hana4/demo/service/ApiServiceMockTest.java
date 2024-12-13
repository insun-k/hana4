// package com.hana4.demo.service;
//
// import static org.assertj.core.api.Assertions.*;
//
// import java.util.Optional;
//
// import org.junit.jupiter.api.Test;
// import org.mockito.Mockito;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
//
// import com.hana4.demo.DAO.ApiDAO;
// import com.hana4.demo.DTO.UserDTO;
// import com.hana4.demo.domain.User;
// import com.hana4.demo.service.ApiService;
//
// @SpringBootTest
// public class ApiServiceMockTest {
// 	@Autowired
// 	ApiService apiService;
//
// 	@MockBean
// 	// @Autowired
// 	ApiDAO dao; // =>
//
// 	@Test
// 	void getUserTest() {
// 		final Long ID = 1L;
// 		final short age = 10;
// 		assertThat(ouser.isPresent()).isTrue();
// 		User user = ouser.get();
//
// 		Optional<User> ouser = Optional.of(new User(1L, "AA11", age));
// 		Mockito.when(apiDAO.select(1L)).thenReturn(ouser);
// 		UserDTO user = apiService.getUser(1L);
// 		assertThat(user.getId()).isEqualTo(1L);
// 		assertThat(user.getName()).isEqualTo("AA11");
//
// 		assertThat(user.getId()).isEqualTo(ID);
// 	}
// }
