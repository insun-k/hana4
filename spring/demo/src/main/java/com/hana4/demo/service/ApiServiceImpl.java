package com.hana4.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hana4.demo.DAO.ApiDAO;
import com.hana4.demo.DTO.UserDTO;
import com.hana4.demo.domain.User;

@Service
public class ApiServiceImpl implements ApiService {
	private final ApiDAO dao;

	public ApiServiceImpl(ApiDAO dao) {
		this.dao = dao;
	}

	@Override
	public List<UserDTO> getUsers() {
		List<User> users = dao.selectAll();
		return users.stream()
			.map(u -> UserDTO.builder().id(u.getId()).name(u.getName()).age(u.getAge()).build())
			.toList();
	}

	@Override
	public UserDTO getUser(Long id) {
		Optional<User> ouser = dao.select(id);
		// if (ouser.isPresent()) {
		// 	return ouser.get().toDTO();

		// 2. toDTO 함수로 따로 생성
		//return UserDTO.builder().id(user.getId()).name(user.getName()).age(user.getAge()).build();

		// 1. 위 코드처럼 builder 사용
		// UserDTO dto = new UserDTO(user.getId(), user.getName(), user.getAge());

		// 3.
		return ouser.map(User::toDTO).orElse(null);

	}

	@Override
	public UserDTO addUser(String name, short age) {
		return dao.insert(name, age).toDTO();
	}

	@Override
	public UserDTO modifyUser(UserDTO user) {
		return dao.update(user).toDTO();
	}

	@Override
	public UserDTO removeUser(Long id) {
		return dao.delete(id).toDTO();
	}
}
