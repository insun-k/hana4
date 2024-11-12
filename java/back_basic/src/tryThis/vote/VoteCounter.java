package tryThis.vote;

public class VoteCounter extends Thread{
	private final VoteManager vm;

	public VoteCounter(VoteManager vm) {
		this.vm = vm;
	}


	@Override
	public void run() {
		for (int i = 0; i< VoteManager.TOTAL_VOTES; i++){
			try {
				Thread.sleep(200);
				vm.count();
			} catch (InterruptedException e) {
				throw new RuntimeException(e);
			}
		}
	}
}
