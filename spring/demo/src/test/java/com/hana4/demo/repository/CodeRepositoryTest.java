package com.hana4.demo.repository;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hana4.demo.domain.Code;
import com.hana4.demo.domain.CodeInfo;

// @DataJpaTest
// @AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@SpringBootTest
public class CodeRepositoryTest {
	@Autowired
	CodeRepository codeRepository;

	@Autowired
	CodeInfoRepository codeInfoRepository;

	private final static int ID = 1;

	@Test
	void findCodeInfoTest() {
		Optional<CodeInfo> optionalCodeInfo = codeInfoRepository.findById(ID);
		CodeInfo codeInfo = optionalCodeInfo.orElseThrow();
		System.out.println("codeInfo = " + codeInfo);
	}

	@Test
	void findCodeTest() {   // update, delete 테스트
		Optional<Code> optionalCode = codeRepository.findById(ID);

		// assertThat(optionalCode.isPresent()).isTrue();
		// Code code = optionalCode.get();

		// 위 방법보다 더 간단함
		Code code = optionalCode.orElseThrow();   // 없으면 throw
		System.out.println("code = " + code);

	}

	@Test
	void addCodeTest() {
		Code code = new Code();
		code.setCodeName("지점타입");
		// code.setCodeInfo(new CodeInfo("info", "x"));   => 이렇게 넣으면 안됨
		Code savedCode = codeRepository.save(code);
		System.out.println("savedCode = " + savedCode);

		CodeInfo codeInfo = new CodeInfo();
		codeInfo.setInfo("전국의 지점 모든 타입");
		codeInfo.setCode(code);
		CodeInfo savedCodeInfo = codeInfoRepository.save(codeInfo);
		System.out.println("savedCodeInfo = " + savedCodeInfo);
	}

}
