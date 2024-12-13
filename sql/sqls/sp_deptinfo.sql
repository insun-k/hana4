drop procedure if exists sp_deptinfo;
DELIMITER $$
CREATE Procedure sp_deptinfo(_dept_name varchar(31)) 
BEGIN

    select count(*) empcnt, format(avg(salary) * 10000, 0) avgsal
		from v_emp_dept
     where dname = _dname;
    

END $$
DELIMITER ;
