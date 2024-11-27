package com.hana.shop.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.hana.shop.dto.Dept;
import com.hana.shop.dto.Emp;
import com.hana.shop.service.DeptService;

@Controller
@RequestMapping("/depts")
public class DeptController {

	private final DeptService service;

	public DeptController(DeptService service) {
		this.service = service;
	}

	@GetMapping("")
	public String getList(Model model) {
		List<Dept> depts = service.getList(0);
		model.addAttribute("depts", depts);
		return "depts/list";
	}

	@GetMapping("/{id}")
	public String getDetail(@PathVariable Integer id, @RequestParam(required = false, defaultValue = "0") int pid,
		Model model) {
		System.out.println("id, pid = " + id + ", " + pid);
		Dept dept = service.find(id, pid);
		List<Dept> depts = service.getList(id);
		List<Emp> emps = service.getEmps();

		model.addAttribute("dept", dept);
		model.addAttribute("depts", depts);
		model.addAttribute("emps", emps);

		return "depts/detail";
	}

	@PostMapping("/{id}/save")
	// form 안에 내용을 받아서 @RequestBody로 받을 필요 없음
	public String save(Dept dept) {
		service.save(dept);
		System.out.println("dept = " + dept);
		return "redirect:/depts";
	}

	@GetMapping("/{id}/remove")
	public String remove(@PathVariable int id, Model model) {
		List<Dept> childrenDepts = service.findByPid(id);

		// 지식 부서가 있으면 삭제 x
		if (!childrenDepts.isEmpty()) {
			model.addAttribute("message", "참조하는 하위부서가 존재합니다.");
			return "error";
		}
		service.delete(id);
		return "redirect:/depts";
	}

}
