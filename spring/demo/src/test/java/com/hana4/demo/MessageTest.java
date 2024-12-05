package com.hana4.demo;

import static org.assertj.core.api.Assertions.*;

import java.util.Locale;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;

@SpringBootTest
public class MessageTest {
	@Autowired
	MessageSource msgsrc;

	@Test
	void siteMessageTest() {
		String title = msgsrc.getMessage("site.title", null, Locale.KOREAN);
		assertThat(title).isEqualTo("데모앱");

		String description = msgsrc.getMessage("site.description", new Object[] {"테스트"}, Locale.KOREAN);
		assertThat(description).isEqualTo("데모::테스트");

		String titleEN = msgsrc.getMessage("site.title", null, Locale.ENGLISH);
		assertThat(titleEN).isEqualTo("DemoApplication");

		String titleZH = msgsrc.getMessage("site.title", null, Locale.CHINA);
		assertThat(titleZH).isEqualTo("Demo語皮");
	}

	@Test
	void notFoundTest() {
		assertThatThrownBy(() -> msgsrc.getMessage("site.titleXXX", null, Locale.KOREA)).isInstanceOf(
			NoSuchMessageException.class);

		String msg = msgsrc.getMessage("site.titleXXX", null, "DemoDefault", Locale.KOREAN);
		assertThat(msg).isEqualTo("DemoDefault");
	}
}
