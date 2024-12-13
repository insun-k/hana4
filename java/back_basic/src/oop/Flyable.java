package oop;

public interface Flyable {
	public static final String StaticFly = "StaticFly";

	public void fly();

	public default void landing() {
		System.out.println("Landing");
		run();
	}

	private void run() {
		System.out.println("Flyable - Run!!");
	}

	interface clickable {
		public void onClick();
	}
	
}
