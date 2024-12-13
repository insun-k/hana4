package com.hana4.demo.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hana4.demo.dto.UserDTO;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ActiveProfiles("test")
public class ApiControllerTest {
	@Autowired
	MockMvc mockMvc;

	@Autowired
	ObjectMapper objectMapper;

	// @Autowired
	// WebApplicationContext context;

	@BeforeAll
	// 클래스가 instance 화 되기 전에 실행돼야해서 static
	static void beforeAll() {
		System.out.println("Before Allllllllllllllllllll");
	}

	@AfterAll
	static void afterAll() {
		System.out.println("After Alllllllllllllllllllllll");
	}

	// @BeforeEach
	// void beforeEach() {
	// 	this.mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
	// }

	@Test
	@DisplayName("/api/users - User list test")
	void getUserListTest() throws Exception {
		final String url = "/api/users";

		final String name = "Hong";
		final short age = 33;
		final UserDTO dto = new UserDTO();
		dto.setName(name);
		dto.setAge(age);

		final ResultActions result = mockMvc.perform(
			get(url)
			// get(url).param("q", "")
		);

		List<UserDTO> list = Arrays.asList(
			new UserDTO[] {new UserDTO(1L, "AA10", (short)10),
				new UserDTO(2L, "AA11", (short)11), new UserDTO(3L, "AA12", (short)12)});

		String reqStr = objectMapper.writeValueAsString(list);
		System.out.println("reqStr = " + reqStr);

		result.andExpect(status().isOk())
			.andExpect(content().contentType(MediaType.APPLICATION_JSON))
			.andExpect(content().json(reqStr));
	}

	@Test
	void addUserTest() throws Exception {
		final String url = "/api/users";

		final String name = "Hong";
		final short age = 33;
		final UserDTO dto = new UserDTO();
		dto.setName(name);
		dto.setAge(age);
		final String reqStr = objectMapper.writeValueAsString(dto);
		System.out.println("reqStr = " + reqStr);

		final ResultActions result = mockMvc.perform(
			post(url).contentType(MediaType.APPLICATION_JSON).content(reqStr)
		);

		result.andExpect(status().isOk())
			.andExpect(content().contentType(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$.id").exists())
			.andExpect(jsonPath("$.name").value(name))
			// 테스트 해보면 다 33으로 맞는데 테스트는 틀림 => 타입이 틀림. json은 다 number타입이여서 short 타입 없음
			.andExpect(jsonPath("$.age").value((int)age));
		// .andExpect(content().json(reqStr));

	}

}
