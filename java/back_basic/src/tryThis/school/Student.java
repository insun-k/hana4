package tryThis.school;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.StringTokenizer;

public class Student {
	private int id;
	private String name;
	private String phoneNo;

	public Student(StringTokenizer tokenizer) {
		List<String> tokens = new ArrayList<>();
		while (tokenizer.hasMoreElements()) {
			tokens.add(tokenizer.nextToken());
		}
		try {
			this.name = tokens.get(0);
			this.id = Integer.parseInt(tokens.get(1));
			this.phoneNo = tokens.get(2);
		} catch (IndexOutOfBoundsException ioe) {
			System.out.println(ioe.getMessage());
		}

	}

	public Student(int id, String name, String phoneNo) {
		this.id = id;
		this.name = name;
		this.phoneNo = phoneNo;
	}

	public String getName() {
		return name;
	}

	@SuppressWarnings("checkstyle:OperatorWrap")
	@Override
	public String toString() {
		return "%s(%d) : %s".formatted(name, id, phoneNo);
	}

	public static void main(String[] args) {
		Map<String, Student> map = new HashMap<>();
		Scanner scan = new Scanner(System.in);
		System.out.println("이름, 아이디, 전화번호 순으로 입력하시오.");
		while (true) {
			StringTokenizer tokenizer = new StringTokenizer(scan.nextLine(), " ");

			if (tokenizer.countTokens() == 0) {
				break;
			}
			Student student = new Student(tokenizer);
			map.put(student.getName(), student);
		}
		System.out.println("등록된 학생 수 : " + map.size());
		for (String name : map.keySet()) {
			System.out.println(map.get(name).toString());
		}
	}
}
