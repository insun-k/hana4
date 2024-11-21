package com.hana4.demo.repository;

import java.util.List;
import java.util.Optional;

import domain.User;

public interface UserRepository {
	List<User> findAll();
	Long addUser(User user);
	User saveUser(User user);
	User deleteUser(Long id);
	Optional<User> findById(Long id); // id가 없을 수도 있어서 -> optional
	Optional<User> findByName(String name);
	void initialize();

}
