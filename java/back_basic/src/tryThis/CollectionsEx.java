package tryThis;

import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class CollectionsEx {
	private static final String[] MOVIES = {"트랜스포머", "스타워즈", "매트릭스", "터미네이터", "아바타"};

	public static void main(String[] args) {
		List<String> list = new LinkedList<>(Arrays.asList(MOVIES));
		System.out.println(list);

		Collections.reverse(list);
		System.out.println(list);

		System.out.println(Collections.min(list));
		System.out.println(Collections.max(list));

		Collections.sort(list);
		System.out.println(list);

		int avatarIdx = Collections.binarySearch(list, "아바타");  // binarySearch는 이진탐색이므로 정렬하고 사용하기
		System.out.println("avatarIdx = " + avatarIdx);
	}
}
