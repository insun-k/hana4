package tryThis.comp;

public class Employee {
	private int id;
	private String name;
	private int salary;

	public Employee(int id, String name, int salary) {
		this.id = id;
		this.name = name;
		this.salary = salary;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public int getSalary() {
		return salary;
	}

	public void setSalary(int salary) {
		this.salary = salary;
	}

	public int getAnnualSalary() {
		return this.salary * 12;
	}

	public int raiseSalary(int percent) {
		return this.salary * percent;
	}

	@Override
	public String toString() {  // %,d -> 숫자에 콤마까지 출력
		return "Employee[id=%d, name=%s, salary=%,d]의 연봉은 %,d 월급 인상분은 %,d".formatted(getId(), getName(),
			getSalary(),
			getAnnualSalary(), raiseSalary(id * 10));
	}
}
