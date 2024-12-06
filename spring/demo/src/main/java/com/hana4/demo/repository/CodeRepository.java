package com.hana4.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana4.demo.domain.Code;

public interface CodeRepository extends JpaRepository<Code, Integer> {
}
