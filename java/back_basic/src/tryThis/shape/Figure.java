package tryThis.shape;

import java.util.ArrayList;

public class Figure<T extends Shape> {
	T figure;
	// static T id;

	public Figure(T shape) {
		this.figure = shape;
		// List<Object> obj = new ArrayList<String>();
		ArrayList<Integer> list = new ArrayList<Integer>();
		// exact matching 필요
		// ArrayList<Integer>[] list = new ArrayList[10];
	}

	public void print() {
		double perimeter = 0;
		if (this.figure instanceof Circle circle) {
			perimeter = circle.getPerimeter();
		} else if (this.figure instanceof Rectangle rectangle) {
			perimeter = rectangle.getPerimeter();
		}
		System.out.printf("Perimeter=%.1f, Area=%.1f", perimeter, this.figure.calArea());
	}

	public static void main(String[] args) {

	}
}
