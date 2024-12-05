select * from Dept;

create table Cust(
	id int unsigned not null auto_increment,
    name varchar(31) not null default '' comment '고객명',
    tel varchar(15) not null default '' comment '전화번호',
    email varchar(31) null comment "이메일주소",
    Primary Key(id)
);

select * from Cust;
truncate table Cust;
insert into Cust(name, tel) values('홍길동', '010-1111-2222'), ('김길동', '010-3333-4444');

