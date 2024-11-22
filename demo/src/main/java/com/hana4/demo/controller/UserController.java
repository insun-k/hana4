package com.hana4.demo.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hana4.demo.domain.User;
import com.hana4.demo.service.UserService;

import jakarta.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/users")
public class UserController {

	private final UserService service;

	public UserController(UserService service) {
		this.service = service;
	}

	@GetMapping("/list")
	public String userList(Model model) {
		model.addAttribute("users", service.getList());
		return "user/list";
	}

	@GetMapping("")
	@ResponseBody
	public List<User> getUsers() {
		return service.getList();
	}

	@PostMapping("")
	@ResponseBody
	public User regist(@RequestBody User user) throws BadRequestException {
		System.out.println("user = " + user);
		Long newerId = service.regist(user);
		Optional<User> newer = service.getUser(newerId);
		if (newer.isPresent()) {
			return newer.get();
		} else {
			throw new BadRequestException("Insert Error");
		}
	}

	@PostMapping("/add")
	public String addUser(@RequestBody User user) {
		System.out.println("user = " + user);
		return "redirect:/users/list";
	}

	@GetMapping("/{id}")
	@ResponseBody
	public User getUser(@PathVariable("id") Long id, HttpServletResponse res) throws IOException {
		Optional<User> user = service.getUser(id);
		if (user.isPresent()) {
			return user.get();
		} else {
			res.sendError(404, "User not found!");
			return null;
		}
	}

	private void checkExists(Long id, HttpServletResponse response) throws IOException {
		if (service.getUser(id).isEmpty()) {
			response.sendError(404, "User not found!");
		}
	}

	// 수정
	//@PatchMapping("/users/{id}")
	// Patch와 Put 둘다 쓰고싶을때
	@RequestMapping(value = "/{id}", method = {RequestMethod.PATCH, RequestMethod.PUT})
	@ResponseBody
	public User updateUser(@PathVariable("id") Long id, @RequestBody User user, HttpServletResponse res) throws
		IOException {
		System.out.println("id = " + id);
		user.setId(id);
		checkExists(user.getId(), res);
		System.out.println("user = " + user);
		return service.updateUser(user);
	}

	@DeleteMapping("/{id}")
	public User deleteUser(@PathVariable("id") Long id, HttpServletResponse res) throws IOException {
		checkExists(id, res);
		return service.deleteUser(id);

	}

}
