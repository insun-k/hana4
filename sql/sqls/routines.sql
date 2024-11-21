--  * view *
-- select e.*, d.dname from Emp e inner join Dept d on e.dept = d.id;
select * from v_emp_dept;
desc Subject;

select * from Subject;
update Subject set prof = null where id = 3;

-- trythis  (p.55)
-- 1)
-- select s.*, ifnull(p.name, '부재중') as profname from Subject s left join Prof p on s.prof = p.id;
select * from v_subject;


-- * trigger *
select * from Prof;
insert into Subject(name, prof) values ('김교수과목2', 1), ('박교수과목2', 2);

-- ex. 교수별 담당 과목수 (p.57)
alter table Prof add column subjectcnt tinyint unsigned not null default 0 comment '담당과목수';

select group_concat(id), prof, count(*) cnt
  from Subject group by prof;
  
update Prof p inner join (select group_concat(id), prof, count(*) cnt
							from Subject group by prof) sub
              on p.id = sub.prof
	set p.subjectcnt = sub.cnt
    where p.id > 0;
    
select * from Prof;


-- * stored Function *
-- 교안 강사용 p.82 tryThis) 직원 id 전달하면 직원명과 부서명 출력
select *, f_empinfo(id) from Emp;

-- * stored procedures *
-- 특정 id 사이에 있는 직원 출력
call sp_emprange(15, 10);
show procedure status where db ='testdb';

-- * leave *
-- 범위가 음수면 종료
call sp_emprange(-1, -5);

-- * while *
-- 임의로 학생 정보 생성
select * from Student;
call sp_student_bulk_insert(5);

-- * procedure *
-- trythis : 부서명을 받아 직원 수와 평균 급여 반환
call sp_deptinfo('영업부');


-- * cursor * 
-- trythis : 각 부서의 급여 정보를 출력 (p.76)
call sp_deptsalary();

