package tryThis.shape;

public class Circle extends Shape implements GeomericObject {
	private double radius;

	public Circle(double radius) {
		this.radius = radius;
	}

	public Circle() {
		this(1.0);
	}

	public double getRadius() {
		return radius;
	}

	// 외부에서는 못쓰고 자식은 쓰게
	protected void setRadius(double radius) {
		this.radius = radius;
	}

	@Override
	public double getArea() {
		return Math.PI * this.radius * this.radius;
	}

	@Override
	public double getPerimeter() {
		return Math.PI * 2 * this.radius;
	}

	@Override
	public String toString() {
		return "Circle[radius=%s]의 둘레는 %.1f, 면적은 %.1f".formatted(getRadius(), getPerimeter(), getArea());
	}

	@Override
	double calArea() {
		return getArea();
	}

	public static void main(String[] args) {
		Circle circle1 = new Circle(2);
		System.out.println(circle1);

		ResizableCircle circle2 = new ResizableCircle(3);
		System.out.println(circle2);

		circle2.resize(10);
		System.out.println(circle2);

		Resizable circle3 = Math.random() > 0.5 ? new ColorCircle(1, "red") : new ResizableCircle(2);

		Circle circle4 = Math.random() > 0.5 ? new Circle() : new ColorCircle(2, "blue");

		if (circle4 instanceof Resizable x) {  // instanceof -> interface 가능
			x.resize(20);
			System.out.println("x = " + x);
		}

	}

}
