package com.hana.shop.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hana.shop.dao.CustDAO;
import com.hana.shop.dto.CustDTO;

@Service
public class MainService {
	private final List<CustDTO> custs = new ArrayList<>();

	private final CustDAO dao;

	public MainService(CustDAO dao) {
		this.dao = dao;
	}

	public int addCust(CustDTO cust) {
		int maxId = custs.size();
		cust.setId(maxId + 1);
		custs.add(cust);

		return maxId;
	}

	public List<CustDTO> getCusts() {
		return dao.getCusts();
	}

	public CustDTO find(int id) {
		// return custs.get(id - 1);
		return dao.getCust(id);
	}
}
