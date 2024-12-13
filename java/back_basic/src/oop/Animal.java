package oop;

abstract class Animal {

	public static String StaticName = "StaticAnimal";

	private int age;
	private String name;

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void bark() {
		System.out.println("Bark!!");
	}

	abstract void walk();
}
