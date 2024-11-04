package tryThis;

public class Account2 {
	private final String id;
	private final String name;
	private int balance = 0;

	public Account2(String id, String name) {
		this.id = id;
		this.name = name;
	}

	public Account2(String id, String name, int balance) {
		this.id = id;
		this.name = name;
		this.balance = balance;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public int getBalance() {
		return balance;
	}

	public void setBalance(int balance) {
		this.balance = balance;
	}

	public int deposit(int amount) {
		this.balance += amount;
		System.out.printf("%s님이 %d원을 입금\n", name, amount);
		return balance;
	}

	public int withdraw(int amount) {
		if (amount <= this.balance) {
			this.balance -= amount;
			System.out.printf("%s님이 %d원을 출금\n", name, amount);
		} else {
			System.out.println("출금액이 잔액초과!");
		}
		return balance;
	}

	public int transferTo(Account2 another, int amount) {
		System.out.printf("%s이 %s에게 %d원 송금 시도\n", name, another.name, amount);
		if (amount <= this.balance) {
			this.balance -= amount;
			another.balance += amount;
		} else {
			System.out.println("송금액이 잔액초과!");
		}
		return this.balance;
	}

	@Override
	public String toString() {
		return "Account[id=%s, name=%s, balance=%d]".formatted(id, name, balance);
	}

	public static void main(String[] args) {
		Account2 account1 = new Account2("11-111-111", "코난", 20000);
		Account2 account2 = new Account2("22-222-222", "장미", 100000);
		Account2 account3 = new Account2("33-333-333", "미란", 50000);

		System.out.println(account1);
		System.out.println(account2);
		System.out.println(account3);

		account1.transferTo(account2, 30000);
		account1.deposit(50000);
		
	}
}
