package tryThis.shape;

abstract class Shape {
	abstract double calArea();

	public static void main(String[] args) {
		Shape[] shapes = {new Circle(5.0), new Rectangle(3, 4), new Circle(1)};

		double totArea = 0;
		for (Shape shape : shapes) {
			totArea += shape.calArea();
		}
		System.out.println("totArea = " + totArea);

		Rectangle r = new Rectangle(2, 5);
		r.resize(10);
		System.out.println("r = " + r);
	}
}
