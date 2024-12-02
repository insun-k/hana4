package com.hana4.demo.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.hana4.demo.DTO.PostDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class) // Auditing 활성화
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@Column(nullable = false, length = 200)
	private String title;

	@Column(nullable = false, length = 50)
	private String writer;

	@CreatedDate
	@Column(nullable = false)
	private LocalDateTime createdate;

	@LastModifiedDate
	@Column(nullable = false)
	private LocalDateTime workdate;

	@Column(columnDefinition = "text") // 긴 텍스트 데이터
	private String body;

	public Post(String title, String writer, String body) {
		this.title = title;
		this.writer = writer;
		this.body = body;
	}

	public PostDTO toDTO() {
		return PostDTO.builder()
			.id(id)
			.title(title)
			.writer(writer)
			// .createdate(createdate)
			.workdate(workdate)
			.body(body)
			.build();
	}
}
