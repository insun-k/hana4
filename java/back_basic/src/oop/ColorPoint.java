package oop;

public class ColorPoint extends Point {
	private final String color;

	ColorPoint(String color) {
		this.color = color;
	}

	public void showColorPoint() {
		System.out.printf(this.color + "(%d, %d)\n", this.x, this.y);
	}

	public static void main(String[] args) {
		Point p1 = new Point();
		p1.set(10, 20);
		p1.showPoint();
		System.out.println("p1.x = " + p1.x);   // Point에서 x가 default여서 가능

		ColorPoint cp = new ColorPoint("red");
		cp.set(100, 200);
		cp.showColorPoint();
	}

}
