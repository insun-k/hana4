package com.hana4.demo;

import java.util.Locale;

import lombok.Getter;

@Getter
public enum Lang {
	DEFULT("한국어", Locale.KOREAN),
	ENGLISH("English", Locale.ENGLISH),
	CHINESE("中國", Locale.CHINESE),
	GERMAN("Deutsch", Locale.GERMAN),
	ITALIAN("Italiano", Locale.ITALIAN),
	FRENCH("Français", Locale.FRENCH);

	private final String lang;
	private final Locale locale;

	Lang(String lang, Locale locale) {
		this.lang = lang;
		this.locale = locale;
	}
}
