package oop;

import java.util.Scanner;

public class Account {
	private int accountNo;
	private String name;
	private double balance;
	Scanner scan = new Scanner(System.in);

	public Account(int accountNo, String name, double balance) {
		this.accountNo = accountNo;
		this.name = name;
		this.balance = balance;
	}

	public Account(int accountNo, String name) {
		this(accountNo, name, 0);
	}

	public int getAccountNo() {
		return accountNo;
	}

	public String getName() {
		return name;
	}

	public double getBalance() {
		return balance;
	}

	void insert(int a, String n, double amnt) {
		Account person = new Account(a, n, amnt);
	}

	// 입금
	private void deposit() {
		System.out.print("입금할 금액은 ? ");
		double amnt = scan.nextDouble();
		this.balance += amnt;
		System.out.printf("%2.1f원이 입금되었습니다\n", amnt);
		this.checkBalance();
	}

	// 출금
	private void withdraw() {
		System.out.print("출금할 금액은 ? ");
		double amnt = scan.nextDouble();
		if (this.balance < amnt) {
			System.out.println("잔액이 부족하여 출금할 수 없음!\n");
			return;
		}
		this.balance -= amnt;
		System.out.printf("%2.1f원이 출금되었습니다\n", amnt);
		this.checkBalance();
	}

	public void checkBalance() {
		System.out.printf("%s님의 잔액은 %2.1f원 입니다.\n", this.name, this.balance);
	}

	public void display() {
		// 방법 1 : repeat 사용
		// final int hyphenCnt = 20;
		// System.out.println("-".repeat(hyphenCnt));
		// System.out.println(this);
		// System.out.println("-".repeat(hyphenCnt));

		// 방법 2 : formatted 사용
		String output = """
			---------------------------
			계좌번호 : %d
			예금주 : %s
			잔액 : %2.1f원
			---------------------------
			""".formatted(this.accountNo, this.name, this.balance);
		System.out.print(output);

	}

	// 송금
	private double transferTo(Account another, double amount) {
		System.out.printf("%s이 %s에게 %,.1f원 송금 시도\n", this.getName(), another.getName(), amount);
		if (amount > this.balance) {
			System.out.println("잔액이 부족합니다!");
			return 0;
		}
		this.balance -= amount;
		another.balance += amount;
		System.out.printf("%s이 %s에게 %,.1f원 송금 완료!\n", this.getName(), another.getName(), amount);
		this.checkBalance();
		another.checkBalance();
		return this.balance;
	}

	public void login() {
		if (this.scan != null) {
			this.scan = new Scanner(System.in);
		}
	}

	private void action() {
		if (this.scan == null) {
			System.out.println("로그인 먼저 하세요");
		}
		LOOP:
		while (true) {
			System.out.print("Command(+ : 입금, - : 출금, q : 종료) : ");
			// String cmd = scan.nextLine().trim();
			String cmd = scan.next();
			scan.skip(".*");   // => command 뒤에 오는 값 무시

			switch (cmd) {
				case "+" -> {
					this.deposit();
				}
				case "-" -> {
					this.withdraw();
				}
				case "q" -> {
					break LOOP;
				}
				default -> System.out.println("잘못된 명령입니다!");
			}
		}
	}

	public void logout() {
		if (this.scan != null) {
			this.scan.close();
		}
		this.display();
	}

	@Override
	public String toString() {
		return "Account[id=%s, name=%s, balance=%,.1f]".formatted(getAccountNo(), getName(), getBalance());

	}

	public static void main(String[] args) {
		Account acc1 = new Account(1, "코난", 100000);
		Account acc2 = new Account(2, "장미", 100000);
		Account acc3 = new Account(3, "미란", 100000);

		Account[] accounts = new Account[] {acc1, acc2, acc3};

		// 1. 계좌 선택
		Scanner sc = new Scanner(System.in);
		System.out.println("계좌를 선택하세요: ");
		for (Account acc : accounts) {
			System.out.printf("%d : %s, ", acc.getAccountNo(), acc.getName());
		}
		System.out.print(": ");
		int selectedAccNo = sc.nextInt();
		Account woringAccount = accounts[selectedAccNo - 1];

		// 2. 다른 계좌 선택
		System.out.println("누구에게 송금하시겠어요? ");
		for (Account acc : accounts) {
			System.out.printf("%d : %s, ", acc.getAccountNo(), acc.getName());
		}
		System.out.print(": ");
		selectedAccNo = sc.nextInt();
		Account toAccount = accounts[selectedAccNo - 1];

		// 3. 송금 금액 입력
		System.out.println("얼마를 송금하시겠어요?");
		double transAmount = woringAccount.transferTo(toAccount, sc.nextInt());

		// acc1.login();
		// acc1.action();
		// acc1.logout();
	}
}
