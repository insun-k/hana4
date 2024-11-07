package tryThis.school;

import java.io.InputStream;
import java.util.Scanner;

public class MyScanner {
	private final Scanner scanner;

	public MyScanner() {
		this(System.in);
	}

	public MyScanner(InputStream inputStream) {
		this.scanner = new Scanner(inputStream);
	}

	public int scanInt(String message) {
		System.out.println(message);
		return this.scanner.nextInt();
	}

	public String scan(String message) {
		System.out.println(message);
		return this.scanner.next();
	}

	public void close() {
		this.scanner.close();
	}

	public static void main(String[] args) {
		MyScanner myscan = new MyScanner();
		int intr = myscan.scanInt("점수를 입력하세요 : ");
		System.out.println("intr = " + intr);
	}
}
