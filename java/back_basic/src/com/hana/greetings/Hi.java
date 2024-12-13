package com.hana.greetings;

import java.util.Scanner;

public class Hi {
	public static void main(String[] args) {
		System.out.println("Hi !");

		Scanner scan = new Scanner(System.in);
		System.out.print("점수 : ");
		gradeSwitch(scan.nextInt());

		System.out.print("학점을 입력하시오 : ");
		playSwitch(scan.next());

	}

	private static void gradeSwitch(int score) {
		switch (score / 10) {
			case 10, 9 -> System.out.println("A");
			case 8 -> System.out.println("B");
			case 7 -> System.out.println("C");
			case 6 -> System.out.println("D");
			default -> System.out.println("F");

		}
	}

	private static void playSwitch(String grade) {
		switch (grade) {
			case "A":
			case "B":
				System.out.println("참 잘했음");
				break;
			case "C":
			case "D":
				System.out.println("좀 더 노력해");
				break;
			default:
				System.out.println("다음 학기에 다시 만나요.");

		}
	}
}
