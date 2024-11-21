drop procedure if exists sp_student_bulk_insert;

delimiter $$

-- 학생정보를 임의로 만들어주는 함수
CREATE DEFINER=`hana4`@`%` PROCEDURE `sp_student_bulk_insert`(_cnt int)
BEGIN
	declare v_i int default 0;  -- 초기화
    
    select max(id) + 1 into v_i from Student;
    
    set _cnt = _cnt + v_i;

	WHILE v_i <= _cnt DO
		insert into Student(name, birthdt, major, mobile, email)
        select concat('학생', v_i), '970909', f_randmajor(), 
			   concat('010-1212-', LPAD(v_i, 4, '0')), 
               concat('stu', v_i, '@gmail.com');
		set v_i = v_i + 1;
    END WHILE;
    
END $$

delimiter ;