package tryThis.comp;

import java.util.Objects;

public class InvoiceItem {
	private final String id;
	private final String desc;
	private int qty;
	private double unitPrice;

	public InvoiceItem(String id, String desc, int qty, double unitPrice) {
		this.id = id;
		this.desc = desc;
		this.qty = qty;
		this.unitPrice = unitPrice;
	}

	public String getId() {
		return id;
	}

	public String getDesc() {
		return desc;
	}

	public int getQty() {
		return qty;
	}

	public double getUnitPrice() {
		return unitPrice;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}

	public void setUnitPrice(double unitPrice) {
		this.unitPrice = unitPrice;
	}

	public double getTotal() {
		return this.qty * this.unitPrice;
	}

	@Override
	public String toString() {
		return this.getClass().getSimpleName()
			+ "InvoiceItem[id=%s, desc=%s, qty=%d, unitPrice=%,.1f]의 구매총액은 %,.1f원".formatted(getId(), getDesc(),
			getQty(),
			getUnitPrice(),
			getTotal());
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null || getClass() != obj.getClass())
			return false;
		InvoiceItem that = (InvoiceItem)obj;
		return qty == that.qty && Double.compare(unitPrice, that.unitPrice) == 0 && Objects.equals(id,
			that.id) && Objects.equals(desc, that.desc);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, desc, qty, unitPrice);
	}
}
