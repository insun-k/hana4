package com.hana4.demo.DAO;

import java.util.List;
import java.util.Optional;

import com.hana4.demo.DTO.UserDTO;
import com.hana4.demo.domain.User;

public interface ApiDAO {
	public List<User> selectAll();

	public Optional<User> select(Long id);

	public User insert(String name, short age);

	public User update(UserDTO user);

	public User delete(Long id);
}
