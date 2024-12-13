package tryThis.vote;

public class VoteSupplier extends Thread{
	private final VoteManager vm;

	public VoteSupplier(VoteManager vm) {
		this.vm = vm;
	}

	@Override
	public void run() {
		for (int i = 0; i< VoteManager.TOTAL_VOTES / 2; i++){
			try {
				Thread.sleep(100);
				vm.supply();
			} catch (InterruptedException e) {
				throw new RuntimeException(e);
			}
		}
	}
}
