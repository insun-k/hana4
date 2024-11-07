package school;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class School {
	private static String getGrade(Integer score) {
		String grade = "F";
		switch (score / 10) {
			case 10, 9 -> grade = "A";
			case 8 -> grade = "B";
			case 7 -> grade = "C";
			case 6 -> grade = "D";
		}
		return grade;
	}

	public static final int STUDENT_COUNT = 10;

	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		List<Integer> scores = new ArrayList<>(STUDENT_COUNT);
		List<Integer> min = new ArrayList<>();
		min.add(100);
		List<Integer> max = new ArrayList<>();
		max.add(0);

		while (true) {
			System.out.print("점수를 입력하세요 : ");
			int input = scan.nextInt();
			if (input < 0) {
				break;
			}
			scores.add(input);
			if (input < min.get(0)) {
				min.clear();
				min.add(input);
			}
			if (input > max.get(0)) {
				max.clear();
				max.add(input);
			}

		}
		System.out.println("학생들의 성적 : " + scores);
		int maxScore = 0;
		for (int i = 0; i < scores.size(); i++) {
			int score = scores.get(i);
			if (score > maxScore) {
				maxScore = score;
			}
			System.out.printf("%d 학생의 성적은 %d점이며 학점은 %s이다\n", i, score, getGrade(score));
		}
		scores.removeAll(min);
		scores.removeAll(max);

		int sum = 0;
		for (int score : scores) {
			sum += score;
		}
		System.out.printf("평균은 %.1f, 최고 점수는 %d점 이다.", (sum / (double)scores.size()), maxScore);

	}

}
