create table Student(
	id int unsigned not null auto_increment comment '학번',
    createdate timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
	updatedate timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '등록일시', 
    name varchar(31) not null comment "이름",
    birthdt date not null comment '생년월일',
    major tinyint unsigned not null comment '학과 id',
    mobile varchar(15) not null comment '전화번호',
    email varchar(150) not null comment '이메일',
    geneder boolean not null default 0 comment '성별(0:어성, 1:남성)',
    graduatedt date null comment '졸업일자',
    PRIMARY KEY(id),
    UNIQUE KEY uniq_Student_email(email),
    UNIQUE KEY uniq_Student_name_mobile(name, mobile)
);    

alter table Student change column geneder gender boolean not null default 0;

create table Major (
	id tinyint unsigned not null auto_increment primary key comment '학과코드',
    name varchar(20) not null comment '학과명'
);


create table Prof(
	id smallint unsigned not null auto_increment comment '교수번호',
	createdate timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
	updatedate timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '등록일시', 
    name varchar(31) not null comment '교수명',
    likecnt int default 0,
    PRIMARY KEY(id)
);


create table Subject(
	id smallint unsigned not null auto_increment comment '과목번호',
	createdate timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
	updatedate timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '등록일시', 
    name varchar(31) not null comment '과목명',
    prof smallint unsigned null comment '담당교수',
    Primary Key (id),
    Constraint Foreign Key fk_Subject_prof_Prof (prof) 
		references Prof (id) on Delete set null on Update cascade
);



show index from Subject;

create table Enroll (
	id int unsigned not null auto_increment comment '수강번호',
	reatedate timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '신청일시',
	updatedate timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일시', 
    subject smallint unsigned not null comment '과목번호',
    student int unsigned not null comment '학번',
    PRIMARY KEY (id),
    Constraint foreign key fk_Enroll_subject_Subject(subject) 
		references Subject(id) on Delete cascade on update cascade,
	Constraint Foreign Key fk_Enroll_student_Student(student)
		References Student(id) on Delete cascade on Update cascade
);




alter table Student modify column name varchar(25) not null default '' comment '학생명';

alter table Student modify column major tinyint unsigned null comment "학과코드";

alter table Student add constraint foreign key fk_Student_major_Major(major)
	references Major(id) on DELETE set null on UPDATE cascade;

alter table Enroll add constraint foreign key fk_Enroll_student_Studnet(student)
	references Student(id) on DELETE cascade on UPDATE cascade;
select * from Student;