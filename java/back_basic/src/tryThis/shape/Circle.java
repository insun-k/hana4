package tryThis.shape;

public class Circle {
	private double radius;
	private String color = "red";

	public Circle(double radius) {
		this.radius = radius;
	}

	public Circle() {
		this(1.0);
	}

	public double getRadius() {
		return radius;
	}

	public String getColor() {
		return color;
	}

	public void setRadius(double radius) {
		this.radius = radius;
	}

	public double getArea() {
		return Math.PI * this.radius * this.radius;
	}

	public double getCircumference() {
		return Math.PI * 2 * this.radius;
	}

	@Override
	public String toString() {
		return "Circle[radius=%s]의 둘레는 %.2f, 면적은 %.2f".formatted(radius, getCircumference(), getArea());
	}
}
