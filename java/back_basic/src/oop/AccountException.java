package oop;

public class AccountException extends Exception {
	public AccountException(String message) {
		super(message);
		System.out.println("AccountException = " + message);
	}
}
