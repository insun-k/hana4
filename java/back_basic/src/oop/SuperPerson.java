package oop;

import java.util.Objects;

public class SuperPerson {

	private final String name;
	private int age;

	public SuperPerson(String name, int age) {
		System.out.println("Super2");
		this.name = name;
		this.age = age;
	}

	public SuperPerson() {
		this("", 0);
		System.out.println("Super1");
	}

	public String getName() {
		return name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null || getClass() != obj.getClass()) {
			return false;
		}
		Person person = (Person)obj;
		return age == person.getAge() && Objects.equals(name, person.getName());
	}

	@Override
	public int hashCode() {
		System.out.println("age=" + age);
		return Objects.hash(name, age);
	}

	@Override
	public String toString() {
		return "Person{"
			+ "name='" + name + '\'' + ", age=" + age + '}';
	}

	public static void main(String[] args) {
		Person hong = new Person("Hong", 33);
		System.out.println("hong = " + hong);
		SuperPerson kim = new Person("Kim", 30);  // upcasting
		System.out.println("kim = " + kim);
		// System.out.println("age=" + kim.getAge());

		// * instanceof
		SuperPerson ps = Math.random() > 0.5 ? new Student() : new Person();
		if (ps instanceof Person) {  // 방법 1
			((Person)ps).walk();
		}
		if (ps instanceof Person psPerson) { // 방법 2
			(psPerson).walk();
		}
	}
}
