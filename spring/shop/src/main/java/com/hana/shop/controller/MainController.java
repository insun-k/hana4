package com.hana.shop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
	@RequestMapping("/")
	public String mainPage(Model model) {
		// model은 view에 전달
		model.addAttribute("version", "0.1.2");
		return "main";
	}
}
