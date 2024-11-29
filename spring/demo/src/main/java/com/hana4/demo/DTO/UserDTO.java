package com.hana4.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "age")
@EqualsAndHashCode
@Builder
public class UserDTO {
	private Long id;
	private String name;
	private short age;

}
