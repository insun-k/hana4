package com.hana.shop.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.hana.shop.dto.CustDTO;

@Repository
@Mapper
public interface CustDAO {
	Integer addCust(String name, String tel, String email);

	List<CustDTO> getCusts();

	CustDTO getCust(int id);

	void update(CustDTO cust);

	int insert(CustDTO cust);

	void delete(Integer id);
}
