package tryThis.shape;

public class Rectangle {
	private double length;
	private double width;

	public Rectangle(double length, double width) {
		this.length = length;
		this.width = width;
	}

	public Rectangle() {
		this(1.0, 1.0);
	}

	public double getLength() {
		return length;
	}

	public double getWidth() {
		return width;
	}

	public void setLength(double length) {
		this.length = length;
	}

	public void setWidth(double width) {
		this.width = width;
	}

	public double getArea() {
		return this.length * this.width;
	}

	public double getPerimeter() {
		return 2 * (this.length + this.width);
	}

	@Override
	public String toString() {
		return "Rectangle[length=%.1f, width=%.1f]의 둘레는 %.1f, 면적은 %.1f".formatted(length, width, getPerimeter(),
			getArea());

	}
}
