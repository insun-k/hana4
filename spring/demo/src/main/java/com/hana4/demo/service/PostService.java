package com.hana4.demo.service;

import java.util.List;

import com.hana4.demo.dto.PostDTO;

public interface PostService {
	public List<PostDTO> getPosts();

	public PostDTO getPost(String id);

	public PostDTO addPost(PostDTO post);

	public PostDTO modifyPost(PostDTO post);

	public PostDTO removePost(String id);
}
