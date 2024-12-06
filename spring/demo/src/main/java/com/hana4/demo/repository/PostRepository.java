package com.hana4.demo.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hana4.demo.domain.Post;

public interface PostRepository extends JpaRepository<Post, String> {
	List<Post> findByCreatedateLessThanEqual(LocalDateTime dateTime);

	long countByCreatedateLessThanEqual(LocalDateTime dateTime);

	List<Post> findByWriter(String writer);

	List<Post> findByWriter(String writer, Sort sort);

	List<Post> findByTitleStartsWith(String title);

	Page<Post> findByTitleLike(String title, Pageable pageable);

	long countByTitleLike(String title);
}
