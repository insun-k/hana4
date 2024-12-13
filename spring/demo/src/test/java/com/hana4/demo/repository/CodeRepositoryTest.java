package com.hana4.demo.repository;

import static com.hana4.demo.domain.QCode.*;
import static org.assertj.core.api.Assertions.*;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;

import com.hana4.demo.domain.Code;
import com.hana4.demo.domain.CodeInfo;
import com.hana4.demo.domain.QCode;
import com.hana4.demo.domain.SubCode;
import com.hana4.demo.domain.User;

// @DataJpaTest
// @AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@SpringBootTest
public class CodeRepositoryTest {
	@Autowired
	CodeRepository codeRepository;

	@Autowired
	CodeInfoRepository codeInfoRepository;

	@Autowired
	SubCodeRepository subCodeRepository;

	@Autowired
	UserRepository userRepository;

	private final static int ID = 1;

	@Test
	void codeListQTest() {
		QCode Code = QCode.code;
		Iterable<Code> codes = codeRepository.findAll(code.codeName.contains("지점타입").and(code.id.between(1, 20)));
		// System.out.println("codes = " + codes);
		codes.forEach(System.out::println);
		assertThat(codes).isNotEmpty();
	}

	@Test
	void codeUsersTest() {
		Code code = getCode();
		System.out.println("code = " + code);
		assertThat(code.getCodeUsers()).isNotNull();

		// User user1 = new User("Hong11");
		// User user2 = new User("Hong22");
		// User user3 = new User("Hong33");
		// List<User> users = Arrays.asList(user1, user2);
		// code.setCodeUsers(users);
		// code.addUser(user3);

		List<User> allUsers = userRepository.findAll();
		code.setCodeUsers(allUsers);

		codeRepository.save(code);
		System.out.println("code.getCodeUsers() = " + code.getCodeUsers());

		// assertThat(code.getCodeUsers())
	}

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
		// System.out.println("savedCodeInfo = " + savedCodeInfo);
		assertThat(codeInfo.getId()).isGreaterThan(0);
	}

	private String getCodeName() {
		return UUID.randomUUID().toString().replace("-", "");
	}

}
