package thread;

public class ThreadMain {
	public static void main(String[] args) throws InterruptedException {
		System.out.println(Thread.currentThread().getName());
		// Thread.currentThread().setDaemon(true);

		MyThread myThread = new MyThread();
		Thread yourThread = new Thread(new YourThread());

		// Thread 생성 방법3)
		Thread thread3 = new Thread(new Runnable() {
			@Override
			public void run() {
				System.out.println("Thread3 started...");
			}
		});

		// Thread 생성 방법4)
		Thread thread = new Thread(() -> {
			System.out.println("Thread4 Started..!");
			for (int i = 1; i <= 5; i++) {
				try {
					Thread.sleep(500);
					// if (i > 2) {
					// 	System.out.println(1 / 0);
					// }
				} catch (InterruptedException e) {
					throw new RuntimeException(e);
				}
				System.out.println("Thread4 = " + i);
			}
			System.out.println("Thread4 End..!");
		});

		// setPriority : 우선수위 -> start 이전에 사용하기
		// myThread.setPriority(Thread.MAX_PRIORITY);
		// yourThread.setPriority(Thread.MIN_PRIORITY);

		myThread.setDaemon(true);
		myThread.start(); // run 함수 실행
		// myThread.join(2000);  // myThread 다 끝나고 나머지 실행
		// yourThread.setDaemon(true);
		yourThread.start();
		// thread3.start();
		// System.out.println(1 / 0); // -> exception으로 main은 종료
		// -> 그래도 나머지 스레드는 독립적이여서 계속 실행
	}
}
