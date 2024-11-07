package tryThis.arrayBook;

public class ArrayedGeneralBook implements GeneralBook {
	private String[] names;
	private String[] records;

	public ArrayedGeneralBook(String[] names, String[] records) {
		this.names = names;
		this.records = records;
		this.sort();
	}

	@Override
	public int size() {
		return this.names.length;
	}

	@Override
	public String names() {
		StringBuilder sb = new StringBuilder();
		for (String name : names) {
			if (!sb.isEmpty()) {
				sb.append(' ');
			}
			sb.append(name);
		}
		return sb.toString();
	}

	@Override
	public String records() {
		return String.join(" ", this.records);
	}

	@Override
	public boolean nameExist(String name) {
		for (String n : names) {
			if (n.equals(name)) {
				return true;
			}
		}
		return false;
	}

	@Override
	public void add(String name, String record) {
		if (this.nameExist(name)) {
			System.out.println(name + " : 이미 존재합니다.");
		}

		int len = size() + 1;
		String[] newNames = new String[len];
		String[] newRecords = new String[len];

		int idx = 0;

		for (String nm : names) {
			if (name.compareTo(nm) < 0) {
				newRecords[idx] = record;
				newNames[idx++] = name;
			}
			newRecords[idx] = this.records[idx];
			newNames[idx++] = nm;
		}

		if (idx < len) {
			newNames[idx] = name;
			newRecords[idx] = record;
		}
		this.names = newNames;
		this.records = newRecords;
	}

	@Override
	public void remove(String name, String record) {
		if (!this.nameExist(name)) {
			System.out.println(name + " : 존재하지 않는 이름입니다.");
			return;
		}

		int len = this.size() - 1;
		String[] newNames = new String[names.length - 1];
		String[] newRecords = new String[records.length - 1];

		for (int i = 0; i < len + 1; i++) {
			if (names[i].equals(name)) {
				continue;
			}
			newNames[i] = names[i];
			newRecords[i] = records[i];
		}
		this.names = newNames;
		this.records = newRecords;

	}

	@Override
	public String get(String name) {
		if (!nameExist(name)) {
			System.out.println("존재하지 않는 이름입니다!");
			return "";
		}
		for (int i = 0; i < this.size(); i++) {
			if (name.equals(names[i])) {
				return records[i];
			}
		}
		return "";
	}

	@Override
	public void sort() {
		int len = this.size();
		for (int i = 0; i < len; i++) {
			for (int j = 0; j < len - i; j++) {
				if (names[j].compareTo(names[j + 1]) > 0) {
					String tmp = names[j];
					names[j] = names[i];
					names[j + 1] = tmp;
				}
			}
		}

	}

	@Override
	public void print() {
		System.out.println("---------------------------------------");
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < size(); i++) {
			if (!sb.isEmpty()) {
				sb.append('\n');
			}
			sb.append(names[i]).append(records[i]);  // append( +
		}
		System.out.println("---------------------------------------");
	}

	public static void main(String[] args) {
		String[] names = {"Sam", "Rhee", "Kim"};
		String[] records = {"1111", "2222", "3333"};
		ArrayedGeneralBook gb = new ArrayedGeneralBook(names, records);
		System.out.println(gb.names());    //Sam Rhee Kim
		gb.add("Allan", "4444");
		gb.print();
		//Allan4444\nKim3333\nRhee2222\nSam1111
		System.out.println("현재 저장된 데이터의 크기 : " + gb.size()); //4
		gb.add("Alex", "5555");
		System.out.println("현재 저장된 데이터의 크기 : " + gb.size()); //5
		gb.print();    //Alex5555\nAllan4444\nKim3333\nRhee2222\nSam1111\n
		System.out.println(gb.nameExist("Alex")); //true
		gb.remove("Alex", "5555");
		gb.remove("Sam", "1111");
		gb.print();    //Allan4444\nKim3333\nRhee2222
		String foundRecord = gb.get("Allan");
		System.out.println(foundRecord); //4444

	}

}
