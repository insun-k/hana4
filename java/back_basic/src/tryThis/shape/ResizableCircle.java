package tryThis.shape;

public class ResizableCircle extends Circle implements Resizable {
	public ResizableCircle(double radius) {
		super(radius);
	}

	@Override
	public String toString() {
		return "ResizableCircle[radius=%.1f]의 둘레는 %.1f, 면적은 %.1f".formatted(getRadius(), getPerimeter(), getArea());
	}

	@Override
	public void resize(int percent) {
		setRadius(getRadius() + getRadius() * percent / 100);
	}
}
