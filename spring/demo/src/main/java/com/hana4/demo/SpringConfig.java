package com.hana4.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.hana4.demo.dao.ApiDAO;
import com.hana4.demo.dao.ApiDAOImpl;
import com.hana4.demo.repository.ApiRepository;
import com.hana4.demo.repository.JpaUserRepository;
import com.hana4.demo.repository.UserRepository;
import com.hana4.demo.service.UserService;

import jakarta.persistence.EntityManager;

@Configuration
public class SpringConfig {

	// controller는 등록 x

	private final EntityManager em;
	private final ApiRepository apiRepository;
	// private final PostRepository postRepository;

	public SpringConfig(EntityManager em, ApiRepository apiRepository) {
		this.em = em;
		this.apiRepository = apiRepository;
		// this.postRepository = postRepository;
	}

	@Bean
	public UserService userService() {
		return new UserService(userRepository());
	}

	@Bean
	public UserRepository userRepository() {
		//return new VolatileUserRepository();
		// config에 등록하는 이유 => repository를 mysqlRepository로 바꾸면 위에 return 만 수정 가능 (아니면 bean이 2개나 등록됨)

		// !!!! JapUserRepository로 갈아끼우기 !!!
		return new JpaUserRepository(em);
	}

	@Bean
	public ApiDAO apiDAO() {
		return new ApiDAOImpl(apiRepository);
	}

	// @Bean
	// public PostDAO postDAO() {
	// 	return new PostDAOImpl(postRepository);
	// }

}
