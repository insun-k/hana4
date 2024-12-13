package tryThis;

import java.util.Scanner;

import tryThis.comp.Employee;
import tryThis.comp.InvoiceItem;

public class TryThis {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);

		// Circle circle1 = new Circle();
		// Circle circle2 = new Circle(2);
		// System.out.println("circle1 = " + circle1);
		// System.out.println("circle2 = " + circle2);
		//
		// Rectangle rectangle1 = new Rectangle();
		// Rectangle rectangle2 = new Rectangle(3, 4);
		// System.out.println("rectangle1 = " + rectangle1);
		// System.out.println("rectangle2 = " + rectangle2);
		//
		Employee[] employees = new Employee[3];
		for (int i = 0; i < 3; i++) {
			employees[i] = new Employee(sc.nextInt(), sc.next(), sc.nextInt());
		}
		for (Employee employee : employees) {
			System.out.println(employee);
		}

		InvoiceItem[] items = new InvoiceItem[3];
		for (int i = 0; i < 3; i++) {
			items[i] = new InvoiceItem(sc.next(), sc.next(), sc.nextInt(), sc.nextInt());
		}
		for (InvoiceItem item : items) {
			System.out.println(item);
		}
	}
}
