package com.hana.shop.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hana.shop.dto.CustDTO;
import com.hana.shop.service.MainService;

@Controller
public class MainController {

	private final MainService service;

	// @Autowired  요즘 생략
	public MainController(MainService service) {
		this.service = service;
	}

	@RequestMapping("/")
	public String mainPage(Model model) {
		// model은 view에 전달
		model.addAttribute("version", "0.1.2");

		List<CustDTO> custs = service.getCusts();
		model.addAttribute("custs", custs);

		List<Integer> list = new ArrayList<>(custs.size());
		for (int i = 0; i < custs.size(); i++) {
			list.add(i + 100);
		}
		model.addAttribute("list", list);

		model.addAttribute("createdate", new Date());

		return "main";
	}

	@GetMapping("/add")
	public String adding() {
		return "add";
	}

	@PostMapping("/add")
	public String add(CustDTO cust) {
		// email은 optional 처리 (null)
		if (cust.getEmail().isBlank()) {
			cust.setEmail(null);
		}
		int insertId = service.addCust(cust);
		System.out.println("cust = " + cust);
		return "redirect:/?insertId=" + cust.getId();
	}

	@GetMapping("/modify/{id}")
	public String modify(@PathVariable("id") Integer id, Model model) {
		CustDTO cust = service.find(id);
		model.addAttribute("cust", cust);
		return "modify";
	}

	@PostMapping("/modify/{id}")
	public String update(CustDTO cust) {
		service.modify(cust);
		return "redirect:/";
	}

	@GetMapping("/remove/{id}")
	public String remove(@PathVariable("id") Integer id, Model model) {
		CustDTO cust = service.find(id);
		if (cust == null) {
			model.addAttribute("data", "Cust(#" + id + ")");
			model.addAttribute("message", "해당 고객이 없습니다!");
			return "not-found";
		}
		service.remove(id);
		return "redirect:/";
	}

}
