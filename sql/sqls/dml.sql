select * from Major;
update Major set name='소프트웨어학과' where id = 2;
select * from Major order by id desc limit 2;
select * from Major order by id desc limit 3, 2;
desc Major;
insert into Major(name) values ('철학과');

insert into Major(name)
	values ('컴퓨터공학과'), ('소프트웨어공학과');

insert into Major(name) select '산업공학과' from dual;

insert into Major set name = '경제하과';
insert into Major set name = '경영학과';

select 1 * 2 from dual;

select * from Student;
desc Student;

insert into Student(name, birthdt, major, mobile, email)
			values('Hong', '990102', 1, '010-2222-3333', 'hong@gmail.com');

insert into Student(name, birthdt, major, mobile, email)
			values('Kim', '980302', 5, '010-2222-4444', 'kim@gmail.com');

-- 0 row affected  => ignore          
insert ignore into Student(name, birthdt, major, mobile, email)
			values('Kim2', '980502', 4, '010-3333-4444', 'kim@gmail.com');

-- 2 row(s) affected   => on duplicate          
insert into Student(name, birthdt, major, mobile, email)
			values('Kim', '980502', 4, '010-3333-4444', 'kim@gmail.com')
	on duplicate key update name = 'Kim2';
            
insert into Student(name, birthdt, major, mobile, email)
			values('Lee', '980302', 5, '010-2222-4444', 'lee@gmail.com');
            
insert into Student(name, birthdt, major, mobile, email)
			values('Choi', '970302', null, '010-2222-4444', 'choi@gmail.com');
                        

            
select * from Student where name = 'Kim';
select * from Student where gender = 0;
select * from Student where birthdt like '98%';
select * from Student where birthdt between '980101' and '981231';
select * from Student where major in (5, 6);
select * from Student where major in (select major from Student where major >= 5);
select * from Student where major in (select distinct major from Student where major >= 5);
select * from Student where major = (select min(major) from Student);
select * from Student where major > ANY(select major from Student);
select * from Student where major > SOME(select major from Student);
select * from Student where major > ALL(select major from Student);
select * from Student order by rand();

select major from Student where major >=5;
select distinct major from Student where major >=5;
select max(major), min(birthdt) from Student;

select major, count(*) cnt from Student group by major having cnt > 1;

select * from Student inner join Major on Student.major = Major.id where Student.id > 2; 
select * from Student s inner join Major m on s.major = m.id;

select * from Student s left outer join Major m on s.major = m.id
UNION
select * from Student s right outer join Major m on s.major = m.id;

select * from Student inner join Major on Student.major = Major.id where Student.id > 2; 



-- insert ignore
select * from Student;
select * from Major;
select s.*, m.name 
 from Student s inner join Major m on s.major = m.id;
 
desc Student;
show index from Student;

-- ex. insert
select * from Prof;
desc Prof;
show index from Prof;
-- 방법 1)
insert into Prof(name) values('김교수');
insert into Prof(name) values('박교수');
insert into Prof(name) values('최교수');
insert into Prof(name) values('홍교수');

select * from Subject;
desc Subject;
show index from Subject;
-- 방법 2) insert 반복해서 쓰는 방식 대신 concat 사용
insert into Subject(name, prof) 
 select concat(p.name, '과목'), p.id from Prof p;
 
 
select * from Enroll;
desc Enroll;
-- 방법 3)
insert into Enroll(subject, student) values(1, 1), (2, 2), (3, 4), (4, 3);


-- 수강신청한 과목 명 출력
select e.*, sub.name as subjectName, stu.name as studentName
 from Enroll e inner join Subject sub on e.subject = sub.id;
 
-- 수강신청한 과목 명과 학생 명 출력
select e.*, sub.name as subjectName, stu.name as studentName
 from Enroll e inner join Subject sub on e.subject = sub.id
			   inner join Student stu on e.student = stu.id;

-- 수강신청한 학생의 과까지 출력 => major 중 null은 안보임 => inner join
select e.*, sub.name as subjectName, stu.name as studentName, m.name as studentMajor
 from Enroll e inner join Subject sub on e.subject = sub.id
			   inner join Student stu on e.student = stu.id
               inner join Major m on stu.major = m.id;
-- 수강신청한 학생의 과까지 출력 => major 중 null까지 다 보임 => outer join             
select e.*, sub.name as subjectName, stu.name as studentName, m.name as studentMajor
 from Enroll e inner join Subject sub on e.subject = sub.id
			   inner join Student stu on e.student = stu.id
               left outer join Major m on stu.major = m.id;
               
               
select * from Student where major is null;
select * from Student where major = (select max(major) from Student);

-- sub-query vs join => join이 더 성능 좋음
select *, (select name from Major where id = Student.major) from Student;  -- bad!
select s.*, m.name from Student s left join Major m on s.major = m.id;  -- good!
select s.*, sub.name from Student s inner join (select * from Major where id <= 3) sub
	on s.major = sub. id;   -- bad!
select s.*, m.name from Student s inner join Major m on s.major = m.id and id <= 3;  -- not bad
select s.*, m.name from Student s inner join Major m on s.major = m.id
 where id <= 3;  -- good!
 
 -- ex. 전직원의 급여 평균보다 더 높은 평균 급여를 가진 부서를 출력하시오
select * from Emp;
select avg(salary) from Emp;

select dept, avg(salary) avgSal, max(salary) maxsal from Emp 
	group by dept having avg(salary) > (select avg(salary) from Emp);

select sub.*
from(select dept, avg(salary) avgSal, max(salary) maxsal from Emp 
	group by dept having avg(salary) > (select avg(salary) from Emp)) sub;
    
select * from Emp
-- update Emp set salary = 800
 where dept = 2 and salary = 900;    

-- not bad
select sub.*, e.*
  from Emp e inner join (select dept, avg(salary) avgSal, max(salary) maxsal from Emp 
						group by dept having avg(salary) > (select avg(salary) from Emp)) sub
                        on e.dept = sub.dept and e.salary = sub.maxsal
   order by e.dept, e.ename;

select e.*, sub.salary as avgsal, sub.maxsal
 from Emp e inner join (select avg(salary) salary, max(salary) maxsal from Emp) sub
			on e.salary = sub.maxsal
 order by e.dept, e.id;
 
select e.*, sub.avgsal, sub.maxsal
 from Emp e inner join (select avg(salary) avgsal, max(salary) maxsal from Emp) sub
			on e.salary = sub.maxsal
            inner join (select dept, avg(salary) avgsal from Emp group by dept) grp
            on sub.avgsal < grp.avgsal and e.dept = grp.dept
 order by e.dept, e.id;
 
 -- good
select dept, avg(salary), max(salary)
  from Emp
group by dept having avg(salary) > (select avg(salary) from Emp);

select e1.*, e2.id, e2.ename
   from Emp e1 left join Emp e2 on e1.dept = e2.dept and e1.salary < e2.salary
 where e2.id is null
  and e1.dept in (select dept from Emp
				  group by dept having avg(salary) > (select avg(salary) from Emp))
 order by e1.dept;
 
 
select * from Dept;
select * from Emp;
-- ex. 부서 별 이름이 가장 빠른 직원을 captain으로 update 
select * from Emp where ename in (select min(ename) from Emp group by dept); -- no

-- best) 부서별 이름이 빠른 직원
select e1.*
  from Emp e1 left join Emp e2 on e1.dept = e2.dept and e1.ename > e2.ename
where e2.id is null;

-- 위 직원을 captain으로
-- select d.*, e.* from Dept d
update Dept d
	inner join 
		(select e1.dept, e1.id from Emp e1 left join Emp e2 
					 on e1.dept = e2.dept and e1.ename > e2.ename
		 where e2.id is null) e
    on d.id = e.dept
set d.captain = e.id
where d.id > 0;
select * from Dept;
    
-- 결과 확인
select * from Dept;
select d.*, e.ename from Dept d inner join Emp e on d.captain = e.id;



