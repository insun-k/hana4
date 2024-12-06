package com.hana4.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana4.demo.domain.CodeInfo;

public interface CodeInfoRepository extends JpaRepository<CodeInfo, Integer> {
}
