package com.hana.shop.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustDTO {
	private Integer id;
	private String name, tel, email;

	@Override
	public String toString() {
		return "CustDTO{" +
			"email='" + email + '\'' +
			", id=" + id +
			", name='" + name + '\'' +
			", tel='" + tel + '\'' +
			'}';
	}
}
