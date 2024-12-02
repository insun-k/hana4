package com.hana4.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hana4.demo.DTO.PostDTO;
import com.hana4.demo.service.PostService;

@RestController
@RequestMapping("/posts")
public class PostController {
	private final PostService service;

	public PostController(PostService service) {
		this.service = service;
	}

	@GetMapping("")
	public List<PostDTO> getPosts() {
		return service.getPosts();
	}

	@GetMapping("/{id}")
	public PostDTO getPost(@PathVariable("id") String id) {
		return service.getPost(id);
	}

	@PostMapping("")
	public ResponseEntity<PostDTO> addPost(@RequestBody PostDTO post) {
		return ResponseEntity.ok(service.addPost(post));
	}

	@PatchMapping("/{id}")
	public ResponseEntity<?> modifyPost(@PathVariable("id") String id, @RequestBody PostDTO post) {
		try {
			post.setId(id);
			return ResponseEntity.ok(service.modifyPost(post));
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removePost(@PathVariable("id") String id) {
		try {
			return ResponseEntity.ok(service.removePost(id));
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e);
		}
	}
}
