package com.hana4.demo.DAO;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.hana4.demo.DTO.PostDTO;
import com.hana4.demo.DTO.PostMapper;
import com.hana4.demo.domain.Post;
import com.hana4.demo.repository.PostRepository;

@Repository
public class PostDAOImpl implements PostDAO {
	private final PostRepository repository;

	public PostDAOImpl(PostRepository repository) {
		this.repository = repository;
	}

	@Override
	public List<PostDTO> selectAll() {
		List<Post> posts = repository.findAll();
		return posts.stream().map(PostMapper::toDTO).toList();
	}

	@Override
	public PostDTO select(String id) {
		Optional<Post> post = repository.findById(id);
		if (post.isPresent()) {
			return PostMapper.toDTO(post.get());
		}
		return null;
	}

	@Override
	public PostDTO insert(PostDTO post) {
		Post newPost = repository.save(PostMapper.toPost(post));
		return PostMapper.toDTO(newPost);
	}

	@Override
	public PostDTO update(PostDTO post) {
		Optional<Post> ppost = repository.findById(post.getId());
		if (ppost.isPresent()) {
			Post updatedPost = ppost.get();
			updatedPost.setTitle(post.getTitle());
			updatedPost.setWriter(post.getWriter());
			updatedPost.setBody(post.getBody());
			return PostMapper.toDTO(repository.save(updatedPost));
		} else {
			throw new IllegalStateException("Post not found");
		}
	}

	@Override
	public PostDTO delete(String id) {
		Optional<Post> post = repository.findById(id);
		if (post.isPresent()) {
			repository.delete(post.get());
			return PostMapper.toDTO(post.get());
		} else {
			throw new IllegalStateException("Post not found");
		}
	}
}
