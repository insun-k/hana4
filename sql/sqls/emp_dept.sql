show processlist;

select * from mysql.user;

select * from Emp;
select * from Dept;
desc Dept;

select * from Emp e inner join Dept d on e.dept = d.id 
where e.dept in (3,4);

alter table Dept add column captain INT;

update Emp e inner join Dept d on e.dept = d.id 
	set d.captain = e.id
 where d.id = 3 and e.ename = '김나라';
 
alter table Emp add column outdt date;

update Dept d inner join Emp e on e.dept = d.id 
 inner join ( select e.dept, min(e.ename) from Emp e group by e.dept)
set d.captain = e.id;

select * from Emp e inner join Dept d on e.dept = d.id
 where (e.dept, e.ename) in (select e.dept, min(e.ename) from Emp e group by e.dept) order by d.dname;

select e.dept, min(e.ename) from Emp e group by e.dept;

alter table Emp add column auth tinyint(1) not null default 9
	comment '권한(0:sys, 1:super, .., 9:guest)' after dept;

alter table Dept add column captain int unsigned null comment '부서장';
alter table Dept add constraint foreign key fk_Dept_captain_Emp(captain)
	references Dept(id) on DELETE set null on UPDATE cascade;


create table EmailLog(
	id int unsigned not null auto_increment,
    sender int unsigned not null comment '발신자 id',
    receiver varchar(1024) not null comment '수신자+참조',
    subject varchar(255) not null default '냉무' comment '제목',
    body text null comment '내용 및 첨부파일',
	PRIMARY KEY pk_EmailLog(id),
    constraint foreign key fk_EmailLog_sender_Emp(sender)
		references Emp(id) on DELETE no action on update cascade

    );

select @@autocommit;

show create table Dept;
show index from Dept;
show index from Emp;


alter table Emp add column outdt date null comment '퇴사일';
select * from Emp;
update Emp set outdt = '2024-04-25' where id in (3, 5);
update Emp set outdt = '2024-04-25' where id in (14, 26);

select * from Dept d inner join Emp e on d.captain = e.id;
select * from Emp;
select * from Dept;

-- ex. emp table에 outdt 칼럼 추가, dept.captain이 퇴사자면 공석처리
update Dept d inner join Emp e on d.captain = e.id
 set d.captain = null
where e.outdt is not null and d.id > 0;

select * from Dept;
