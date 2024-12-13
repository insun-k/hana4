package oop;

public class Cat extends Animal implements Swimmable {

	@Override
	void walk() {
		System.out.println("Cat Walk!!");
	}

	@Override
	public void swim() {
		System.out.println("Swim Cat!");
	}
}
