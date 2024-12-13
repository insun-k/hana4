package com.hana.shop.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Dept {
	private int id, pid, depth;
	private Integer captain;  // Integer이면 null로 인식? -> nullable한 칼럼만 Integer로
	private String dname, captainName;

	// jsp에서 IsTop으로 사용
	public boolean getIsTop() {
		return this.pid == 0;
	}

	@Override
	public String toString() {
		return "DeptDTO{" +
			"captain=" + captain +
			", id=" + id +
			", pid=" + pid +
			", depth=" + depth +
			", dname='" + dname + '\'' +
			'}';
	}
}
