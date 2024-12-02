package com.hana4.demo.DAO;

import java.util.List;

import com.hana4.demo.DTO.PostDTO;

public interface PostDAO {
	public List<PostDTO> selectAll();

	public PostDTO select(String id);

	public PostDTO insert(PostDTO post);

	public PostDTO update(PostDTO post);

	public PostDTO delete(String id);
}
