package oop;

public class Dog extends Animal implements Flyable, Swimmable {

	@Override
	void walk() {
		System.out.println("Dog wark!!!");
	}

	@Override
	public void fly() {
		System.out.println("fly by ears!!");
	}

	// @Override    => 없어도 maxx.landing() 가능 !
	// public void landing() {
	// 	Flyable.super.landing();
	// }

	@Override
	public void swim() {
		System.out.println("Swim Dog!");
	}

	public static void main(String[] args) {
		Dog maxx = new Dog();
		maxx.fly();
		maxx.landing();
		maxx.bark();
		// Static 사용 가능
		System.out.println("Animal.StaticName = " + Animal.StaticName);
		System.out.println("Flyable.StaticFly = " + Flyable.StaticFly);

		Swimmable swimBoy = Math.random() > 0.5 ? new Dog() : new Cat();
		swimBoy.swim();

		// 익명 구현 객체
		Flyable flyer = new Flyable() {
			@Override
			public void fly() {
				System.out.println("!!!!");
			}
		};
		flyer.fly();

	}

}
