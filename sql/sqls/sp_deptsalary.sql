drop procedure if exists sp_deptsalary;
DELIMITER $$

CREATE DEFINER=`hana4`@`%` PROCEDURE `sp_deptsalary`()
BEGIN
	Declare v_id tinyint unsigned;
    Declare v_dname varchar(31);
    Declare v_captain int;
    Declare v_captainName varchar(31);
    Declare v_captainSalary int;
    
    Declare _done boolean default False;
    
	Declare _cur CURSOR FOR
		select id, dname, captain from Dept;
        
	Declare Continue Handler
		For Not Found SET _done := True;
        
    drop table if exists tmp_deptsal;    
    create temporary table tmp_deptsal(
		dname varchar(31),
        maxsal int unsigned,
        empcnt tinyint unsigned,
        captain varchar(31),
        captainsal int unsigned
    );
    
	OPEN _cur;
		cur_loop: LOOP
			Fetch _cur into v_id, v_dname, v_captain;
            select v_id, v_dname, v_captain, _done;
            
			IF _done THEN
				LEAVE cur_loop;
			END IF;
            
            IF v_captain is not null THEN
				select ename, salary into v_CaptainName, v_captainSalary
				from Emp where id = v_captain; 
			END IF;
			
		
			insert into tmp_deptsal(dname, maxsal, empcnt, captain, captainsal)
			select v_dname, max(salary), count(*), v_captainName, v_captainSalary
				from Emp where dept = v_id;
                
		END LOOP cur_loop;
	CLOSE _cur;
    
    select * from tmp_deptsal order by dname;

END $$
DELIMITER ;
