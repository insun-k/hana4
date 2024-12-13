package lambda;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class ComparatorEx {
	public static void main(String[] args) {
		String[] strings = {"aaaaa", "bb", "ccccccccc"};

		Arrays.sort(strings, new Comparator<String>() {
			@Override
			public int compare(String first, String second) {
				return first.length() - second.length();
			}
		});

		// 람다 사용
		Comparator<String> compa = (first, second) ->
			second.length() - first.length();
		Arrays.sort(strings, compa);

		for (String s : strings) {
			System.out.println(s);
		}

		System.out.println("--------------------------------");

		List<String> list = Arrays.asList(strings);
		System.out.println("list = " + list.getClass().getName());

		// list.stream().map((String str) -> str.length()).filter(len -> len > 7).collect(Collectors.toSet());
		list.stream().map(String::length).filter(len -> len > 7).forEach(System.out::println);

		System.out.println("--------------------------------");

		Negative n = X -> -X;
		// Add a = (a, b) -> a + b;
		Add a = Integer::sum;

	}

	// 인터페이스에 함수 하나만 필요
	interface Add {
		int add(int a, int b);
	}

	interface Negative {
		int neg(int x);
	}
}
