package tryThis.shape;

public class ColorCircle extends ResizableCircle {
	private final String color;

	public ColorCircle(double radius, String color) {
		super(radius);
		this.color = color;
	}

	public String getColor() {
		return color;
	}

	@Override
	public String toString() {
		return "ColorCircle(%s)e[radius=%s]의 둘레는 %.1f, 면적은 %.1f".formatted(getColor(), getRadius(), getPerimeter(),
			getArea());
	}
}
