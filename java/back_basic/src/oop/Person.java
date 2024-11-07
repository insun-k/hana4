package oop;

public class Person extends SuperPerson {
	public String addr;

	public Person() {
		this("엄마의 아이", 1);
		System.out.println("Person1");
	}

	public Person(String name, int age) {
		super(name, age);
		System.out.println("Person2");
	}

	public Person(String name, int age, String addr) {
		super(name, age);
		this.addr = addr;
	}

	public String getAddr() {
		return addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public void walk() {
		System.out.println("walking");
	}

	@Override
	public boolean equals(Object person) {
		return super.equals(person) && ((Person)person).getAddr().equals(this.getAddr());  // String
	}

	@Override
	public String toString() {
		return "Person[name=%s, age=%d, addr=%s]".formatted(getName(), getAge(), getAddr());
	}
}
