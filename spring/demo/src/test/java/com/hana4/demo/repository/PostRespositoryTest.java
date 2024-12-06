package com.hana4.demo.repository;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.hana4.demo.domain.Post;

import jakarta.persistence.EntityManager;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class PostRespositoryTest {
	@Autowired
	private PostRepository repository;

	@Autowired
	EntityManager em;

	private final static LocalDateTime dateTime = LocalDateTime.of(LocalDate.of(2024, 12, 6), LocalTime.of(12, 0));
	private final static String WRITER = "세종대왕11";

	// jpa2 - QueryMethod 테스트
	@Test
	void countCreatedateTest() {
		long cnt = repository.countByCreatedateLessThanEqual(dateTime);
		System.out.println("cnt = " + cnt);
		assertThat(cnt).isGreaterThan(0);
	}

	@Test
	void findCreatedateLessThanEqualTest() {
		long cnt = repository.countByCreatedateLessThanEqual(dateTime);
		List<Post> posts = repository.findByCreatedateLessThanEqual(dateTime);
		System.out.println("posts.size() + \":\" + repository.count() = " + posts.size() + ":" + repository.count());
		assertThat(posts.size()).isEqualTo(cnt);
	}

	@Test
	void findWriterEqualTest() {
		List<Post> byWriter = repository.findByWriter(WRITER);
		System.out.println("byWriter = " + byWriter);
		assertThat(byWriter.stream().allMatch(post -> post.getWriter().equals(WRITER))).isTrue();

	}

	@Test
	void findTitleStartsWithTest() {
		List<Post> posts = repository.findByTitleStartsWith("title");
		System.out.println("posts = " + posts);
		assertThat(posts.stream().allMatch(post -> post.getTitle().startsWith("title"))).isTrue();
	}
	// test end.

	@Test
	void addPostTest() {
		List<Post> beforList = repository.findAll();
		System.out.println("beforList.size() = " + beforList.size());

		Post post = new Post("title", "writer", "body");
		Post savedPost = repository.save(post);
		System.out.println("savedPost = " + savedPost);

		assertThat(savedPost.getId()).isNotNull();
		assertThat(savedPost.getId()).matches("([a-f0-9]{8}(-[a-f0-9]{4}){4}[a-f0-9]{8})");
		assertThat(savedPost.getTitle()).isEqualTo("title");
		assertThat(savedPost.getWriter()).isEqualTo("writer");
		assertThat(savedPost.getBody()).isEqualTo(post.getBody());
		assertThat(savedPost.getWorkdate()).isNotNull();

		List<Post> afterList = repository.findAll();
		System.out.println("afterList.size() = " + afterList.size());
	}
}
