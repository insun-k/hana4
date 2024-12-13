public class Hello {
	public static void main(String[] args) {
		System.out.println("Hello World");

		Hello.Hi hi = new Hello.Hi();
		hi.sayHi();

	}

	class II {
		void ii() {
			System.out.println("II");
		}
	}

	static class Hi {
		public void sayHi() {
			System.out.println("Hi");
		}
	}
}
