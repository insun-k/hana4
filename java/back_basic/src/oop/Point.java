package oop;

public class Point {
	int x;
	int y;

	void set(int x, int y) {
		this.x = x;
		this.y = y;
	}

	void showPoint() {
		System.out.printf("(%d, %d)\n", this.x, this.y);
	}
}
