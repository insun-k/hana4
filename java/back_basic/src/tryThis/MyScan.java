package tryThis;

import java.util.Scanner;

// MyScan ms = new MyScan();
public class MyScan {
	public static void main(String[] args) {
		// scanUserInfo();
		scanTemp();

	}

	private static void scanTemp() {
		final int currTemp = 20;

		Scanner scan = new Scanner(System.in);
		System.out.print("수심을 입력하세요 : ");
		int deep = scan.nextInt();
		double temp = currTemp - Math.floor(((double)deep / 10)) * 0.7;
		System.out.println(temp);
	}

	private static void scanUserInfo() {
		Scanner scan = new Scanner(System.in);
		System.out.print("당신의 이름을 입력하세요-->> ");
		String name = scan.nextLine();
		System.out.print("당신의 주소를 입력하세요-->> ");
		String address = scan.nextLine();
		System.out.print("당신의 나이를 입력하세요-->> ");
		int age = scan.nextInt();
		System.out.print("당신의 키(cm)를 입력하세요-->> ");
		double height = scan.nextDouble();

		// System.out.println("이름 : " + name);
		// System.out.println("주소 : " + address);
		// System.out.println("나이 : " + age);
		// System.out.println("키 : " + height);

		System.out.printf("이름 : %s \n주소 : %s \n나이 : %d\n키 : %f", name, address, age, height);
	}
}
