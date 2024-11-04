package tryThis;

import java.util.Scanner;

public class Method {
	public static void main(String[] args) {
		countdown(5);

		Scanner scan = new Scanner(System.in);
		System.out.println("정수 2개를 입력하세요 ");
		printSum(scan.nextInt(), scan.nextInt());
	}

	private static void printSum(int num1, int num2) {
		int sum = 0;
		for (int i = num1; i <= num2; i++) {
			System.out.print(i);
			if (i != num2) {
				System.out.print(" + ");
			}
			sum += i;

		}
		System.out.print(" = " + sum);
	}

	private static void countdown(int num) {
		System.out.println("카운트다운 시작!");
		for (int i = num; i > 0; i--) {
			System.out.println(i + "..");
		}
	}
}
