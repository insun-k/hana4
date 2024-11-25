package com.hana4.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.hana4.demo.repository.UserRepository;
import com.hana4.demo.repository.VolatileUserRepository;
import com.hana4.demo.service.UserService;

@Configuration
public class SpringConfig {

	// controller는 등록 x

	@Bean
	public UserService userService() {
		return new UserService(userRepository());
	}

	@Bean
	public UserRepository userRepository() {
		return new VolatileUserRepository();
		// config에 등록하는 이유 => repository를 mysqlRepository로 바꾸면 위에 return 만 수정 가능 (아니면 bean이 2개나 등록됨)
	}

}
