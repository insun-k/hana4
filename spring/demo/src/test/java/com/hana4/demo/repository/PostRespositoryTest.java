package com.hana4.demo.repository;

import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.hana4.demo.domain.Post;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class PostRespositoryTest {
	@Autowired
	private PostRepository repository;

	@Test
	void addPostTest() {
		List<Post> beforList = repository.findAll();
		System.out.println("beforList.size() = " + beforList.size());

		Post post = new Post("title", "writer", "body");
		Post savedPost = repository.save(post);
		System.out.println("savedPost = " + savedPost);

		Assertions.assertThat(savedPost.getId()).isNotNull();
		Assertions.assertThat(savedPost.getId()).matches("([a-f0-9]{8}(-[a-f0-9]{4}){4}[a-f0-9]{8})");
		Assertions.assertThat(savedPost.getTitle()).isEqualTo("title");
		Assertions.assertThat(savedPost.getWriter()).isEqualTo("writer");
		Assertions.assertThat(savedPost.getBody()).isEqualTo(post.getBody());
		Assertions.assertThat(savedPost.getWorkdate()).isNotNull();

		List<Post> afterList = repository.findAll();
		System.out.println("afterList.size() = " + afterList.size());
	}
}
