package com.hana4.demo.domain;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public class BaseEntity {
	// @CreatedDate
	// @Column(nullable = false, updatable = false)
	// private LocalDateTime createdAt;
	//
	// @LastModifiedDate
	// @Column(nullable = false, updatable = false)
	// private LocalDateTime updatedAt;

	@CreationTimestamp
	@Column(nullable = false, updatable = false, columnDefinition = "timestamp")
	@ColumnDefault("CURRENT_TIMESTAMP")
	private LocalDateTime createAt;

	@UpdateTimestamp
	@Column(nullable = false, columnDefinition = "timestamp")  // Timestamp 사용시 columnDefinition 붙이기
	@ColumnDefault("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
	private LocalDateTime updateAt;

}
