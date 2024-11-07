package tryThis;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Random;
import java.util.StringTokenizer;

public class StringEx {
	public static void main(String[] args) {

		StringBuffer sb = new StringBuffer("This");
		System.out.println(sb.hashCode());
		sb.append(" is a pencil");
		System.out.println(sb.toString());

		sb.insert(7, " my");
		System.out.println(sb.toString());

		sb.delete(10, 12);

		sb.replace(8, 10, "your");
		System.out.println(sb.toString());

		sb.setLength(4);
		System.out.println(sb.toString());

		sb.reverse();
		System.out.println(sb.toString());

		// 공간 (capacity), 실제길이 (len)
		System.out.printf("capacity = %d, len = %d (%d)\n", sb.capacity(), sb.length(), sb.capacity() - sb.length());

		String query = "name=conan&addr=ran's&age=10";
		StringTokenizer st = new StringTokenizer(query, "&=");
		while (st.hasMoreElements()) {
			System.out.println("st.nextToken() = " + st.nextToken());
		}

		String query2 = "홍길동/장화/홍련/콩쥐/팥쥐";
		StringTokenizer st2 = new StringTokenizer(query2, "/");
		while (st2.hasMoreElements()) {
			System.out.println(st2.nextToken());
		}

		Random rand1 = new Random(3333L);
		for (int i = 0; i < 10; i++) {
			if (i < 7) {
				rand1.setSeed(3333L);
			}
			System.out.println(rand1.nextInt(3) + 1);
		}

		System.out.println("-------------------------------------------");
		Calendar cal = Calendar.getInstance();
		int year = cal.get(Calendar.YEAR);
		int month = cal.get(Calendar.MONTH);
		int date = cal.get(Calendar.DATE);
		System.out.printf("%d-%02d-%02d\n", year, month, date);

		SimpleDateFormat fmt = new SimpleDateFormat("yyyy년 MM월 dd일 hh시 mm분 ss초 - a");
		System.out.println(fmt.format(cal.getTime()));

	}

}
