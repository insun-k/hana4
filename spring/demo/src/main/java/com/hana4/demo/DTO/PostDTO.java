package com.hana4.demo.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// @Getter
// @Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDTO {
	private String id;
	private String title;
	private String writer;
	private LocalDateTime createdate;
	private LocalDateTime workdate;
	private String body;
}
