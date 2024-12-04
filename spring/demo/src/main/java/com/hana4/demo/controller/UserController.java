package com.hana4.demo.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	private Logger logger = LoggerFactory.getLogger(UserController.class);

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

		// logback-spring.xml에 root를 info로 설정해서 info, warn, error만 보임
		logger.trace("tttttttttrace!!");
		logger.debug("ddddddddddug!!");
		logger.info("iiiiiiiinfo!!");
		logger.warn("wwwwwwwwwarn!!");
		logger.error("eeeeeeeerror!!");
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

	private User checkExists(Long id, HttpServletResponse response) throws IOException {
		Optional<User> user = service.getUser(id);
		if (user.isEmpty()) {
			response.sendError(404, "User not found!");
			return null;
		}

		return user.get();
	}

	// 수정
	//@PatchMapping("/users/{id}")
	// Patch와 Put 둘다 쓰고싶을때
	@RequestMapping(value = "/{id}", method = {RequestMethod.PATCH, RequestMethod.PUT})
	@ResponseBody
	public User updateUser(@PathVariable("id") Long id, @RequestBody User user, HttpServletResponse res) throws
		IOException {
		System.out.println("user00 = " + user);
		System.out.println("id = " + id);
		user.setId(id);
		System.out.println("user11 = " + user);
		// => 이때의 user는 persistence context에서 만든 user아 아님!!
		// => 컨트롤러가 만든 객체 => entity Object!! => 맨 위에 사진 참고

		User attachedUser = checkExists(user.getId(), res);
		assert attachedUser != null;
		// if (attachedUser == null) {
		// 	res.sendError(404);
		// 	return null;
		// }

		// setName을 안하면 update 반영이 됨
		attachedUser.setName(user.getName());
		return service.updateUser(attachedUser);
	}

	@DeleteMapping("/{id}")
	public User deleteUser(@PathVariable("id") Long id, HttpServletResponse res) throws IOException {
		checkExists(id, res);
		return service.deleteUser(id);

	}

}
