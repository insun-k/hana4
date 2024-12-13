package com.hana4.demo.dao;

import java.util.List;

import com.hana4.demo.dto.PostDTO;

public interface PostDAO {
	public List<PostDTO> selectAll();

	public PostDTO select(String id);

	public PostDTO insert(PostDTO post);

	public PostDTO update(PostDTO post);

	public PostDTO delete(String id);
}
