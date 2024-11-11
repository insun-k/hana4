package tryThis.school;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

public class Student implements Comparable<Student> {
	private String name = "";
	private int id = 0;
	private String phoneNo = "";
	private int score = 0;

	public Student(StringTokenizer tokenizer) {
		// String[] tokens = new String[tokenizer.countTokens()];
		List<String> tokens = new ArrayList<>();
		while (tokenizer.hasMoreTokens()) {
			tokens.add(tokenizer.nextToken());
		}

		try {
			this.name = tokens.get(0);
			this.id = Integer.parseInt(tokens.get(1));
			this.phoneNo = tokens.get(2);
			this.score = Integer.parseInt(tokens.get(3));
		} catch (IndexOutOfBoundsException ioe) {
			System.out.println(ioe.getMessage());
		}
	}

	public Student(String name, int id, String phoneNo) {
		this(name, id);
		this.phoneNo = phoneNo;
	}

	public Student(String name, int id, int score) {
		this(name, id);
		this.score = score;
	}

	public Student(String name, int id) {
		this.name = name;
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public int getScore() {
		return this.score;
	}

	@Override
	public String toString() {
		return "%s(%d) : %s [%d, %s]".formatted(name, id, phoneNo, score, getGrade(score));
	}

	public String getGrade(Integer score) {
		String grade = "F";
		switch (score / 10) {
			case 10, 9 -> grade = "A";
			case 8 -> grade = "B";
			case 7 -> grade = "C";
			case 6 -> grade = "D";
		}

		return grade;
	}

	public static void main(String[] args) {
		Map<String, Student> map = new HashMap<>();
		MyScanner scanner = new MyScanner();
		System.out.println("이름 아이디 전화번호 순으로 입력하세요!");
		while (true) {
			StringTokenizer tokenizer = new StringTokenizer(scanner.scanLine(""), " ");
			if (tokenizer.countTokens() == 0) {
				break;
			}

			Student student = new Student(tokenizer);
			map.put(student.getName(), student);

		}

		System.out.println("등록된 학생 수 = " + map.size());

		// Set<Map.Entry<String, Student>> entries = map.entrySet();
		// System.out.println("entries = " + entries);
		// for (Map.Entry<String, Student> entry : entries) {
		// 	System.out.println("name = " + entry.getKey() + ", " + entry.getValue());
		// }

		for (String name : map.keySet()) {
			System.out.println(map.get(name).toString());
		}
	}

	@Override
	public int compareTo(Student other) {
		return this.id - other.id;
	}
}
