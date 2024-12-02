package com.hana4.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana4.demo.domain.Post;

public interface PostRepository extends JpaRepository<Post, String> {
}
