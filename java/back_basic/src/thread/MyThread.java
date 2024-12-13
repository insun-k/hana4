package thread;

// Thread 생성 방법1) extends
public class MyThread extends Thread {
	@Override
	public void run() {
		System.out.println("MyThread Started..!");
		System.out.println(Thread.currentThread().getName());
		for (int i = 1; i <= 5; i++) {
			try {
				Thread.sleep(500);
				if (i > 1) {
					System.out.println(1 / 0);
				}
			} catch (InterruptedException e) {
				throw new RuntimeException(e);
			}
			System.out.println("MyThread = " + i);
		}
		System.out.println("MyThread End..!");

	}

}
