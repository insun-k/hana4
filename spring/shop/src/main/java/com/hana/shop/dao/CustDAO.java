package com.hana.shop.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hana.shop.dto.CustDTO;

@Repository
public interface CustDAO {
	Integer addCust(String name, String tel, String email);

	List<CustDTO> getCusts();
}
