package com.hana4.demo.repository;

import static org.assertj.core.api.Assertions.*;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;

import com.hana4.demo.domain.Code;
import com.hana4.demo.domain.CodeInfo;
import com.hana4.demo.domain.SubCode;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
// @SpringBootTest
public class CodeRepositoryTest {
	@Autowired
	CodeRepository codeRepository;

	@Autowired
	CodeInfoRepository codeInfoRepository;

	@Autowired
	SubCodeRepository subCodeRepository;

	private final static int ID = 1;

	@Test
	void addCodeWithSubCode() {
		Code code = new Code();
		code.setCodeName(getCodeName());
		codeRepository.save(code);
		assertThat(code.getId()).isGreaterThan(0);

		SubCode subCode = new SubCode();
		subCode.setValue(getCodeName());
		subCode.setCode(code);
		subCodeRepository.save(subCode);
		assertThat(subCode.getId()).isGreaterThan(0);

		System.out.println("subCode = " + subCode);

	}

	@Test
	void findCodeInfoTest() {

		// Optional<CodeInfo> optionalCodeInfo = codeInfoRepository.findById(ID);
		// CodeInfo codeInfo = optionalCodeInfo.orElseThrow();
		// System.out.println("codeInfo = " + codeInfo);

		CodeInfo codeInfo = getCodeInfo();
		assertThat(codeInfo).isNotNull();
	}

	@Test
	void findCodeTest() {   // update, delete 테스트

		// assertThat(optionalCode.isPresent()).isTrue();
		// Code code = optionalCode.get();

		// 위 방법보다 더 간단함
		// Code code = optionalCode.orElseThrow();   // 없으면 throw
		// System.out.println("code = " + code);

		Code code = getCode();
		assertThat(code).isNotNull();

	}

	private Code getCode() {
		List<Code> codes = codeRepository.findFirstByOrderById(PageRequest.of(0, 1));
		System.out.println("codes = " + codes);
		return codes.stream().findFirst().orElseThrow();
	}

	private CodeInfo getCodeInfo() {
		List<CodeInfo> codeInfos = codeInfoRepository.findFirstByOrderById(PageRequest.of(0, 1));
		return codeInfos.stream().findFirst().orElseThrow();
	}

	@Test
	void addCodeTest() {
		String codeName = getCodeName();
		Code code = new Code();
		code.setCodeName(codeName);
		// code.setCodeInfo(new CodeInfo("info", "x"));   => 이렇게 넣으면 안됨
		Code savedCode = codeRepository.save(code);
		System.out.println("savedCode = " + savedCode);
		assertThat(savedCode.getId()).isGreaterThan(0);

		CodeInfo codeInfo = new CodeInfo();
		codeInfo.setInfo("전국의 지점 모든 타입");
		codeInfo.setCode(code);
		CodeInfo savedCodeInfo = codeInfoRepository.save(codeInfo);
		System.out.println("savedCodeInfo = " + savedCodeInfo);
		assertThat(codeInfo.getId()).isGreaterThan(0);
	}

	private String getCodeName() {
		return UUID.randomUUID().toString().replace("-", "");
	}

}
