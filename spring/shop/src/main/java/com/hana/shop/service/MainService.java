package com.hana.shop.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hana.shop.dto.CustDTO;

@Service
public class MainService {
	private final List<CustDTO> custs = new ArrayList<>();

	public MainService() {
		CustDTO cust = new CustDTO();
		cust.setId(1);
		cust.setName("Hong");
		cust.setTel("010-2222-3333");
		custs.add(cust);
		CustDTO cust2 = new CustDTO();
		cust2.setId(2);
		cust2.setName("김길동");
		cust2.setTel("010-2222-4444");
		custs.add(cust2);
	}

	public List<CustDTO> getCusts() {
		return custs;
	}

	public int addCust(CustDTO cust) {
		int maxId = custs.size();
		cust.setId(maxId + 1);
		custs.add(cust);

		return maxId;
	}

	public CustDTO find(int id) {
		return custs.get(id - 1);
	}

}
