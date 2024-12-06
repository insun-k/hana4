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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

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

	// jpa2 - Paging 테스트
	@Test
	void findByTitleLikeTest() {
		final int countPerPage = 3;
		final String searchStr = "title%";
		long cnt = (long)Math.ceil((double)repository.countByTitleLike(searchStr) / countPerPage);

		// 작성자순 + id 역순
		Sort sort = Sort.by(Sort.Order.asc("writer"), Sort.Order.desc("id"));

		Page<Post> posts = repository.findByTitleLike(searchStr, PageRequest.of(0, countPerPage, sort));
		System.out.println("posts = " + posts.getContent());
		System.out.println("posts = " + posts.getTotalPages());
		assertThat(posts.getTotalPages()).isEqualTo(cnt);
		posts.forEach(System.out::println);
	}

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
	void findByWriterEqualTest() {
		List<Post> byWriter = repository.findByWriter(WRITER);
		System.out.println("byWriter = " + byWriter);
		assertThat(byWriter.stream().allMatch(post -> post.getWriter().equals(WRITER))).isTrue();

		// id 역순 출력
		Sort sort = Sort.by(Sort.Order.desc("id"));
		List<Post> byWriterSort = repository.findByWriter(WRITER, sort);

		byWriterSort.forEach(System.out::println);
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
