package com.hana4.demo.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana4.demo.domain.Post;

public interface PostRepository extends JpaRepository<Post, String> {
	List<Post> findByCreatedateLessThanEqual(LocalDateTime dateTime);

	long countByCreatedateLessThanEqual(LocalDateTime dateTime);

	List<Post> findByWriter(String writer);

	List<Post> findByTitleStartsWith(String title);
}
