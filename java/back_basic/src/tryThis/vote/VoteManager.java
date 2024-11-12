package tryThis.vote;

public class VoteManager extends Thread {
	public static final int TOTAL_VOTES = 10;
	private int ballots = 0;
	private int process = 0;

	public synchronized void supply(){
		this.ballots ++;
		System.out.println("Supply -- " + this.ballots);
		notifyAll();
	}

	public synchronized void count() throws InterruptedException {
		while(this.ballots <= 0){
			wait();
		}
		this.ballots --;
		process += 100 / TOTAL_VOTES;
		System.out.println("Count: " + process + "%");
	}

	public static void main(String[] args) throws InterruptedException {
		VoteManager vm = new VoteManager();

		VoteSupplier supplier = new VoteSupplier(vm);
		VoteSupplier supplier2 = new VoteSupplier(vm);
		VoteCounter counter = new VoteCounter(vm);

		supplier.start();
		supplier2.start();
		counter.start();
		supplier.join();
		supplier2.join();

	}
}
