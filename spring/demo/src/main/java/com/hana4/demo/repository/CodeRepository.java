package com.hana4.demo.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.hana4.demo.domain.Code;

public interface CodeRepository extends JpaRepository<Code, Integer>, QuerydslPredicateExecutor<Code> {
	List<Code> findFirstByOrderById(Pageable pageable);
}
